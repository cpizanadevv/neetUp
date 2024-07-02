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
const { requireAuth } = require("../../utils/auth");
const e = require("express");

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
    .isIn(["Online", "In Person", "In person"])
    .withMessage("Type must be 'Online' or 'In Person'."),
  check("capacity")
    .exists({ checkFalsy: true })
    .isInt()
    .withMessage("Capacity must be an integer"),
  check("price").isFloat({ min: 0 }).withMessage("Price is invalid"),
  check("startDate")
    .exists({ checkFalsy: true })
    .custom((value) => {
      if (isNaN(Date.parse(value))) {
        throw new Error("Start date must be a valid date.");
      }
      if (new Date(value) <= new Date()) {
        throw new Error("Start date must be in the future.");
      }
      return true;
    }),
  check("endDate")
    .exists({ checkFalsy: true })
    .custom((value, { req }) => {
      if (isNaN(Date.parse(value))) {
        throw new Error("End date must be a valid date.");
      }
      if (new Date(value) <= new Date(req.body.startDate)) {
        throw new Error("End date must be after the start date.");
      }
      return true;
    }),
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

// const validateParams = [
//   check("page")
//   .optional()
//     .isInt({ min: 1 })
//     .withMessage("Page must be greater than or equal to 1"),
//   check("size")
//   .optional()
//     .isInt({ min: 1 })
//     .withMessage("Size must be greater than or equal to 1"),
//   check("name").optional().isAlpha().withMessage("Name must be a string"),
//   check("type")
//     .optional()
//     .isIn(["Online", "In Person"])
//     .withMessage("Type must be 'Online' or 'In Person'"),
//   handleValidationErrors,
// ];

// * Get all Events
event.get("/", async (req, res) => {
  let { page, size, name, type, startDate } = req.query;
  let pagination = {};
  let where = {};
  const errors = {};

  page = parseInt(page);
  size = parseInt(size);

  if (page <= 0) {
    errors.page = "Page must be greater than or equal to 1";
  } else if (!page || isNaN(page)) {
    page = 1;
  }
  if (size <= 0) {
    errors.size = "Size must be greater than or equal to 1";
  } else if (!size || isNaN(size)) {
    size = 20;
  }

  if (name) {
    if (typeof(name) !== "string" || !isNaN(name) || name != null) {
      errors.name = "Name must be a string";
    } else {
      where.name = {
        [Op.like]: `%${name}%`,
      };
    }
  }
  if (type) {
    if (typeof(type) !== "string" || type !='Online' || type !== 'In Person') {
      errors.type = "Type must be 'Online' or 'In Person'";
    } else {
      where.type = type;
    }
  }
  if (startDate) {
    let setDate = new Date(startDate);
    if (isNaN(setDate)) {
      errors.startDate = "Start date must be a valid datetime";
    } else {
      where.startDate = { [Op.gte]: date };
    }
  }
  if (Object.keys(errors).length) {
    res.status(400);
    return res.json({
      message: "Bad Request",
      errors: { ...errors },
    });
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
    // where,
    // ...pagination,
    // subQuery: false,
    order: [["id", "ASC"]],
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
    order: [["id", "ASC"]],
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
event.post("/:eventId/images", requireAuth, validateImg, async (req, res) => {
  const { user } = req;
  if (!user) {
    return res.status(401).json({ message: "Authentication required" });
  }
  const userId = user.id;

  const { url, preview } = req.body;
  const eventId = req.params.eventId;
  const event = await Event.findByPk(eventId);
  if (!event) {
    return res.status(404).json({ message: "Event couldn't be found" });
  }
  const groupId = event.groupId;
  const membership = await Membership.findOne({
    where: { userId: userId, groupId: groupId },
  });

  const attendance = await Attendance.findOne({
    where: { userId: user.id, eventId: eventId },
  });
  // if(!membership){
  //   return res.status(403).json({ message: "Forbidden" });
  // }

  if (
    (membership && membership.status === "co-host") ||
    (attendance && attendance.status === "attending")
  ) {
    const img = await EventImage.create({ eventId, url, preview });

    const newImg = {
      id: img.id,
      url: img.url,
      preview: img.preview,
    };
    return res.json(newImg);
  } else {
    return res.status(403).json({ message: "Forbidden" });
  }
});

// * Edit and return event by it's ID
event.put("/:eventId", requireAuth, validateEvent, async (req, res) => {
  let {
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
  const userId = user.id;

  const eventId = req.params.eventId;
  const event = await Event.findByPk(eventId);
  if (!event) {
    return res.status(404).json({ message: "Event couldn't be found" });
  }

  const groupId = event.groupId;

  const venue = await Venue.findByPk(venueId);
  if (!venue) {
    return res.status(404).json({ message: "Venue couldn't be found" });
  }

  const membership = await Membership.findOne({
    where: { userId: userId, groupId: groupId },
  });

  if (!name) name = event.name;
  if (!description) description = event.description;
  if (!type) type = event.type;
  if (!capacity) capacity = event.capacity;
  if (!price) price = event.price;
  if (!startDate) startDate = event.startDate;
  if (!endDate) endDate = event.endDate;

  // Must be co-host to update
  if (!membership || membership.status !== "co-host") {
    return res.status(403).json({ message: "Forbidden" });
  } else {
    const updatedEvent = await event.update({
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
      type: updatedEvent.type,
      capacity: updatedEvent.capacity,
      price: updatedEvent.price,
      description: updatedEvent.description,
      startDate: updatedEvent.startDate,
      endDate: updatedEvent.endDate,
    };

    return res.json(newEvent);
  }
});

// * Deletes Event by it's ID
event.delete("/:eventId", requireAuth, async (req, res) => {
  const { user } = req;

  const eventId = req.params.eventId;
  const event = await Event.findByPk(eventId);
  if (!event) {
    return res.status(404).json({ message: "Event couldn't be found" });
  }
  const userId = user.id;
  const groupId = event.groupId;
  const membership = await Membership.findOne({
    where: { userId: userId, groupId: groupId },
  });

  if (membership && membership.status === "co-host") {
    event.destroy();
    return res.json({ message: "Successfully deleted" });
  } else {
    return res.status(403).json({ message: "Forbidden" });
  }
});

// * Get all Attendees of an Event specified by its id
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
      order: [["id", "ASC"]],
      attributes: ["status"],
      include: [
        {
          model: User,
          attributes: ["id", "firstName", "lastName"],
        },
      ],
    });
  } else {
    attendees = await Attendance.findAll({
      where: {
        eventId: event.id,
        status: {
          [Op.notIn]: ["pending"],
        },
      },
      order: [["id", "ASC"]],
      attributes: ["status"],
      include: [
        {
          model: User,
          attributes: ["id", "firstName", "lastName"],
        },
      ],
    });
  }
  const formatAttendees = attendees.map((attendance) => ({
    id: attendance.User.id,
    firstName: attendance.User.firstName,
    lastName: attendance.User.lastName,
    Attendance: {
      status: attendance.status,
    },
  }));

  return res.json({ Attendees: formatAttendees });
});

// * Request attendance for an event specified by id
event.post("/:eventId/attendance", requireAuth, async (req, res) => {
  const { user } = req;

  const eventId = req.params.eventId;
  const event = await Event.findByPk(eventId);
  if (!event) {
    return res.status(404).json({ message: "Event couldn't be found" });
  }

  const userId = user.id;
  const groupId = event.groupId;
  const membership = await Membership.findOne({
    where: { userId: userId, groupId: groupId },
  });
  if (!membership) {
    return res.status(403).json({ message: "Forbidden" });
  }

  if (membership.status === "co-host" || membership.status === "member") {
    const attendance = await Attendance.findOne({
      where: { userId: userId, eventId: eventId },
    });

    if (!attendance) {
      const attend = await Attendance.create({
        eventId: eventId,
        userId: userId,
        status: "pending",
      });
      return res.json({ userId: userId, status: attend.status });
    } else if (attendance.status === "pending") {
      return res
        .status(400)
        .json({ message: "Attendance has already been requested" });
    } else {
      return res
        .status(400)
        .json({ message: "User is already an attendee of the event" });
    }
  } else {
    return res.status(403).json({ message: "Forbidden" });
  }
});

// * Change the status of an attendance for an event specified by id

event.put("/:eventId/attendance", requireAuth, async (req, res) => {
  const { user } = req;

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

  const attendance = await Attendance.findOne({
    where: { userId: userId, eventId: eventId },
  });
  if (!attendance) {
    res.status(404).json({
      message: "Attendance between the user and the event does not exist",
    });
  }

  const currUserId = user.id;
  const groupId = event.groupId;
  const currUserMembership = await Membership.findOne({
    where: { userId: currUserId, groupId: groupId },
  });

  if (currUserMembership && currUserMembership.status === "co-host") {
    const attend = await attendance.update({
      status: status,
    });
    return res.json({
      id: attend.id,
      eventId: +eventId,
      userId: userId,
      status: attend.status,
    });
  } else {
    return res.status(403).json({ message: "Forbidden" });
  }
});

// * Delete an attendance to an event specified by id

event.delete("/:eventId/attendance/:userId", requireAuth, async (req, res) => {
  const { user } = req;

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

  const attendance = await Attendance.findOne({
    where: { userId: userId, eventId: eventId },
  });
  if (!attendance) {
    res.status(404).json({
      message: "Attendance between the user and the event does not exist",
    });
  }

  const currUserId = +user.id;
  const groupId = event.groupId;
  const group = await Group.findByPk(groupId);
  const hostId = +group.organizerId;

  if (hostId == userId || currUserId == userId) {
    await attendance.destroy();
    return res.json({ message: "Successfully deleted attendance from event" });
  } else {
    return res.status(403).json({ message: "Forbidden" });
  }
});

module.exports = event;
