const express = require("express");
const { Op, Sequelize } = require("sequelize");
const {
  Group,
  User,
  Membership,
  Venue,
  GroupImage,
} = require("../../db/models");

const { setTokenCookie, restoreUser } = require("../../utils/auth");

const group = express.Router();


// FUNCTIONS

const validGroupId = (req,res,next) => {
  const groupId = req.params.groupById;
  if(isNaN(groupId) || groupId <= 0)
}

// ! Make func for numMembers/previewImage
// * Counts members and include imagePrev


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
    const groupOfCurrUser = await Group.findAll({
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
      ],
    });
    return res.json(groupOfCurrUser);
  }
});

// * Returns Group by it's ID
group.get("/:groupId", async (req, res) => {
  const currGroupId = req.params.groupId;
  console.log("THIS IS CURRENT GROUP ID:", currGroupId);

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

  if (!groupById) {
    return res.status(404).json({ message: "Group couldn't be found" });
  }
  return res.json(groupById);
});

// ! Creates and returns Group
group.post("/", async (req, res) => {
  const { name, about, type, private, city, state } = req.body;

  const newGroup = Group.build({
    name: name,
    about: about,
    type: type,
    private: private,
    city: city,
    state: state,
  });

  await newGroup.save();
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
