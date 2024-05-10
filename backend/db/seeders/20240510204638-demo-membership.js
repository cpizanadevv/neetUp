'use strict';
const { Membership } = require('../models')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
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
    {
      userId: 4,
      groupId: 3,
      status: 'co-host'
    },
    {
      userId: 5,
      groupId: 3,
      status: 'member'
    },
    {
      userId: 6,
      groupId: 3,
      status: 'pending'
    },
    {
      userId: 7,
      groupId: 7,
      status: 'co-host'
    },
    {
      userId: 8,
      groupId: 7,
      status: 'member'
    },
    {
      userId: 9,
      groupId: 7,
      status: 'pending'
    },
    {
      userId: 10,
      groupId: 1,
      status: 'co-host'
    },
    {
      userId: 11,
      groupId: 1,
      status: 'member'
    },
    {
      userId: 12,
      groupId: 1,
      status: 'pending'
    },
    {
      userId: 13,
      groupId: 4,
      status: 'co-host'
    },
    {
      userId: 14,
      groupId: 4,
      status: 'member'
    },
    {
      userId: 15,
      groupId: 4,
      status: 'pending'
    },
    {
      userId: 16,
      groupId: 5,
      status: 'co-host'
    },
    {
      userId: 17,
      groupId: 5,
      status: 'member'
    },
    {
      userId: 18,
      groupId: 5,
      status: 'pending'
    },
    {
      userId: 19,
      groupId: 8,
      status: 'co-host'
    },
    {
      userId: 20,
      groupId: 8,
      status: 'member'
    },
    {
      userId: 21,
      groupId: 8,
      status: 'pending'
    },
    {
      userId: 22,
      groupId: 6,
      status: 'co-host'
    },
    {
      userId: 23,
      groupId: 6,
      status: 'member'
    },
    {
      userId: 24,
      groupId: 6,
      status: 'pending'
    },
   ])
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Memberships')
  }
};
