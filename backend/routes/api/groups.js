const express = require("express");
const { Sequelize } = require("sequelize");
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

// ! Make func for numMembers/previewImage
// * Counts members and include imagePrev

// const numMembers = () => {
//   return {
//     attributes: {
//       include: [
//         [Sequelize.fn('COUNT', Sequelize.col('Memberships.id')), 'numMembers'],
//         [Sequelize.col('GroupImages.url'), 'previewImage']
//       ]
//     },
//     include: [
//       {
//         model: Membership,
//         attributes: []
//       },
//       {
//         model: GroupImage,
//         attributes: []
//       }
//     ],
//     group: ['Group.id', 'GroupImages.id']
//   };
// };

// // * include imagePrev

// const prevImage = () => {
//   return {
//     attributes: {
//       include: [
//         [Sequelize.col('GroupImages.url'), 'previewImage']
//       ]
//     },
//     include: [
//       {
//         model: GroupImage,
//         attributes: []
//       }
//     ],
//     group: ["Group.id", "GroupImages.id"],
//   };
// };

//ROUTES

// * Returns all Groups
group.get("/", async (req, res) => {
  // const members = numMembers();
  // const imgs = prevImage();
  const allGroups = await Group
    .findAll
    // members// imgs,
    ();
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
            status: "member" || 'co-host',
          },
        },
      ],
    });
    return res.json(groupOfCurrUser);
  }
});

// * Returns all Group by it's ID
group.get("/:groupId", async (req, res) => {
  // const members = numMembers();
  const currGroupId = req.params.groupId;
  
  if (!currGroupId) {
    const organizer = currGroupId.organizerId;
    const groupById = await Group.findOne({
      where: {
        id: currGroupId,
      },
      include: [
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

    return res.json(groupById);
  }else {
    res.status(404);
    res.send({ message: "Group couldn't be found" })
  }
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
