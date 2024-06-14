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
      // Cosplay Photoshoot
      { eventId: 39, userId: 7, status: "attending" },
      { eventId: 39, userId: 20, status: "attending" },
      { eventId: 39, userId: 19, status: "pending" },
      // Convention Prep Session
      { eventId: 40, userId: 7, status: "attending" },
      { eventId: 40, userId: 20, status: "waitlist" },
      { eventId: 40, userId: 19, status: "pending" },
      // Shonen Anime Marathon
      { eventId: 41, userId: 24, status: "attending" },
      { eventId: 41, userId: 21, status: "waitlist" },
      { eventId: 41, userId: 22, status: "pending" },
      // Shojo Anime Marathon
      { eventId: 42, userId: 14, status: "attending" },
      { eventId: 42, userId: 21, status: "waitlist" },
      { eventId: 42, userId: 22, status: "pending" },
      // Anime OVA Marathon
      { eventId: 43, userId: 24, status: "attending" },
      { eventId: 43, userId: 21, status: "waitlist" },
      { eventId: 43, userId: 22, status: "pending" },
      // Ghibli Movie Night: Spirited Away
      { eventId: 44, userId: 22, status: "attending" },
      { eventId: 44, userId: 23, status: "waitlist" },
      { eventId: 44, userId: 26, status: "pending" },
      // Ghibli Art Workshop
      { eventId: 45, userId: 25, status: "attending" },
      { eventId: 45, userId: 23, status: "waitlist" },
      { eventId: 45, userId: 26, status: "pending" },
      // Ghibli Cosplay Contest
      { eventId: 46, userId: 25, status: "attending" },
      { eventId: 46, userId: 23, status: "waitlist" },
      { eventId: 46, userId: 26, status: "pending" },
      // Anime Workout Session
      { eventId: 47, userId: 26, status: "attending" },
      { eventId: 47, userId: 27, status: "waitlist" },
      { eventId: 47, userId: 28, status: "pending" },
      // Yoga with Anime Music
      { eventId: 48, userId: 27, status: "attending" },
      { eventId: 48, userId: 29, status: "waitlist" },
      { eventId: 48, userId: 30, status: "pending" },
      // Cosplay Run
      { eventId: 49, userId: 28, status: "attending" },
      { eventId: 49, userId: 31, status: "waitlist" },
      { eventId: 49, userId: 32, status: "pending" },
      // Seinen Anime Discussion
      { eventId: 50, userId: 27, status: "attending" },
      { eventId: 50, userId: 29, status: "waitlist" },
      { eventId: 50, userId: 30, status: "pending" },
      // Seinen Manga Reading Group
      { eventId: 51, userId: 27, status: "attending" },
      { eventId: 51, userId: 29, status: "waitlist" },
      { eventId: 51, userId: 30, status: "pending" },
      // Seinen Anime Watch Party
      { eventId: 52, userId: 27, status: "attending" },
      { eventId: 52, userId: 29, status: "waitlist" },
      { eventId: 52, userId: 30, status: "pending" },
      // Sports Anime Watch Party
      { eventId: 53, userId: 28, status: "attending" },
      { eventId: 53, userId: 31, status: "waitlist" },
      { eventId: 53, userId: 32, status: "pending" },
      // Friendly Sports Competition
      { eventId: 54, userId: 28, status: "attending" },
      { eventId: 54, userId: 31, status: "waitlist" },
      { eventId: 54, userId: 32, status: "pending" },
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
