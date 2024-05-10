'use strict';
const { Attendance } = require('../models')

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
    await Attendance.bulkCreate([
      {
        userId: 4,
        eventId: 1,
        status: 'attending'
      },
      {
        userId: 5,
        eventId: 1,
        status: 'waitlist'
      },
      {
        userId: 6,
        eventId: 2,
        status: 'attending'
      },
      {
        userId: 7,
        eventId: 2,
        status: 'waitlist'
      },
      {
        userId: 8,
        eventId: 3,
        status: 'attending'
      },
      {
        userId: 9,
        eventId: 3,
        status: 'waitlist'
      },
      {
        userId: 10,
        eventId: 4,
        status: 'attending'
      },
      {
        userId: 11,
        eventId: 4,
        status: 'waitlist'
      },
      {
        userId: 12,
        eventId: 5,
        status: 'attending'
      },
      {
        userId: 13,
        eventId: 5,
        status: 'waitlist'
      },
      {
        userId: 14,
        eventId: 6,
        status: 'attending'
      },
      {
        userId: 15,
        eventId: 6,
        status: 'waitlist'
      },
      {
        userId: 16,
        eventId: 7,
        status: 'attending'
      },
      {
        userId: 17,
        eventId: 7,
        status: 'waitlist'
      },
      {
        userId: 18,
        eventId: 8,
        status: 'attending'
      },
      {
        userId: 19,
        eventId: 8,
        status: 'waitlist'
      },
      {
        userId: 20,
        eventId: 9,
        status: 'attending'
      },
      {
        userId: 21,
        eventId: 9,
        status: 'waitlist'
      },
      {
        userId: 22,
        eventId: 10,
        status: 'attending'
      },
      {
        userId: 23,
        eventId: 10,
        status: 'waitlist'
      },
      {
        userId: 24,
        eventId: 11,
        status: 'attending'
      },
      {
        userId: 25,
        eventId: 11,
        status: 'waitlist'
      },
      {
        userId: 26,
        eventId: 12,
        status: 'attending'
      },
      {
        userId: 27,
        eventId: 12,
        status: 'waitlist'
      },
      // Additional seeders based on Membership
      {
        userId: 4,
        eventId: 13,
        status: 'attending'
      },
      {
        userId: 5,
        eventId: 13,
        status: 'waitlist'
      },
      {
        userId: 6,
        eventId: 14,
        status: 'attending'
      },
      {
        userId: 7,
        eventId: 14,
        status: 'waitlist'
      },
      {
        userId: 8,
        eventId: 15,
        status: 'attending'
      },
      {
        userId: 9,
        eventId: 15,
        status: 'waitlist'
      },
      {
        userId: 10,
        eventId: 16,
        status: 'attending'
      },
      {
        userId: 11,
        eventId: 16,
        status: 'waitlist'
      },
      {
        userId: 12,
        eventId: 17,
        status: 'attending'
      },
      {
        userId: 13,
        eventId: 17,
        status: 'waitlist'
      },
      {
        userId: 14,
        eventId: 18,
        status: 'attending'
      },
      {
        userId: 15,
        eventId: 18,
        status: 'waitlist'
      },
      {
        userId: 16,
        eventId: 19,
        status: 'attending'
      },
      {
        userId: 17,
        eventId: 19,
        status: 'waitlist'
      },
      {
        userId: 18,
        eventId: 20,
        status: 'attending'
      },
      {
        userId: 19,
        eventId: 20,
        status: 'waitlist'
      },
      {
        userId: 20,
        eventId: 21,
        status: 'attending'
      },
      {
        userId: 21,
        eventId: 21,
        status: 'waitlist'
      },
      {
        userId: 22,
        eventId: 22,
        status: 'attending'
      },
      {
        userId: 23,
        eventId: 22,
        status: 'waitlist'
      },
      {
        userId: 24,
        eventId: 23,
        status: 'attending'
      },
      {
        userId: 25,
        eventId: 23,
        status: 'waitlist'
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
