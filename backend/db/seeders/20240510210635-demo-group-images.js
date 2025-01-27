"use strict";
const { GroupImage } = require("../models");
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
    await GroupImage.bulkCreate([
      // Otaku Haven
      {
        groupId: 1,
        url: "../images/groupImages/otakuHaven.png",
        preview: true,
      },
      {
        groupId: 1,
        url: "../images/groupImages/otakuHaven.png",
        preview: false,
      },

      // Mecha Madness
      {
        groupId: 2,
        url: "../images/groupImages/mecha.png",
        preview: true,
      },
      {
        groupId: 2,
        url: "../images/groupImages/mecha.png",
        preview: false,
      },

      // FanArts and Crafts
      {
        groupId: 3,
        url: "../images/groupImages/fanArtsAndCrafts.png",
        preview: true,
      },
      {
        groupId: 3,
        url: "../images/groupImages/fanArtsAndCrafts.png",
        preview: false,
      },
      // Magical Girls United
      {
        groupId: 4,
        url: "../images/groupImages/magicalGirl.png",
        preview: true,
      },
      {
        groupId: 4,
        url: "../images/groupImages/magicalGirl.png",
        preview: false,
      },

      // Shonen Showdown
      {
        groupId: 5,
        url: "../images/groupImages/shonen.jpg",
        preview: true,
      },
      {
        groupId: 5,
        url: "../images/groupImages/shonen.jpg",
        preview: false,
      },

      // Slice of Life Society
      {
        groupId: 6,
        url: "../images/groupImages/sliceOfLife.jpg",
        preview: true,
      },
      {
        groupId: 6,
        url: "../images/groupImages/sliceOfLife.jpg",
        preview: false,
      },

      // Dark Fantasy League
      {
        groupId: 7,
        url: "../images/groupImages/darkFantasy.jpg",
        preview: true,
      },
      {
        groupId: 7,
        url: "../images/groupImages/darkFantasy.jpg",
        preview: false,
      },

      // Cosplay Collective
      {
        groupId: 8,
        url: "../images/groupImages/cosplayCol.jpg",
        preview: true,
      },
      {
        groupId: 8,
        url: "../images/groupImages/cosplayCol.jpg",
        preview: false,
      },
      // Anime Marathon
      {
        groupId: 9,
        url: "../images/groupImages/animeMarathon.jpg",
        preview: true,
      },
      {
        groupId: 9,
        url: "../images/groupImages/animeMarathon2.jpg",
        preview: false,
      },

      // Ghibli Fan Club
      {
        groupId: 10,
        url: "../images/groupImages/ghibliFanClub.jpg",
        preview: true,
      },
      {
        groupId: 10,
        url: "../images/groupImages/ghibliFanClub2.jpg",
        preview: false,
      },
    ], { validate: true });
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    options.tableName = 'GroupImages';
    return queryInterface.bulkDelete(options);
  },
};
