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

// ! Edit Venue
venue.put('/:venueId', async (req, res) => {
  const { user } = req;
  const userId = user.id;
  const venueId = req.params.venueId;
  const {address,city,state,lat,lng} = req.body;
  const venueExists = await Venue.findByPk(venueId);
  const member = await Membership.findOne({where:userId});
  const status = member.status;
  const groupId = venueExists.groupId;

  if(!user){
    return res.json({ message: "No user is currently logged in." });
  }
  if(!venueExists){
    return res.json({ message: "Venue couldn't be found" });

  }

  if(venueExists && status === 'co-host'){
    const venue = await Venue.create({
      userId,
      groupId,
      address,
      city,
      state,
      lat,
      lng,
    });
    const newVenue = {
      groupId: groupId,
      address: venue.address,
      city: venue.city,
      state: venue.state,
      lat: venue.lat,
      lng: venue.lng,
    };
    return res.json({ venue: newVenue });
  }else {
    return res.status(404).json({ message: "User is not co-host of this group" });
  }

})













module.exports = venue;