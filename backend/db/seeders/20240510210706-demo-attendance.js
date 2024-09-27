"use strict";
const { Attendance } = require("../models");

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
    await Attendance.bulkCreate([
      // Anime Discussion Night
      { eventId: 1, userId: 1, status: "attending" },
      { eventId: 1, userId: 2, status: "attending" },
      { eventId: 1, userId: 3, status: "pending" },

      // Fan Art Showcase
      { eventId: 2, userId: 2, status: "attending" },
      { eventId: 2, userId: 4, status: "attending" },
      { eventId: 2, userId: 7, status: "pending" },

      // Cosplay Tips and Tricks
      { eventId: 3, userId: 5, status: "attending" },
      { eventId: 3, userId: 6, status: "attending" },
      { eventId: 3, userId: 9, status: "pending" },

      // Mecha Anime Watch Party
      { eventId: 4, userId: 5, status: "attending" },
      { eventId: 4, userId: 10, status: "attending" },
      { eventId: 4, userId: 12, status: "pending" },

      // Mecha Model Building
      { eventId: 5, userId: 11, status: "attending" },
      { eventId: 5, userId: 13, status: "attending" },
      { eventId: 5, userId: 15, status: "pending" },

      // Virtual Mecha Battle
      { eventId: 6, userId: 14, status: "attending" },
      { eventId: 6, userId: 17, status: "attending" },
      { eventId: 6, userId: 19, status: "pending" },

      // Craft Fair and Exhibition
      { eventId: 7, userId: 20, status: "attending" },
      { eventId: 7, userId: 22, status: "attending" },
      { eventId: 7, userId: 24, status: "pending" },

      // Art Supplies Swap Meet
      { eventId: 8, userId: 21, status: "attending" },
      { eventId: 8, userId: 26, status: "attending" },
      { eventId: 8, userId: 28, status: "pending" },

      // DIY Anime Merchandise Workshop
      { eventId: 9, userId: 30, status: "attending" },
      { eventId: 9, userId: 32, status: "attending" },
      { eventId: 9, userId: 34, status: "pending" },

      // Magical Girl Transformation Class
      { eventId: 10, userId: 36, status: "attending" },
      { eventId: 10, userId: 37, status: "attending" },
      { eventId: 10, userId: 38, status: "pending" },

      // Magical Girl Costume Contest
      { eventId: 11, userId: 39, status: "attending" },
      { eventId: 11, userId: 40, status: "attending" },
      { eventId: 11, userId: 31, status: "pending" },

      // Magical Girl Anime Marathon
      { eventId: 12, userId: 32, status: "attending" },
      { eventId: 12, userId: 3, status: "attending" },
      { eventId: 12, userId: 4, status: "pending" },

      // Shonen Anime Discussion
      { eventId: 13, userId: 11, status: "attending" },
      { eventId: 13, userId: 12, status: "attending" },
      { eventId: 13, userId: 13, status: "pending" },
      { eventId: 13, userId: 14, status: "waitlist" },

      // Shonen Anime Trivia Night
      { eventId: 14, userId: 15, status: "attending" },
      { eventId: 14, userId: 16, status: "attending" },
      { eventId: 14, userId: 17, status: "pending" },
      { eventId: 14, userId: 18, status: "waitlist" },

      // Shonen Character Design Workshop
      { eventId: 15, userId: 19, status: "attending" },
      { eventId: 15, userId: 21, status: "attending" },
      { eventId: 15, userId: 23, status: "pending" },
      { eventId: 15, userId: 25, status: "waitlist" },

      // Slice of Life Anime Watch Party
      { eventId: 16, userId: 20, status: "attending" },
      { eventId: 16, userId: 22, status: "attending" },
      { eventId: 16, userId: 24, status: "pending" },
      { eventId: 16, userId: 26, status: "waitlist" },

      // Slice of Life Discussion
      { eventId: 17, userId: 31, status: "attending" },
      { eventId: 17, userId: 33, status: "attending" },
      { eventId: 17, userId: 35, status: "pending" },
      { eventId: 17, userId: 37, status: "waitlist" },

      // Cozy Cooking Night
      { eventId: 18, userId: 22, status: "attending" },
      { eventId: 18, userId: 14, status: "attending" },
      { eventId: 18, userId: 16, status: "pending" },
      { eventId: 18, userId: 18, status: "waitlist" },
      // Dark Fantasy Anime Watch Party
      { eventId: 19, userId: 13, status: "attending" },
      { eventId: 19, userId: 15, status: "attending" },
      { eventId: 19, userId: 17, status: "pending" },
      { eventId: 19, userId: 19, status: "waitlist" },

      // Horror Manga Reading
      { eventId: 20, userId: 24, status: "attending" },
      { eventId: 20, userId: 26, status: "attending" },
      { eventId: 20, userId: 28, status: "pending" },
      { eventId: 20, userId: 10, status: "waitlist" },

      // Psychological Thriller Discussion
      { eventId: 21, userId: 22, status: "attending" },
      { eventId: 21, userId: 27, status: "attending" },
      { eventId: 21, userId: 29, status: "pending" },
      { eventId: 21, userId: 1, status: "waitlist" },
      // Cosplay Workshop
      { eventId: 22, userId: 7, status: "attending" },
      { eventId: 22, userId: 20, status: "attending" },
      { eventId: 22, userId: 19, status: "pending" },
      
    ], { validate: true });
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    options.tableName = 'Memberships';
    return queryInterface.bulkDelete(options);
  },
};
