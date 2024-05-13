const express = require('express');
const { Group, Membership } = require('../../db/models')

const group = express.Router();

// * Returns all groups
group.get('/',async (req,res) => {
    let allGroups = await Group.findAll();
    return res.json(allGroups)
});


// * Returns all that current user is a part of
// group.get('/current',async (req,res) => {


//     let allGroups = await Group.findAll(
        
//     );
//     return res.json(allGroups)
// });


// * Returns group by id
// group.get('/:groupId',async (req,res) => {
//     let groupById = await Membership.findOne({
//         where:{
//             groupId: req.params.groupId,
//         },
//         include:['Group']
//     });
//     return res.json(groupById)
// });

// * Creates new Group
group.post('/', async (req,res) => {
    const {organizerId, name, about,type, private, city, state} = req.body;
    const group = await Group.create({organizerId, name, about,type, private, city, state});
});


// * Adds Img to Group by Id
// * Edits an existing group belonging to currUser
// * Delete an existing group belonging to currUser

module.exports = group;