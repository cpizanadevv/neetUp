const express = require("express");
const { Op, Sequelize } = require("sequelize");
const {
  Group,
  User,
  Membership,
  Venue,
  GroupImage,
} = require("../../db/models");
const { check } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");

const { setTokenCookie, restoreUser } = require("../../utils/auth");
const { IGNORE } = require("sequelize/lib/index-hints");

const group = express.Router();

// ! Make func for numMembers/previewImage
//!VALIDATORS

// Group Validator
const validateGroup = [
  check("name")
    .exists({ checkFalsy: true })
    .isLength({ max: 60 })
    // .custom(checkIsUnique)
    .withMessage("Name must be 60 characters or less."),
  check("about")
    .exists({ checkFalsy: true })
    .isLength({ min: 50 })
    .withMessage("About must be 50 characters or more."),
  check("type")
    .exists({ checkFalsy: true })
    .isIn(["Online", "In Person"])
    .withMessage("Type must be 'Online' or 'In Person'."),
  check("private")
    .exists({ checkFalsy: true })
    .isBoolean()
    .withMessage("Private must be a boolean value."),
  check("city").exists({ checkFalsy: true }).withMessage("City is required."),
  check("state").exists({ checkFalsy: true }).withMessage("State is required."),
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

//!ROUTES
// * Returns all Groups
group.get("/", async (req, res) => {
  // const members = numMembers();
  // const imgs = prevImage();
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
  return res.json(allGroups);
});

// * Returns all Groups currUser is a part of
group.get("/current", async (req, res) => {
  // const members = numMembers();
  // const imgs = prevImage();
  const { user } = req;

  if (user) {
    const groupOfCurrUser = await Group.findAll({
      attributes: {
        include: [
          "id",
          "updatedAt",
          "createdAt",
          [
            Sequelize.fn("COUNT", Sequelize.col("Memberships.id")),
            "numMembers",
          ],
          [Sequelize.col("GroupImages.url"), "previewImage"],
        ],
      },
      include: [
        {
          model: Membership,
          attributes: [],
          where: {
            userId: user.id,
            status: {
              [Op.or]: ["member", "co-host"],
            },
          },
        },
        {
          model: GroupImage,
          attributes: [],
        },
      ],
      group: ["Group.id", "GroupImages.id"],
    });
    return res.json(groupOfCurrUser);
  } else {
    return res.json({ message: "No user is currently logged in." });
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
  let organizerId = user.id;

  const groupName = await Group.findOne({
    where: { name },
  });
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
    };
    const status = "co-host";
    await Membership.create({
      userId: organizerId,
      groupId: group.id,
      status: status,
    });
    return res.status(201).json({ group: newGroup });
  }
});

// * Edits Group belonging to currUser
group.put("/:groupId", validateGroup, async (req, res) => {
  const { user } = req;
  const groupId = req.params.groupId;
  const { name, about, type, private, city, state } = req.body;
  const group = await Group.findByPk(groupId);

  const groupName = await Group.findOne({
    where: { name },
  });

  if (!group) {
    return res.status(404).json({ message: "Group couldn't be found" });
  }
  if (group.organizerId === user.id) {
    if (groupName) {
      return res.json({ message: "Group name already exists." });
    } else {
      await group.update({
        name: name,
        about: about,
        type: type,
        private: private,
        city: city,
        state: state,
      });
    }
  } else {
    return res.json({ message: "User is not owner of this group" });
  }
});
// * Deletes group belonging to currUser
group.delete("/:groupId", async (req, res) => {
  const { user } = req;
  const groupId = req.params.groupId;
  const group = await Group.findByPk(groupId);

  if (!group) {
    return res.status(404).json({ message: "Group couldn't be found" });
  }

  if (group.organizerId === user.id) {
    group.destroy();
  } else {
    return res.json({ message: "User is not owner of this group" });
  }

  return res.json({ message: "Successfully deleted" });
});

// * Adds Img to Group based on ID
group.post("/:groupId/images", validateImg, async (req, res) => {
  const { user } = req;
  const { url, preview } = req.body;
  const groupId = req.params.groupId;
  const group = await Group.findByPk(groupId);

  if (!group) {
    return res.status(404).json({ message: "Group couldn't be found" });
  }
  if (group.organizerId === user.id) {
    const img = GroupImage.create({ groupId, url, preview });

    const newImg = {
      id: img.id,
      groupId: img.groupId,
      url: img.url,
      preview: img.preview,
    };
  } else {
    return res.status(404).json({ message: "User is not owner of this group" });
  }
});
// * Returns all Venues for Group by ID
group.get("/:groupId/venues", async (req, res) => {
  const groupId = req.params.groupId;
  const group = await Group.findByPk(groupId);

  if (!group) {
    return res.status(404).json({ message: "Group couldn't be found" });
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
  const { usersId, groupsId,address, city, state, lat, lng } = req.body;
  const { user } = req;
  const groupId = req.params.groupId;
  const group = await Group.findByPk(groupId);
  const userId = user.id;
  const member = await Membership.findByPk(userId);

  if (!group) {
    return res.status(404).json({ message: "Group couldn't be found" });
  }

  if (user && group.organizerId === userId || member === 'co-host') {
    const venue = Venue.create({
      usersId,
      groupsId,
      address,
      city,
      state,
      lat,
      lng,
    });

    const newVenue = {
      groupId: groupId,
      address: venue.address,
      city: venue.city,
      state: venue.state,
      lat: venue.lat,
      lng: venue.lng,
    };
    return res.json({ venue: newVenue });
  }else {
    return res.status(404).json({ message: "User is not co-host of this group" });
  }
});

module.exports = group;
