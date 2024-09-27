'use strict';

const { Venue } = require('../models');

/** @type {import('sequelize-cli').Migration} */

let options = {};

if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}
module.exports = {
  async up (queryInterface, Sequelize) {
   await Venue.bulkCreate([
    {
      groupId: 3,
      address: '123 Art St',
      city: 'New York',
      state: 'NY',
      lat: 40.73061,
      lng: -73.935242,
    },
    {
      groupId: 3,
      address: '456 Craft Ave',
      city: 'San Francisco',
      state: 'CA',
      lat: 37.774929,
      lng: -122.419416,
    },
    {
      groupId: 3,
      address: '789 Anime Blvd',
      city: 'Los Angeles',
      state: 'CA',
      lat: 34.052235,
      lng: -118.243683,
    },
    {
      groupId: 4,
      address: '123 Magic Lane',
      city: 'Orlando',
      state: 'FL',
      lat: 28.538336,
      lng: -81.379234,
    },
    {
      groupId: 4,
      address: '456 Enchanted Blvd',
      city: 'Orlando',
      state: 'FL',
      lat: 28.538336,
      lng: -81.379234,
    },
    {
      groupId: 4,
      address: '789 Fairy Ave',
      city: 'Orlando',
      state: 'FL',
      lat: 28.538336,
      lng: -81.379234,
    },
    {
      groupId: 8,
      address: '101 Anime Blvd',
      city: 'Los Angeles',
      state: 'CA',
      lat: 34.052235,
      lng: -118.243683,
    },
    {
      groupId: 8,
      address: '202 Manga St',
      city: 'Los Angeles',
      state: 'CA',
      lat: 34.052235,
      lng: -118.243683,
    },
    {
      groupId: 8,
      address: '303 Otaku Way',
      city: 'Los Angeles',
      state: 'CA',
      lat: 34.052235,
      lng: -118.243683,
    }
   ], {validate: true})
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    
    options.tableName = 'Venues';
    return queryInterface.bulkDelete(options);
  }
};
