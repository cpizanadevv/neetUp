'use strict';

const {Venue} = require('../models');

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
   await Venue.bulkCreate([
    {
      groupId:,
      address,
      city:,
      state:,
      lat:,
      lng:,
    },
    {
      address: "123 Konoha Street",
      city: "Konoha",
      state: "Fire Country",
      lat: 35.6895,
      lng: 139.6917
    },
    {
      address: "456 Soul Society Avenue",
      city: "Soul Society",
      state: "Seireitei",
      lat: 35.6895,
      lng: 139.6917
    },
    {
      address: "789 Hidden Leaf Lane",
      city: "Hidden Leaf Village",
      state: "Fire Country",
      lat: 35.6895,
      lng: 139.6917
    },
    {
      address: "321 Hueco Mundo Highway",
      city: "Hueco Mundo",
      state: "Desert of the Hollows",
      lat: 35.6895,
      lng: 139.6917
    },
    {
      address: "987 Marineford Road",
      city: "Marineford",
      state: "Grand Line",
      lat: 35.6895,
      lng: 139.6917
    },
    {
      address: "654 Hargeon Port",
      city: "Hargeon",
      state: "Fiore",
      lat: 35.6895,
      lng: 139.6917
    },
    {
      address: "147 Amegakure Alley",
      city: "Amegakure",
      state: "Rain Country",
      lat: 35.6895,
      lng: 139.6917
    },
    {
      address: "258 Karakura Town Road",
      city: "Karakura Town",
      state: "Human World",
      lat: 35.6895,
      lng: 139.6917
    },
    {
      address: "369 Grand Magic Games Arena",
      city: "Crocus",
      state: "Fiore",
      lat: 35.6895,
      lng: 139.6917
    },
    {
      address: "741 Loguetown Street",
      city: "Loguetown",
      state: "East Blue",
      lat: 35.6895,
      lng: 139.6917
    },
    {
      address: "852 Clock Tower Plaza",
      city: "Clock Tower",
      state: "Mage Association",
      lat: 35.6895,
      lng: 139.6917
    },
    {
      address: "963 Aincrad Avenue",
      city: "Aincrad",
      state: "Floor 100",
      lat: 35.6895,
      lng: 139.6917
    },
    {
      address: "159 Neo-Tokyo Expressway",
      city: "Neo-Tokyo",
      state: "Japan",
      lat: 35.6895,
      lng: 139.6917
    },
    {
      address: "753 Death City Boulevard",
      city: "Death City",
      state: "Nevada",
      lat: 35.6895,
      lng: 139.6917
    },
    {
      address: "852 Central Perk",
      city: "New York City",
      state: "New York",
      lat: 35.6895,
      lng: 139.6917
    }
   ])
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
