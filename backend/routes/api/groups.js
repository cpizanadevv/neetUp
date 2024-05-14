const express = require("express");
const { Sequelize } = require("sequelize");
const {
  Group,
  User,
  Membership,
  Venue,
  GroupImage,
} = require("../../db/models");

const group = express.Router();

                // FUNCTIONS

// ! Make func for numMembers/previewImage
// * Counts members and include imagePrev

const numMembers = () => {
  return {
    attributes: {
      include: [
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
  };
};

// * include imagePrev

const prevImage = () => {
  return {
    attributes: {
      include: [
        [Sequelize.col("GroupImages.url"), "previewImage"],
      ],
    },
    include: [
      {
        model: GroupImage,
        attributes: [],
      },
    ],
    group: ["Group.id", "GroupImages.id"],
  };
};

const getCurrUser = (req,res) => {
  const { user } = req;
    if(user) {
        const safeUser = {
            id: user.id,
            email: user.email,
            username: user.username
        };
        return res.json({
            user: safeUser
        });
    }else return res.json({ user: null });
}


                  //ROUTES

// * Returns all Groups
group.get("/", async (req, res) => {
  const members = numMembers();
  const imgs = prevImage();
  const allGroups = await Group.findAll(members,imgs);
  return res.json(allGroups);
});

// ! find currUser
// ? Returns all Groups currUser is a part of
group.get("/current", async (req, res) => {
  const members = numMembers();
  const imgs = prevImage();
  const currUser = getCurrUser();

  if(currUser){
    const groupOfCurrUser = await Membership.findByPk(currUser.id,{
      include:
    },members,imgs);
  }


  
  return res.json(groupOfCurrUser);
});

// * Returns all Group by it's ID

group.get("/:groupId", async (req, res) => {
  const currGroupId = req.params.groupId;
  const groupById = await Group.findOne({
    where: {
      id: currGroupId,
    },
  });

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
// ! Edits Group belonging to currUser
// ! Deletes belonging to currUser
// ! Returns all Groups

module.exports = group;
