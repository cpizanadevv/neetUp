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
      { eventId: 11, userId: 41, status: "pending" },

      // Magical Girl Anime Marathon
      { eventId: 12, userId: 42, status: "attending" },
      { eventId: 12, userId: 43, status: "attending" },
      { eventId: 12, userId: 44, status: "pending" },

      // Shonen Anime Discussion
      { eventId: 13, userId: 43, status: "attending" },
      { eventId: 13, userId: 45, status: "attending" },
      { eventId: 13, userId: 47, status: "pending" },
      { eventId: 13, userId: 49, status: "waitlist" },

      // Shonen Anime Trivia Night
      { eventId: 14, userId: 46, status: "attending" },
      { eventId: 14, userId: 48, status: "attending" },
      { eventId: 14, userId: 50, status: "pending" },
      { eventId: 14, userId: 52, status: "waitlist" },

      // Shonen Character Design Workshop
      { eventId: 15, userId: 49, status: "attending" },
      { eventId: 15, userId: 51, status: "attending" },
      { eventId: 15, userId: 53, status: "pending" },
      { eventId: 15, userId: 55, status: "waitlist" },

      // Slice of Life Anime Watch Party
      { eventId: 16, userId: 50, status: "attending" },
      { eventId: 16, userId: 52, status: "attending" },
      { eventId: 16, userId: 54, status: "pending" },
      { eventId: 16, userId: 56, status: "waitlist" },

      // Slice of Life Discussion
      { eventId: 17, userId: 51, status: "attending" },
      { eventId: 17, userId: 53, status: "attending" },
      { eventId: 17, userId: 55, status: "pending" },
      { eventId: 17, userId: 57, status: "waitlist" },

      // Cozy Cooking Night
      { eventId: 18, userId: 52, status: "attending" },
      { eventId: 18, userId: 54, status: "attending" },
      { eventId: 18, userId: 56, status: "pending" },
      { eventId: 18, userId: 58, status: "waitlist" },
      // Dark Fantasy Anime Watch Party
      { eventId: 19, userId: 53, status: "attending" },
      { eventId: 19, userId: 55, status: "attending" },
      { eventId: 19, userId: 57, status: "pending" },
      { eventId: 19, userId: 59, status: "waitlist" },

      // Horror Manga Reading
      { eventId: 20, userId: 54, status: "attending" },
      { eventId: 20, userId: 56, status: "attending" },
      { eventId: 20, userId: 58, status: "pending" },
      { eventId: 20, userId: 60, status: "waitlist" },

      // Psychological Thriller Discussion
      { eventId: 21, userId: 55, status: "attending" },
      { eventId: 21, userId: 57, status: "attending" },
      { eventId: 21, userId: 59, status: "pending" },
      { eventId: 21, userId: 61, status: "waitlist" },
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
      { eventId: 42, userId: 24, status: "attending" },
      { eventId: 42, userId: 21, status: "waitlist" },
      { eventId: 42, userId: 22, status: "pending" },
      // Anime OVA Marathon
      { eventId: 43, userId: 24, status: "attending" },
      { eventId: 43, userId: 21, status: "waitlist" },
      { eventId: 43, userId: 22, status: "pending" },
      // Ghibli Movie Night: Spirited Away
      { eventId: 44, userId: 25, status: "attending" },
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
      // Sports Anime Trivia Night
      { eventId: 55, userId: 28, status: "attending" },
      { eventId: 55, userId: 31, status: "waitlist" },
      { eventId: 55, userId: 32, status: "pending" },
      // Historical Anime Watch Party
      { eventId: 56, userId: 29, status: "attending" },
      { eventId: 56, userId: 33, status: "waitlist" },
      { eventId: 56, userId: 34, status: "pending" },
      // Historical Anime Discussion
      { eventId: 57, userId: 29, status: "attending" },
      { eventId: 57, userId: 33, status: "waitlist" },
      { eventId: 57, userId: 34, status: "pending" },
      // Historical Anime Film Screening
      { eventId: 58, userId: 29, status: "attending" },
      { eventId: 58, userId: 33, status: "waitlist" },
      { eventId: 58, userId: 34, status: "pending" },
      // Fantasy Anime Discussion
      { eventId: 60, userId: 30, status: "attending" },
      { eventId: 60, userId: 35, status: "waitlist" },
      { eventId: 60, userId: 36, status: "pending" },
      // Fantasy Book Club
      { eventId: 61, userId: 30, status: "attending" },
      { eventId: 61, userId: 35, status: "waitlist" },
      { eventId: 61, userId: 36, status: "pending" },
      // Fantasy Anime Movie Marathon
      { eventId: 62, userId: 30, status: "attending" },
      { eventId: 62, userId: 35, status: "waitlist" },
      { eventId: 62, userId: 36, status: "pending" },
      // Anime Cooking Workshop: Ramen Edition
      { eventId: 63, userId: 31, status: "attending" },
      { eventId: 63, userId: 37, status: "waitlist" },
      { eventId: 63, userId: 38, status: "pending" },
      // Anime Baking Class: Sweets Galore
      { eventId: 64, userId: 31, status: "attending" },
      { eventId: 64, userId: 37, status: "waitlist" },
      { eventId: 64, userId: 38, status: "pending" },
      // Anime Food Potluck
      { eventId: 65, userId: 31, status: "attending" },
      { eventId: 65, userId: 37, status: "waitlist" },
      { eventId: 65, userId: 38, status: "pending" },
      // Manga Reading Session
      { eventId: 66, userId: 32, status: "attending" },
      { eventId: 66, userId: 39, status: "waitlist" },
      { eventId: 66, userId: 40, status: "pending" },
      // Light Novel Discussion
      { eventId: 67, userId: 32, status: "attending" },
      { eventId: 67, userId: 39, status: "waitlist" },
      { eventId: 67, userId: 40, status: "pending" },
      // Anime Book Recommendations
      { eventId: 68, userId: 32, status: "attending" },
      { eventId: 68, userId: 39, status: "waitlist" },
      { eventId: 68, userId: 40, status: "pending" },
      // Ghibli Film Discussion: Princess Mononoke
      { eventId: 69, userId: 33, status: "attending" },
      { eventId: 69, userId: 41, status: "waitlist" },
      { eventId: 69, userId: 42, status: "pending" },
      // Ghibli Movie Marathon
      { eventId: 70, userId: 33, status: "attending" },
      { eventId: 70, userId: 41, status: "waitlist" },
      { eventId: 70, userId: 42, status: "pending" },
      // Miyazaki Tribute Art Exhibition
      { eventId: 71, userId: 33, status: "attending" },
      { eventId: 71, userId: 41, status: "waitlist" },
      { eventId: 71, userId: 42, status: "pending" },
    ]);
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
