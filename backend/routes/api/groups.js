const express = require("express");
const { Op, Sequelize } = require("sequelize");
const {
  Group,
  User,
  Membership,
  Venue,
  GroupImage,
} = require("../../db/models");
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const { setTokenCookie, restoreUser } = require("../../utils/auth");
const { IGNORE } = require("sequelize/lib/index-hints");

const group = express.Router();

// ! Make func for numMembers/previewImage

//ROUTES

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
    const groupOfCurrUser = await Group.findAll({attributes: {
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
// const checkIsUnique = async (name) => {
//   const group = await await Group.findOne({
//     where: name
//   })
//   if (group){
//     throw new Error('Group name already exists.')
//   }
// }

const validateGroup = [
  check('name')
    .exists({ checkFalsy: true })
    .isLength({ max: 60 })
    // .custom(checkIsUnique)
    .withMessage('Name must be 60 characters or less.'),
  check('about')
    .exists({ checkFalsy: true })
    .isLength({ min: 50 })
    .withMessage('About must be 50 characters or more.'),
  check('type')
    .exists({ checkFalsy: true })
    .isIn(['Online', 'In Person'])
    .withMessage("Type must be 'Online' or 'In Person'."),
  check('private')
    .exists({ checkFalsy: true })
    .isBoolean()
    .withMessage('Private must be a boolean value.'),
  check('city')
    .exists()
    .withMessage('City is required.'),
  check('state')
    .exists()
    .withMessage('State is required.'),
  handleValidationErrors
];

// ! Creates and returns Group
group.post("/", validateGroup, async (req, res) => {
  const { name, about, type, private, city, state } = req.body;
  const {user} = req;
  const organizer = user.id;

  const group = Group.create({
    name,
    about,
    type,
    private,
    city,
    state,
  });
  const newGroup = {
    organizerId : organizer,
    name:name,
    about:about,
    type:type,
    private:private,
    city:city,
    state:state,
  };

  return res.json({group:newGroup});
});

// ! Adds Img to Group based on ID
group.post("/:groupId/images", async (req, res) => {
  const { url, preview } = req.body;

  const newImg = GroupImage.build({
    groupId: this.group.id,
    url: url,
    preview: preview,
  });

  await newImg.save();
});

// ! Edits Group belonging to currUser

// ! Deletes belonging to currUser
// group.delete('/:groupId', async (req,res) => {

// })

// * Returns all Venues for Group by ID
group.get("/:groupId/venues", async (req, res) => {
  const id = req.params.groupId;
  const venuesOfGroup = await Venue.findAll({
    where: {
      groupId: id,
    },
    attributes: {
      exclude: ["createdAt", "updatedAt"],
    },
  });
  return res.json(venuesOfGroup);
});
// ! Create newVenue for Group by ID
// ! Edit Venue by ID

module.exports = group;
