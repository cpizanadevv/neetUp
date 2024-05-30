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

const groupImages = express.Router();

// * Delete an existing image for a Group
groupImages.delete('/:imageId', async (req,res) => {
    const {user} = req;
    const imgId = req.params.imageId;
    const img = await GroupImage.findByPk(imgId);
    if(!img){
        return res.status(404).json({message:"Group Image couldn't be found"})
    }

    const groupId = img.groupId;
    const membership = await Membership.findOne({where:{userId:user.id,groupId:groupId}});
    if(!membership){
        return res.status(404).json({message:"Membership not found"})
    }
    const status = membership.status;
    if(status === 'co-host'){
        img.destroy();
        return res.json({message:"Successfully deleted"})
    }else{
        return res.status(400).json({message:"User is not co-host of this group"})
    }
})


module.exports = groupImages;