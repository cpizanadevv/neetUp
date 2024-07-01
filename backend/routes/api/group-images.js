const express = require("express");
const { Op, Sequelize } = require("sequelize");
const {
    Group,
    Membership,
    Event,
    GroupImage
} = require("../../db/models");
const { check } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");
const { requireAuth } = require("../../utils/auth");

const groupImages = express.Router();

// * Delete an existing image for a Group
groupImages.delete('/:imageId',requireAuth, async (req,res) => {
    const {user} = req;
    
    const imgId = req.params.imageId;
    const img = await GroupImage.findByPk(imgId);
    if(!img){
        return res.status(404).json({message:"Group Image couldn't be found"})
    }
    const userId = user.id;

    const groupId = img.groupId;
    const membership = await Membership.findOne({where:{userId:userId,groupId:groupId}});
    if(membership && membership.status === 'co-host'){
        img.destroy();
        return res.json({message:"Successfully deleted"})
    }else{
        return res.status(403).json({ message: "Forbidden" });

    }
})


module.exports = groupImages;