const express = require("express");
const { Op, Sequelize } = require("sequelize");
const {
    Group,
    Attendance,
    Membership,
    Venue,
    EventImage,
    Event,
    GroupImage
} = require("../../db/models");
const { check } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");
const { requireAuth } = require("../../utils/auth");

const eventImages = express.Router();

// * Delete an existing image for an Event
eventImages.delete('/:imageId',requireAuth, async (req,res) => {
    const {user} = req;
    
    const imgId = req.params.imageId;
    const img = await EventImage.findByPk(imgId);
    if(!img){
        return res.status(404).json({message:"Event Image couldn't be found"})
    }
    const userId = user.id;

    const eventId = img.eventId;
    const event = await Event.findByPk(eventId);
    const groupId = event.groupId;
    const membership = await Membership.findOne({where:{userId:userId,groupId:groupId}});
    


    if(membership && membership.status === 'co-host'){
        img.destroy();
        return res.json({message:"Successfully deleted"})
    }else{
        return res.status(403).json({ message: "Forbidden" });

    }
})


module.exports = eventImages;