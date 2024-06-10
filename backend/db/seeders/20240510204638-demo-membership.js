"use strict";
const { Membership } = require("../models");

/** @type {import('sequelize-cli').Migration} */
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
    await Membership.bulkCreate([
      // Memberships for "Otaku Haven"
      { userId: 1, groupId: 1, status: "member" },
      { userId: 2, groupId: 1, status: "co-host" },
      { userId: 3, groupId: 1, status: "pending" },

      // Memberships for "Mecha Madness"
      { userId: 5, groupId: 2, status: "co-host" },
      { userId: 4, groupId: 2, status: "member" },
      { userId: 6, groupId: 2, status: "pending" },

      // Memberships for "FanArts and Crafts"
      { userId: 2, groupId: 3, status: "co-host" },
      { userId: 8, groupId: 3, status: "member" },
      { userId: 7, groupId: 3, status: "pending" },

      // Memberships for "Magical Girls United"
      { userId: 9, groupId: 4, status: "co-host" },
      { userId: 10, groupId: 4, status: "member" },
      { userId: 11, groupId: 4, status: "pending" },

      // Memberships for "Shonen Showdown"
      { userId: 16, groupId: 5, status: "co-host" },
      { userId: 13, groupId: 5, status: "member" },
      { userId: 14, groupId: 5, status: "pending" },

      // Memberships for "Slice of Life Society"
      { userId: 4, groupId: 6, status: "co-host" },
      { userId: 12, groupId: 6, status: "member" },
      { userId: 15, groupId: 6, status: "pending" },

      // Memberships for "Dark Fantasy League"
      { userId: 6, groupId: 7, status: "co-host" },
      { userId: 17, groupId: 7, status: "member" },
      { userId: 18, groupId: 7, status: "pending" },

      // Memberships for "Cosplay Collective"
      { userId: 7, groupId: 8, status: "co-host" },
      { userId: 20, groupId: 8, status: "member" },
      { userId: 19, groupId: 8, status: "pending" },

      // Memberships for "Anime Marathon"
      { userId: 24, groupId: 9, status: "co-host" },
      { userId: 21, groupId: 9, status: "member" },
      { userId: 22, groupId: 9, status: "pending" },

      // Memberships for "Ghibli Fan Club"
      { userId: 25, groupId: 10, status: "co-host" },
      { userId: 23, groupId: 10, status: "member" },
      { userId: 26, groupId: 10, status: "pending" },

      // Memberships for "Anime Fitness Squad"
      { userId: 26, groupId: 11, status: "co-host" },
      { userId: 27, groupId: 11, status: "member" },
      { userId: 28, groupId: 11, status: "pending" },

      // Memberships for "Seinen Society"
      { userId: 27, groupId: 12, status: "co-host" },
      { userId: 29, groupId: 12, status: "member" },
      { userId: 30, groupId: 12, status: "pending" },

      // Memberships for "Sports Anime Enthusiasts"
      { userId: 28, groupId: 13, status: "co-host" },
      { userId: 31, groupId: 13, status: "member" },
      { userId: 32, groupId: 13, status: "pending" },

      // Memberships for "Historical Anime Group"
      { userId: 29, groupId: 14, status: "co-host" },
      { userId: 33, groupId: 14, status: "member" },
      { userId: 34, groupId: 14, status: "pending" },

      // Memberships for "Fantasy Worlds Club"
      { userId: 30, groupId: 15, status: "co-host" },
      { userId: 35, groupId: 15, status: "member" },
      { userId: 36, groupId: 15, status: "pending" },

      // Memberships for "Anime Cooking Club"
      { userId: 31, groupId: 16, status: "co-host" },
      { userId: 37, groupId: 16, status: "member" },
      { userId: 38, groupId: 16, status: "pending" },

      // Memberships for "Anime Book Club"
      { userId: 32, groupId: 17, status: "co-host" },
      { userId: 39, groupId: 17, status: "member" },
      { userId: 40, groupId: 17, status: "pending" },

      // Memberships for "Miyazaki Appreciation Society"
      { userId: 33, groupId: 18, status: "co-host" },
      { userId: 41, groupId: 18, status: "member" },
      { userId: 42, groupId: 18, status: "pending" }
    ]);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    options.tableName = 'Membership';
    return queryInterface.bulkDelete(options);
  },
};
