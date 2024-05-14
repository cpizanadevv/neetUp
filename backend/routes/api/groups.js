const express = require('express');
const { Sequelize } = require('sequelize');
const { Group,User,Membership,Venue,GroupImage } = require('../../db/models');


const group = express.Router();


// ! Make middleware func for numMembers

// * Returns all Groups
group.get('/', async(req,res) => {
    const allGroups = await Group.findAll({
        attributes: {
          include: [
            [Sequelize.fn('COUNT', Sequelize.col('Memberships.id')), 'numMembers'],
            [Sequelize.col('GroupImages.url'), 'previewImage']
          ]
        },
        include: [
          {
            model: Membership,
            attributes: []
          },
          {
            model: GroupImage,
            attributes: []
          }
        ],
        group: ['Group.id', 'GroupImages.id']
      });
      return res.json(allGroups);
})


// ? Returns all Groups currUser is a part of

// * Returns all Group by it's ID

group.get('/:groupId', async(req,res) => {
    const currGroupId = req.params.groupId;
    const groupById = await Group.findOne({
        where : {
            id: currGroupId,
        },
        attributes:{

        }
    }
    );
    
    return res.json(groupById)

})
// ! Creates and returns Group
// ! Adds Img to Group based on ID
// ! Edits Group belonging to currUser
// ! Deletes belonging to currUser
// ! Returns all Groups













module.exports = group;