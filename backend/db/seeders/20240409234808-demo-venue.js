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
    },
    {
      groupId: 11,
      address: '401 Fitness Ave',
      city: 'New York',
      state: 'NY',
      lat: 40.712776,
      lng: -74.005974,
    },
    {
      groupId: 11,
      address: '402 Yoga St',
      city: 'New York',
      state: 'NY',
      lat: 40.712776,
      lng: -74.005974,
    },
    {
      groupId: 11,
      address: '403 Cosplay Blvd',
      city: 'New York',
      state: 'NY',
      lat: 40.712776,
      lng: -74.005974,
    },
    {
      groupId: 13,
      address: '501 Anime Ave',
      city: 'Los Angeles',
      state: 'CA',
      lat: 34.052235,
      lng: -118.243683,
    },
    {
      groupId: 13,
      address: '502 Otaku St',
      city: 'Los Angeles',
      state: 'CA',
      lat: 34.052235,
      lng: -118.243683,
    },
    {
      groupId: 13,
      address: '503 Manga Blvd',
      city: 'Los Angeles',
      state: 'CA',
      lat: 34.052235,
      lng: -118.243683,
    },
    {
      groupId: 16,
      address: '800 Anime Ave',
      city: 'Tokyo',
      state: 'Tokyo',
      lat: 35.6895,
      lng: 139.6917,
    },
    {
      groupId: 16,
      address: '801 Manga St',
      city: 'Tokyo',
      state: 'Tokyo',
      lat: 35.6895,
      lng: 139.6917,
    },
    {
      groupId: 16,
      address: '802 Ramen Blvd',
      city: 'Tokyo',
      state: 'Tokyo',
      lat: 35.6895,
      lng: 139.6917,
    },
    {
      groupId: 18,
      address: '123 Ghibli Avenue',
      city: 'Tokyo',
      state: 'Tokyo',
      lat: 35.6895,
      lng: 139.6917,
    },
    {
      groupId: 18,
      address: '124 Ghibli Street',
      city: 'Tokyo',
      state: 'Tokyo',
      lat: 35.6895,
      lng: 139.6917,
    },
    {
      groupId: 18,
      address: '125 Miyazaki Lane',
      city: 'Tokyo',
      state: 'Tokyo',
      lat: 35.6895,
      lng: 139.6917,
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
