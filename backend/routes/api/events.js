const express = require("express");
const { Op, Sequelize } = require("sequelize");
const {
  User,
  Group,
  Attendance,
  Membership,
  Venue,
  EventImage,
  Event,
} = require("../../db/models");
const { check } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");

const event = express.Router();

// Validators
const validateEvent = [
  check("name")
    .exists({ checkFalsy: true })
    .isLength({ min: 5, max: 100 })
    .withMessage("Name must be at least 5 characters."),
  check("description")
    .exists({ checkFalsy: true })
    .notEmpty()
    .withMessage("Description is required"),
  check("type")
    .exists({ checkFalsy: true })
    .isIn(["Online", "In Person"])
    .withMessage("Type must be 'Online' or 'In Person'."),
  check("capacity")
    .exists({ checkFalsy: true })
    .isInt()
    .withMessage("Capacity must be an integer"),
  check("price")
    .exists({ checkFalsy: true })
    .isFloat()
    .notEmpty()
    .withMessage("Price is invalid"),
  handleValidationErrors,
];

const validateImg = [
  check("url")
    .exists({ checkFalsy: true })
    .notEmpty()
    .withMessage("Url must be a string"),
  check("preview")
    .exists()
    .notEmpty()
    .isBoolean()
    .withMessage("Preview must be true or false"),
  handleValidationErrors,
];

const validateParams = [
  check("page")
    .isInt({ min: 1 })
    .withMessage("Page must be greater than or equal to 1"),
  check("size")
    .isInt({ min: 1 })
    .withMessage("Size must be greater than or equal to 1"),
  check("name").optional().isAlpha().withMessage("Name must be a string"),
  check("type")
    .optional()
    .isIn(["Online", "In Person"])
    .withMessage("Type must be 'Online' or 'In Person'"),
  handleValidationErrors,
];

// * Get all Events
event.get("/", validateParams, async (req, res) => {
  let { page, size, name, type, startDate } = req.query;
  let pagination = {};
  let where = {};

  if (name) {
    where.name = {
      [Op.like]: `%${name}%`,
    };
  }
  if (type) {
    where.type = type;
  }
  if (startDate) {
    where.startDate = startDate;
  }

  page = parseInt(page);
  size = parseInt(size);

  if (isNaN(page) || page <= 0) {
    page = 1;
  }

  if (isNaN(size) || size <= 0) {
    size = 20;
  }

  pagination.limit = size;
  pagination.offset = size * (page - 1);

  const eventIds = await Event.findAll({
    attributes: ["id"],
    where,
    ...pagination,
  });

  const ids = eventIds.map((event) => event.id);

  if (ids.length === 0) {
    return res.json({ Events: [] });
  }

  const allEvents = await Event.findAll({
    attributes: {
      include: [
        "id",
        [
          Sequelize.fn("COUNT", Sequelize.col("Attendances.id")),
          "numAttending",
        ],
        [Sequelize.col("EventImages.url"), "previewImage"],
      ],
    },
    include: [
      {
        model: Attendance,
        attributes: [],
      },
      {
        model: EventImage,
        attributes: [],
      },
      {
        model: Group,
        attributes: ["id", "name", "city", "state"],
      },
      {
        model: Venue,
        attributes: ["id", "city", "state"],
      },
    ],
    where: {
      id: {
        [Op.in]: ids,
      },
    },
    group: [
      "Event.id",
      "Attendances.id",
      "EventImages.id",
      "Group.id",
      "Venue.id",
    ],
  });

  return res.json({ Events: allEvents });
});

// * Get Event by ID
event.get("/:eventId", async (req, res) => {
  const eventId = req.params.eventId;
  const eventExists = await Event.findByPk(eventId);
  if (!eventExists) {
    return res.status(404).json({ message: "Event couldn't be found" });
  }
  const eventById = await Event.findByPk(eventId, {
    attributes: {
      exclude: ["createdAt", "updatedAt"],
      include: [
        "id",
        [
          Sequelize.fn("COUNT", Sequelize.col("Attendances.id")),
          "numAttending",
        ],
      ],
    },
    include: [
      {
        model: Attendance,
        attributes: [],
      },
      {
        model: Group,
        attributes: ["id", "name", "private", "city", "state"],
      },
      {
        model: Venue,
        attributes: ["id", "address", "city", "state", "lat", "lng"],
      },
      {
        model: EventImage,
        attributes: ["id", "url", "preview"],
      },
    ],
    group: ["Event.id", "Group.id", "EventImages.id", "Venue.id"],
  });
  return res.json({ Events: eventById });
});

// * Add Img to Event by ID
event.post("/:eventId/images", validateImg, async (req, res) => {
  const { user } = req;
  if (!user) {
    return res.status(401).json({ message: "Authentication required" });
  }

  const { url, preview } = req.body;
  const eventId = req.params.eventId;
  const event = await Event.findByPk(eventId);
  if (!event) {
    return res.status(404).json({ message: "Event couldn't be found" });
  }
  const groupId = event.groupId;
  const membership = await Membership.findOne({
    where: { userId: user.id, groupId: groupId },
  });
  if (!membership) {
    return res.status(403).json({ message: "Forbidden" });
  }
  const status = membership.status;

  const isAttendee = await Attendance.findOne({ where: { userId: user.id } });

  if (status === co - host || isAttendee === true) {
    const img = await EventImage.create({ groupId, url, preview });

    const newImg = {
      id: img.id,
      groupId: img.groupId,
      url: img.url,
      preview: img.preview,
    };
    return res.json({ img: newImg });
  } else {
    return res.status(403).json({ message: "Forbidden" });
  }
});

// * Edit and return event by it's ID
event.put("/:eventId", validateEvent, async (req, res) => {
  const {
    venueId,
    name,
    description,
    type,
    capacity,
    price,
    startDate,
    endDate,
  } = req.body;
  const { user } = req;
  if (!user) {
    return res.status(401).json({ message: "Authentication required" });
  }

  const eventId = req.params.eventId;
  const event = await Event.findByPk(eventId);
  if (!event) {
    return res.status(404).json({ message: "Event couldn't be found" });
  }

  const groupId = event.groupId;
  const venue = await Venue.findByPk(venueId);
  const membership = await Membership.findOne({ where: { groupId: groupId } });
  if (!membership) {
    return res.status(403).json({ message: "Forbidden" });
  }
  const status = membership.status;

  if (!venue) {
    return res.status(404).json({ message: "Venue couldn't be found" });
  }

  // Must be co-host to update
  if (status === "co-host") {
    const updatedEvent = await Event.update({
      venueId: venueId,
      name: name,
      description: description,
      type: type,
      capacity: capacity,
      price: price,
      startDate: startDate,
      endDate: endDate,
    });

    const newEvent = {
      id: updatedEvent.id,
      groupId: updatedEvent.groupId,
      venueId: updatedEvent.venueId,
      name: updatedEvent.name,
      description: updatedEvent.description,
      type: updatedEvent.type,
      capacity: updatedEvent.capacity,
      price: updatedEvent.price,
      startDate: updatedEvent.startDate,
      endDate: updatedEvent.endDate,
    };

    return res.json({ event: newEvent });
  } else {
    return res.status(403).json({ message: "Forbidden" });
  }
});

// * Deletes Event by it's ID
event.delete("/:eventId", async (req, res) => {
  const { user } = req;

  if (!user) {
    return res.status(401).json({ message: "Authentication required" });
  }
  const eventId = req.params.eventId;
  const event = await Event.findByPk(eventId);
  if (!event) {
    return res.status(404).json({ message: "Event couldn't be found" });
  }

  const groupId = event.groupId;
  const member = await Membership.findOne({ where: { groupId: groupId } });
  const status = member.status;

  if (status === "co-host") {
    event.destroy();
  } else {
    return res.status(403).json({ message: "Forbidden" });
  }
});

// * Get all Attendees of an Event specified by its id
// ! Needs formatting
event.get("/:eventId/attendees", async (req, res) => {
  const { user } = req;
  const eventId = req.params.eventId;

  const event = await Event.findByPk(eventId);
  if (!event) {
    return res.status(404).json({ message: "Event couldn't be found" });
  }

  const groupId = event.groupId;
  const userMembership = await Membership.findOne({
    where: { userId: user.id, groupId: groupId },
  });
  let attendees;

  if (userMembership && userMembership.status === "co-host") {
    attendees = await Attendance.findAll({
      where: {
        eventId: event.id,
      },
      attributes: {
        include: [
          [Sequelize.col("User.id"), "id"],
          [Sequelize.col("User.firstName"), "firstName"],
          [Sequelize.col("User.lastName"), "lastName"],
        ],
        exclude: ["createdAt", "updatedAt", "eventId", "userId"],
      },
      include: [
        {
          model: User,
          attributes: [],
        },
      ],
    });
    return res.json({ Attendees: attendees });
  } else {
    attendees = await Attendance.findAll({
      where: {
        eventId: event.id,
        status: {
          [Op.notIn]: ["pending"],
        },
      },
      attributes: {
        include: [
          "status",
          Sequelize.col("User.id"),
          Sequelize.col("User.firstName"),
          Sequelize.col("User.lastName"),
        ],
      },
      include: [
        {
          model: User,
          attributes: [],
        },
      ],
    });
    return res.json({ Attendees: attendees });
  }
});

// * Request attendance for an event specified by id
event.post("/:eventId/attendance", async (req, res) => {
  const { user } = req;
  if (!user) {
    return res.status(401).json({ message: "Authentication required" });
  }

  const eventId = req.params.eventId;
  const event = await Event.findByPk(eventId);
  if (!event) {
    return res.status(404).json({ message: "Event couldn't be found" });
  }
  const membership = await Membership.findOne({ where: { userId: user.id } });
  if (!membership) {
    return res
      .status(404)
      .json({
        message: "Membership between the user and the group does not exist",
      });
  }
  const attendance = await Attendance.findOne({
    where: { userId: user.id, eventId: eventId },
  });
  const userId = user.id;

  if (!attendance) {
    await Attendance.create({
      eventId: eventId,
      userId: userId,
      status: "pending",
    });
  } else if (attendance.status === "pending") {
    return res
      .status(400)
      .json({ message: "Attendance has already been requested" });
  } else {
    return res
      .status(400)
      .json({ message: "User is already an attendee of the event" });
  }
});

// * Change the status of an attendance for an event specified by id

event.put("/:eventId/attendance", async (req, res) => {
  const { user } = req;
  if(!user){
    return res.status(401).json({ message: "Authentication required" });
  }

  const { userId, status } = req.body;
  const eventId = req.params.eventId;

  const userExists = await User.findByPk(userId);
  if (!userExists) {
    res.status(404).json({ message: "User couldn't be found" });
  }

  const event = await Event.findByPk(eventId);
  if (!event) {
    res.status(404).json({ message: "Event couldn't be found" });
  }

  if (status === "pending") {
    res
      .status(400)
      .json({ message: "Cannot change an attendance status to pending" });
  }

  const attendance = await Attendance.findOne({ where: { userId: userId } });
  if (!attendance) {
    res.status(404).json({
      message: "Attendance between the user and the event does not exist",
    });
  }

  const currUser = user.id;
  const groupId = event.groupId;
  const currUserMembership = await Membership.findOne({
    where: { userId: currUser, groupId: groupId },
  });
  const currUserStatus = currUserMembership.status;
  if (currUserStatus === "co-host") {
    await attendance.update({
      status: status,
    });
    return res.json({ attendance });
  } else {
    return res.status(403).json({ message: "Forbidden" });

  }
});

// * Delete an attendance to an event specified by id

event.delete("/:eventId/attendance/:userId", async (req, res) => {
  const { user } = req;
  if(!user){
    return res.status(401).json({ message: "Authentication required" });
  }

  const eventId = req.params.eventId;
  const userId = req.params.userId;

  const userExists = await User.findByPk(userId);
  if (!userExists) {
    res.status(404).json({ message: "User couldn't be found" });
  }

  const event = await Event.findByPk(eventId);
  if (!event) {
    res.status(404).json({ message: "Event couldn't be found" });
  }

  const attendance = await Attendance.findOne({ where: { userId: userId } });
  if (!attendance) {
    res.status(404).json({
      message: "Attendance between the user and the event does not exist",
    });
  }

  const currUser = user.id;
  const groupId = event.groupId;
  const currUserMembership = await Membership.findOne({
    where: { userId: currUser, groupId: groupId },
  });
  if (!currUserMembership) {
    res.status(404).json({
      message: "Membership between the user and the group does not exist",
    });
  }
  const currUserStatus = currUserMembership.status;
  if (currUserStatus === "co-host" || currUser === userId) {
    attendance.destroy();
    return res.json({ message: "Successfully deleted attendance from event" });
  }else{
    return res.status(403).json({ message: "Forbidden" });

  }
});

module.exports = event;
