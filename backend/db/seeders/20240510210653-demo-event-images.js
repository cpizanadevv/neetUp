"use strict";
const { EventImage } = require("../models");
import '../../../images/eventImages'
import '../../../images/groupImages'

/** @type {import('sequelize-cli').Migration} */
let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    await EventImage.bulkCreate([
      // Anime Discussion Night
      {
        eventId: 1,
        url: "../images/groupImages/animeMarathon2.jpg",
        preview: true,
      },
      {
        eventId: 1,
        url: "../images/groupImages/animeMarathon2.jpg",
        preview: false,
      },
      // Fan Art Showcase
      {
        eventId: 2,
        url: "../images/groupImages/fanArtsAndCrafts.png",
        preview: true,
      },
      {
        eventId: 2,
        url: "../images/groupImages/Cosplay.jpg",
        preview: false,
      },
      // Cosplay Tips and Tricks
      {
        eventId: 3,
        url: "../images/groupImages/Cosplay.jpg",
        preview: true,
      },
      {
        eventId: 3,
        url: "../images/groupImages/cosplayCol.jpg",
        preview: false,
      },
      // Mecha Anime Watch Party
      {
        eventId: 4,
        url: "../images/eventImages/mechEvent.jpg",
        preview: true,
      },
      {
        eventId: 4,
        url: "../images/eventImages/mechEvent2.jpg",
        preview: false,
      },
      // Mecha Model Building
      {
        eventId: 5,
        url: "../images/groupImages/mecha.png",
        preview: true,
      },
      {
        eventId: 5,
        url: "../images/eventImages/mechEvent3.jpg",
        preview: false,
      },
      // Virtual Mecha Battle
      {
        eventId: 6,
        url: "../images/groupImages/mecha.png",
        preview: true,
      },
      {
        eventId: 6,
        url: "../images/eventImages/mechEvent3.jpg",
        preview: false,
      },
      // Craft Fair and Exhibition
      {
        eventId: 7,
        url: "../images/groupImages/fanArtsAndCrafts.png",
        preview: true,
      },
      {
        eventId: 7,
        url: "../images/groupImages/fanArtsAndCrafts.png",
        preview: false,
      },
      // Art Supplies Swap Meet
      {
        eventId: 8,
        url: "../images/groupImages/fanArtsAndCrafts.png",
        preview: true,
      },
      {
        eventId: 8,
        url: "../images/groupImages/fanArtsAndCrafts.png",
        preview: false,
      },
      // DIY Anime Merchandise Workshop
      {
        eventId: 9,
        url: "../images/groupImages/aniCooking.jpg",
        preview: true,
      },
      {
        eventId: 9,
        url: "../images/groupImages/aniCooking2.jpg",
        preview: false,
      },
      // Magical Girl Transformation Class
      {
        eventId: 10,
        url: "../images/groupImages/magicalGirl.png",
        preview: true,
      },
      {
        eventId: 10,
        url: "../images/groupImages/magicalGirl.png",
        preview: false,
      },
      // Magical Girl Costume Contest
      
    ], { validate: true });
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    options.tableName = 'EventImages';
    return queryInterface.bulkDelete(options);
  },
};
