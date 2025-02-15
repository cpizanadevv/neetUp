"use strict";
const { Membership } = require("../models");

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
