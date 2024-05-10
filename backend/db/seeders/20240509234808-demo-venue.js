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
      groupId:3,
      address: "123 Konoha Street",
      city: "Los Angeles",
      state: "CA",
      lat: 35.6895,
      lng: 139.6917
    },
    {
      groupId:7,
      address: "456 Soul Society Avenue",
      city: "Seattle",
      state: "WA",
      lat: 35.6895,
      lng: 139.6917
    },
    {
      groupId:1,
      address: "321 Hueco Mundo Highway",
      city: "San Francisco",
      state: "CA",
      lat: 35.6895,
      lng: 139.6917
    },
    {
      groupId:4,
      address: "987 Marineford Road",
      city: "New York",
      state: "NY",
      lat: 35.6895,
      lng: 139.6917
    },
    {
      groupId:6,
      address: "654 Hargeon Port",
      city: "Chicago",
      state: "IL",
      lat: 35.6895,
      lng: 139.6917
    },
    {
      groupId:4,
      address: "147 Amegakure Alley",
      city: "Miami",
      state: "FL",
      lat: 35.6895,
      lng: 139.6917
    },
    {
      groupId:1,
      address: "258 Karakura Town Road",
      city: "Dallas",
      state: "TX",
      lat: 35.6895,
      lng: 139.6917
    },
    {
      groupId:8,
      address: "369 Grand Magic Games Arena",
      city: "Washington",
      state: "DC",
      lat: 35.6895,
      lng: 139.6917
    },
    {
      groupId:1,
      address: "741 Loguetown Street",
      city:'Los Angeles',
      state:'CA',
      lat: 35.6895,
      lng: 139.6917
    },
    {
      groupId:4,
      address: "852 Clock Tower Plaza",
      city: "San Jose",
      state: "CA",
      lat: 35.6895,
      lng: 139.6917
    },
    {
      groupId:8,
      address: "963 Aincrad Avenue",
      city: "Boston",
      state: "MA",
      lat: 35.6895,
      lng: 139.6917
    },
    {
      groupId:3,
      address: "159 Neo-Tokyo Expressway",
      city:'New York',
      state:'NY',
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
    
    await queryInterface.bulkDelete('Venues')
  }
};
