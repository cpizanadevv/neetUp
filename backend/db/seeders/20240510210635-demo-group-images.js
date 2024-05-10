'use strict';
const { GroupImage } = require('../models')

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
    await GroupImage.bulkCreate([
      
  {
    groupId: 1,
    url: 'https://www.otaku-haven.com',
    preview: true
  },
  {
    groupId: 2,
    url: 'https://www.mecha-madness.com',
    preview: false
  },
  {
    groupId: 3,
    url: 'https://www.fanartsandcrafts.com',
    preview: true
  },
  {
    groupId: 4,
    url: 'https://www.magicalgirlsunited.com',
    preview: false
  },
  {
    groupId: 5,
    url: 'https://www.shonenshowdown.com',
    preview: true
  },
  {
    groupId: 6,
    url: 'https://www.sliceoflifesociety.com',
    preview: false
  },
  {
    groupId: 7,
    url: 'https://www.darkfantasyleague.com',
    preview: true
  },
  {
    groupId: 8,
    url: 'https://www.cosplaycollective.com',
    preview: false
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
    await queryInterface.bulkDelete('GroupImages')
  }
};
