const express = require("express");
const { Op, Sequelize } = require("sequelize");
const {
    Group,
    Attendance,
    Membership,
    Venue,
    EventImage,
    Event
} = require("../../db/models");
const { check } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");

const event = express.Router();

event.get('/', async (req, res) => {
    const allEvents = await Event.findAll({
        attributes: {
            include: [
              "id",
              "updatedAt",
              "createdAt",
              [Sequelize.fn("COUNT", Sequelize.col("Attendances.id")), "numAttending"],
              [Sequelize.col("EventImages.url"), "previewImage"],
            ],
          },
          include: [
            {
              model: Attendance,
              attributes: []
            },
            {
              model: EventImage,
              attributes: []
            },
            {
              model: Group,
              attributes: ["id", "name", "city", "state"]
            },
            {
              model: Venue,
              attributes: ["id", "city", "state"]
            },
          ],
          group: ["Event.id", "EventImages.id", "Group.id", "Venue.id"]
      });
      return res.json(allEvents);
})

module.exports = event;