const express = require("express");
const { Op, Sequelize } = require("sequelize");
const {
  Group,
  User,
  Membership,
  Venue,
  GroupImage,
} = require("../../db/models");
const { check } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");


const venue = express.Router();


venue.get('/:venueId')













module.exports = venue;