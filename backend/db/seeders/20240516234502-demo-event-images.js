'use strict';
const { EventImage } = require('../models')

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
   await EventImage.bulkCreate([
    {
      eventId: 1,
      url: 'https://www.anime-picnic.com',
      preview: true
    },
    {
      eventId: 2,
      url: 'https://www.manga-book-club.com',
      preview: false
    },
    {
      eventId: 3,
      url: 'https://www.anime-karaoke-night.com',
      preview: true
    },
    {
      eventId: 4,
      url: 'https://www.cosplay-parade.com',
      preview: false
    },
    {
      eventId: 5,
      url: 'https://www.anime-movie-marathon.com',
      preview: true
    },
    {
      eventId: 6,
      url: 'https://www.anime-gaming-tournament.com',
      preview: false
    },
    {
      eventId: 7,
      url: 'https://www.anime-art-exhibit.com',
      preview: true
    },
    {
      eventId: 8,
      url: 'https://www.anime-trivia-night.com',
      preview: false
    },
    {
      eventId: 9,
      url: 'https://www.anime-dance-party.com',
      preview: true
    },
    {
      eventId: 10,
      url: 'https://www.anime-figure-swap-meet.com',
      preview: false
    },
    {
      eventId: 11,
      url: 'https://www.anime-cosplay-picnic.com',
      preview: true
    },
    {
      eventId: 12,
      url: 'https://www.virtual-anime-watch-party.com',
      preview: false
    },
    {
      eventId: 13,
      url: 'https://www.anime-book-signing.com',
      preview: true
    },
    {
      eventId: 14,
      url: 'https://www.anime-cooking-class.com',
      preview: false
    },
    {
      eventId: 15,
      url: 'https://www.anime-yoga-session.com',
      preview: true
    },
    {
      eventId: 16,
      url: 'https://www.anime-charity-cosplay-ball.com',
      preview: false
    },
    {
      eventId: 17,
      url: 'https://www.anime-crafting-workshop.com',
      preview: true
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
    await queryInterface.bulkDelete('EventImages')
  }
};
