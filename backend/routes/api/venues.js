const express = require("express");
const { Op, Sequelize } = require("sequelize");
const {
  Membership,
  Venue,
} = require("../../db/models");
const { check } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");


const venue = express.Router();

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

// * Edit Venue
venue.put('/:venueId',validateVenue, async (req, res) => {
  const { user } = req;
  const userId = user.id;
  if(!user){
    return res.status(401).json({ message: "Authentication required" });

  }

  const venueId = req.params.venueId;
  const {address,city,state,lat,lng} = req.body;
  const venue = await Venue.findByPk(venueId);
  if(!venue){
    return res.status(404).json({ message: "Venue couldn't be found" });
  }

  const groupId = venue.groupId;
  const membership = await Membership.findOne({where:{userId:userId, groupId:groupId}});
  if(!membership){
    return res.status(403).json({ message: "Forbidden" });

  }
  const status = membership.status;

  if(!address) address = venue.address;
  if(!city) city = venue.city;
  if(!state) state = venue.state;
  if(!lat) lat = venue.lat;
  if(!lng) lng = venue.lng;

  if(status === 'co-host'){
    const updatedVenue = await venue.update({
      address:address,
      city:city,
      state:state,
      lat:lat,
      lng:lng
    })
    const newVenue = {
      id: +venueId,
      groupId: groupId,
      address: updatedVenue.address,
      city: updatedVenue.city,
      state: updatedVenue.state,
      lat: updatedVenue.lat,
      lng: updatedVenue.lng,
    };

    return res.json({ event: newVenue });

  }else {
    return res.status(403).json({ message: "Forbidden" });
  }

})













module.exports = venue;