const express = require("express");
const { Op, Sequelize } = require("sequelize");
const {
  Attendance,
  EventImage,
  Event,
  Group,
  User,
  Membership,
  Venue,
  GroupImage,
} = require("../../db/models");
const { check } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");
const { isColString } = require("sequelize/lib/utils");

const group = express.Router();

//!VALIDATORS

// Group Validator
const validateGroup = [
  check("name")
    .exists({ checkFalsy: true })
    .isLength({ max: 60 })
    .withMessage("Name must be 60 characters or less."),
  check("about")
    .exists({ checkFalsy: true })
    .isLength({ min: 50 })
    .withMessage("About must be 50 characters or more."),
  check("type")
    .exists({ checkFalsy: true })
    .isIn(["In Person", "Online"])
    .withMessage("Type must be 'Online' or 'In Person'."),
  check("private").isBoolean().withMessage("Private must be a boolean value."),
  check("city")
    .exists({ checkFalsy: true })
    .isLength({ min: 2, max: 20 })
    .notEmpty()
    .withMessage("City is required"),
  check("state")
    .exists({ checkFalsy: true })
    .isLength({ min: 2, max: 20 })
    .withMessage("State is required."),
  handleValidationErrors,
];

// GroupImage Validator
const validateImg = [
  check("url")
    .exists({ checkFalsy: true })
    .notEmpty()
    .withMessage('Status must be either "co-host", "member",or "pending"'),
  check("preview")
    .exists({ checkFalsy: true })
    .notEmpty()
    .isBoolean()
    .withMessage('Status must be either "co-host", "member",or "pending"'),
  handleValidationErrors,
];
// Venue Validator
const validateVenue = [
  check("address")
    .exists({ checkFalsy: true })
    .notEmpty()
    .withMessage("Street address is required"),
  check("city")
    .exists({ checkFalsy: true })
    .isLength({ min: 2, max: 20 })
    .notEmpty()
    .withMessage("City is required"),
  check("state")
    .exists({ checkFalsy: true })
    .isLength({ min: 2, max: 20 })
    .withMessage("State is required."),
  check("lat")
    .exists({ checkFalsy: true })
    .notEmpty()
    .isFloat({ min: -90, max: 90 })
    .withMessage('Latitude must be within -90 and 90"'),
  check("lng")
    .exists({ checkFalsy: true })
    .isFloat({ min: -180, max: 180 })
    .withMessage("Longitude must be within -180 and 180"),

  handleValidationErrors,
];
// Event Validator
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

//!ROUTES
// * Returns all Groups
group.get("/", async (req, res) => {
  const allGroups = await Group.findAll({
    attributes: {
      include: [
        "id",
        "updatedAt",
        "createdAt",
        [Sequelize.fn("COUNT", Sequelize.col("Memberships.id")), "numMembers"],
        [Sequelize.col("GroupImages.url"), "previewImage"],
      ],
    },
    include: [
      {
        model: Membership,
        attributes: [],
      },
      {
        model: GroupImage,
        attributes: [],
      },
    ],
    group: ["Group.id", "GroupImages.id"],
  });
  return res.json({ Groups: allGroups });
});

// * Returns all Groups currUser is a part of
group.get("/current", async (req, res) => {
  const { user } = req;

  if (user) {
    const groupsOfCurrUser = await Group.findAll({
      attributes: [
        "id",
        "organizerId",
        "name",
        "about",
        "type",
        "private",
        "city",
        "state",
        "createdAt",
        "updatedAt",
      ],
      include: [
        {
          model: Membership,
          attributes: [],
          where: {
            userId: user.id,
          },
        },
        {
          model: GroupImage,
          attributes: [[Sequelize.col("url"), "previewImage"]],
        },
      ],
      group: ["Group.id", "GroupImages.id"],
    });

    const groupIds = groupsOfCurrUser.map((group) => group.id);
    const memberCounts = await Membership.findAll({
      where: {
        groupId: groupIds,
        status: {
          [Op.or]: ["member", "co-host"],
        },
      },
      attributes: [
        "groupId",
        [Sequelize.fn("COUNT", Sequelize.col("id")), "numMembers"],
      ],
      group: ["groupId"],
    });

    const memberCountMap = {};
    memberCounts.forEach((count) => {
      memberCountMap[count.groupId] = count.get("numMembers");
    });

    // Format
    const formattedGroups = groupsOfCurrUser.map((group) => {
      return {
        id: group.id,
        organizerId: group.organizerId,
        name: group.name,
        about: group.about,
        type: group.type,
        private: group.private,
        city: group.city,
        state: group.state,
        createdAt: group.createdAt,
        updatedAt: group.updatedAt,
        numMembers: memberCountMap[group.id] || 0,
        // previewImage:group.previewImage
      };
    });

    return res.json({ Groups: formattedGroups });
  } else {
    return res.status(401).json({ message: "Authentication required" });
  }
});

// * Returns Group by it's ID
group.get("/:groupId", async (req, res) => {
  const currGroupId = req.params.groupId;

  //Validates

  if (isNaN(currGroupId) || currGroupId <= 0) {
    res.status(404).json({
      message: "Group couldn't be found",
    });
  }

  const groupById = await Group.findOne({
    where: {
      id: currGroupId,
    },
    attributes: {
      include: [
        [Sequelize.fn("COUNT", Sequelize.col("Memberships.id")), "numMembers"],
      ],
    },
    include: [
      {
        model: Membership,
        attributes: [],
        where: {
          status: {
            [Op.or]: ["member", "co-host"],
          },
        },
      },
      {
        model: GroupImage,
        attributes: {
          exclude: ["groupId", "createdAt", "updatedAt"],
        },
      },
      {
        model: User,
        as: "Organizer",
        attributes: {
          exclude: [
            "username",
            "email",
            "hashedPassword",
            "createdAt",
            "updatedAt",
          ],
        },
      },
      {
        model: Venue,
        attributes: {
          exclude: ["createdAt", "updatedAt"],
        },
      },
    ],
    group: ["Group.id", "GroupImages.id", "Memberships.id"],
  });
  if (groupById.id === null) {
    return res.status(404).json({
      message: "Group couldn't be found",
    });
  }
  return res.json(groupById);
});

// * Creates and returns Group
group.post("/", validateGroup, async (req, res) => {
  const { name, about, type, private, city, state } = req.body;
  const { user } = req;
  if (!user) {
    return res.status(401).json({ message: "Authentication required" });
  }
  let organizerId = user.id;

  const groupName = await Group.findOne({ where: { name } });
  if (groupName) {
    return res.status(400).json({ message: "Group name already exists." });
  } else {
    const group = await Group.create({
      organizerId,
      name,
      about,
      type,
      private,
      city,
      state,
    });

    const newGroup = {
      id: group.id,
      organizerId: group.organizerId,
      name: group.name,
      about: group.about,
      type: group.type,
      private: group.private,
      city: group.city,
      state: group.state,
      createdAt: group.createdAt,
      updatedAt: group.updatedAt,
    };
    const status = "co-host";
    await Membership.create({
      userId: organizerId,
      groupId: group.id,
      status: status,
    });
    return res.status(201).json(newGroup);
  }
});

// * Edits Group belonging to currUser
group.put("/:groupId", validateGroup, async (req, res) => {
  const { user } = req;
  const groupId = req.params.groupId;
  const { name, about, type, private, city, state } = req.body;
  if (!user) {
    return res.status(401).json({ message: "Authentication required" });
  }
  const group = await Group.findByPk(groupId);

  if (!group) {
    return res.status(404).json({ message: "Group couldn't be found" });
  }
  if (group.organizerId !== user.id) {
    return res.status(403).json({ message: "Forbidden" });
  }

  const groupNameExists = await Group.findOne({
    where: { name: name },
  });
  if (groupNameExists) {
    return res.json({ message: "Group name already exists." });
  }

  if(!name) name = group.name;
  if(!about) about = group.about;
  if(!type) type = group.type;
  if(!private) private = group.private;
  if(!city) city = group.city;
  if(!state) state = group.state;

  const updatedGroup = await group.update({
    name,
    about,
    type,
    private,
    city,
    state,
  });
  return res.json(updatedGroup);
});
// * Deletes group belonging to currUser
group.delete("/:groupId", async (req, res) => {
  const { user } = req;
  const groupId = req.params.groupId;
  const group = await Group.findByPk(groupId);
  if (!user) {
    return res.status(401).json({ message: "Authentication required" });
  }

  if (!group) {
    return res.status(404).json({ message: "Group couldn't be found" });
  }

  if (group.organizerId === user.id) {
    group.destroy();
  } else {
    return res.status(403).json({ message: "Forbidden" });
  }

  return res.json({ message: "Successfully deleted" });
});

// * Adds Img to Group based on ID
group.post("/:groupId/images", validateImg, async (req, res) => {
  const { user } = req;
  const { url, preview } = req.body;
  const groupId = req.params.groupId;
  const group = await Group.findByPk(groupId);

  if (!user) {
    return res.status(401).json({ message: "Authentication required" });
  }

  if (!group) {
    return res.status(404).json({ message: "Group couldn't be found" });
  }
  if (group.organizerId === user.id) {
    const img = await GroupImage.create({ groupId, url, preview });

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
// * Returns all Venues for Group by ID
group.get("/:groupId/venues", async (req, res) => {
  const { user } = req;
  if (!user) {
    return res.status(401).json({ message: "Authentication required" });
  }
  const groupId = req.params.groupId;
  const group = await Group.findByPk(groupId);
  if (!group) {
    return res.status(404).json({ message: "Group couldn't be found" });
  }

  const organizerId = group.organizerId;

  if (user.id !== organizerId) {
    return res.status(403).json({ message: "Forbidden" });
  }

  const venuesOfGroup = await Venue.findAll({
    where: {
      groupId: groupId,
    },
    attributes: {
      exclude: ["createdAt", "updatedAt"],
    },
  });
  return res.json(venuesOfGroup);
});
// * Create newVenue for Group by ID
group.post("/:groupId/venues", validateVenue, async (req, res) => {
  const { address, city, state, lat, lng } = req.body;
  const { user } = req;
  if (!user) {
    return res.status(401).json({ message: "Authentication required" });
  }
  const userId = user.id;
  const groupId = req.params.groupId;
  const group = await Group.findByPk(groupId);
  if (!group) {
    return res.status(404).json({ message: "Group couldn't be found" });
  }
  const member = await Membership.findOne({ where:{userId:userId} });
  const status = member.status;

  if (status && status === "co-host") {
    const venue = await Venue.create({
      userId,
      groupId,
      address,
      city,
      state,
      lat,
      lng,
    });
    const newVenue = {
      id: venue.id,
      groupId: venue.groupId,
      address: venue.address,
      city: venue.city,
      state: venue.state,
      lat: venue.lat,
      lng: venue.lng,
    };
    return res.json({ venue: newVenue });
  } else {
    return res.status(403).json({ message: "Forbidden" });
  }
});

// * Get all Events of a Group by ID
group.get("/:groupId/events", async (req, res) => {
  const groupId = req.params.groupId;
  const group = await Group.findByPk(groupId);

  if (!group) {
    return res.status(404).json({ message: "Group couldn't be found" });
  } else {
    const eventsOfGroup = await Event.findAll({
      where: {
        groupId: groupId,
      },
      attributes: {
        exclude: ["createdAt", "updatedAt", "description", "capacity", "price"],
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
      group: ["Event.id", "EventImages.id", "Group.id", "Venue.id"],
    });
    return res.json(eventsOfGroup);
  }
});

// * Create and return Event for Group by its ID
group.post("/:groupId/events", validateEvent, async (req, res) => {
  // Extracting from req
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

  const groupId = req.params.groupId;
  const { user } = req;
  if (!user) {
    return res.status(401).json({ message: "Authentication required" });
  }

  const venue = await Venue.findByPk(venueId);
  if (!venue) {
    return res.status(404).json({ message: "Venue couldn't be found" });
  }

  const group = await Group.findByPk(groupId);
  if (!group) {
    return res.status(404).json({ message: "Group couldn't be found" });
  }

  const membership = await Membership.findOne({ where: { groupId: groupId } });
  if (!membership) {
    return res.status(403).json({ message: "Forbidden" });
  }
  const status = membership.status;
  // Must be co-host to create
  if (status === "co-host") {
    const event = await Event.create({
      groupId,
      venueId,
      name,
      description,
      type,
      capacity,
      price,
      startDate,
      endDate,
    });

    const newEvent = {
      id: event.id,
      groupId: event.groupId,
      venueId: event.venueId,
      name: event.name,
      description: event.description,
      type: event.type,
      capacity: event.capacity,
      price: event.price,
      startDate: event.startDate,
      endDate: event.endDate,
    };

    return res.json({ event: newEvent });
  } else {
    return res.status(403).json({ message: "Forbidden" });
  }
});

// * Return all Members for a group by groupID
group.get("/:groupId/members", async (req, res) => {
  const { user } = req;
  const groupId = req.params.groupId;

  const group = await Group.findByPk(groupId);
  if (!group) {
    return res.status(404).json({ message: "Group couldn't be found" });
  }
  const membership = await Membership.findOne({
    where: {
      userId: user.id,
      groupId: groupId,
    },
  });
  let allMembers;
  if (membership && membership.status === "co-host") {
    allMembers = await Membership.findAll({
      where: {
        groupId: groupId,
      },
      attributes: {
        exclude: ["createdAt", "updatedAt", "userId", "groupId"],
        include: ["status"],
      },
      include: [
        {
          model: User,
          as: "memberId",
          attributes: { include: ["firstName", "lastName"] },
        },
      ],
      exclude: ["createdAt", "updatedAt"],
    });
  } else {
    allMembers = await Membership.findAll({
      where: {
        groupId: groupId,
        status: {
          [Op.notIn]: ["pending"],
        },
      },
    });
  }
  const formattedMembers = allMembers.map((member) => {
    const { status } = member;
    const { id, firstName, lastName } = member.memberId;
    return { id, firstName, lastName, Membership: { status } };
  });

  return res.json({ Members: formattedMembers });
});

//* Request Membership to group by its ID
group.post("/:groupId/membership", async (req, res) => {
  const { user } = req;
  if (!user) {
    return res.status(401).json({ message: "Authentication required" });
  }

  const groupId = req.params.groupId;
  const group = await Group.findByPk(groupId);
  if (!group) {
    return res.status(404).json({ message: "Group couldn't be found" });
  }

  const membership = await Membership.findOne({
    where: { userId: user.id, groupId: groupId },
  });
  const currStatus = membership.status;

  if (membership && currStatus === "pending") {
    return res
      .status(400)
      .json({ message: "Membership has already been requested" });
  }

  if (membership && currStatus === "member" || currStatus === "co-host") {
    return res
      .status(400)
      .json({ message: "User is already a member of the group" });
  }

  const status = "pending";
  await Membership.create({
    userId: user.id,
    groupId: groupId,
    status: status,
  });

  return res.json({
    memberId: user.id,
    status: status,
  });
});

// * Co-Host || Organizer change Membership status for group by its ID
group.put("/:groupId/membership", async (req, res) => {
  const { user } = req;
  if (!user) {
    return res.status(401).json({ message: "Authentication required" });
  }

  const groupId = req.params.groupId;
  const { memberId, status } = req.body;

  const isUser = await User.findByPk(memberId);
  if (!isUser) {
    return res.status(404).json({ message: "User couldn't be found" });
  }

  const group = await Group.findByPk(groupId);
  if (!group) {
    return res.status(404).json({ message: "Group couldn't be found" });
  }

  const host = group.organizerId;
  const membership = await Membership.findOne({
    where: { userId: user.id, groupId: groupId },
  });
  const userStatus = membership.status;

  const pendingMember = await Membership.findOne({
    where: { userId: memberId, groupId: groupId },
  });
  if (!pendingMember) {
    return res.status(404).json({
      message: "Membership between the user and the group does not exist",
    });
  }

  let updatedMember;

  if (status === "co-host") {
    if (user.id !== host) {
      return res.status(403).json({ message: "Forbidden" });
    }
    updatedMember = await pendingMember.update({
      status: "co-host",
    });
  } else if (status === "member") {
    if (userStatus !== "co-host") {
      return res.status(403).json({ message: "Forbidden" });
    }
    updatedMember = await pendingMember.update({
      status: "member",
    });
  } else if (status === "pending") {
    return res
      .status(400)
      .json({ message: "Cannot change a membership status to pending" });
  }
  return res.json(updatedMember);
});

// * Delete membership to a group specified by id
group.delete("/:groupId/membership/:memberId", async (req, res) => {
  const { user } = req;
  if (!user) {
    return res.status(401).json({ message: "Authentication required" });
  }

  const groupId = req.params.groupId;
  const memberId = req.params.memberId;

  const member = await User.findByPk(memberId);
  if (!member) {
    return res.status(404).json({ message: "User couldn't be found" });
  }

  const group = await Group.findByPk(groupId);
  if (!group) {
    return res.status(404).json({ message: "Group couldn't be found" });
  }

  const memberShip = await Membership.findOne({
    where: { userId: memberId, groupId: groupId },
  });
  if (!memberShip) {
    return res
      .status(404)
      .json({ message: "Membership does not exist for this User" });
  }

  const host = group.organizerId;
  console.log("THIS IS USER ID: ", user.id);
  console.log("THIS IS Member ID: ", memberId);
  console.log(user.id == memberId);

  if (user.id === host || user.id == memberId) {
    memberShip.destroy();
    return res.json({
      message: "Successfully deleted membership from group",
    });
  }else{
    res.status(403).json({message: "Forbidden"})
  }
});

module.exports = group;
