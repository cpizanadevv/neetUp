"use strict";
const { EventImage } = require("../models");

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
    await EventImage.bulkCreate([
      // Anime Discussion Night
      {
        eventId: 1,
        url: "https://example.com/anime-discussion-night-image1.jpg",
        preview: true,
      },
      {
        eventId: 1,
        url: "https://example.com/anime-discussion-night-image2.jpg",
        preview: false,
      },
      {
        eventId: 1,
        url: "https://example.com/anime-discussion-night-image3.jpg",
        preview: false,
      },
      // Fan Art Showcase
      {
        eventId: 2,
        url: "https://example.com/fan-art-showcase-image1.jpg",
        preview: true,
      },
      {
        eventId: 2,
        url: "https://example.com/fan-art-showcase-image2.jpg",
        preview: false,
      },
      {
        eventId: 2,
        url: "https://example.com/fan-art-showcase-image3.jpg",
        preview: false,
      },
      // Cosplay Tips and Tricks
      {
        eventId: 3,
        url: "https://example.com/cosplay-tips-image1.jpg",
        preview: true,
      },
      {
        eventId: 3,
        url: "https://example.com/cosplay-tips-image2.jpg",
        preview: false,
      },
      {
        eventId: 3,
        url: "https://example.com/cosplay-tips-image3.jpg",
        preview: false,
      },
      // Mecha Anime Watch Party
      {
        eventId: 4,
        url: "https://example.com/mecha-watch-party-image1.jpg",
        preview: true,
      },
      {
        eventId: 4,
        url: "https://example.com/mecha-watch-party-image2.jpg",
        preview: false,
      },
      {
        eventId: 4,
        url: "https://example.com/mecha-watch-party-image3.jpg",
        preview: false,
      },
      // Mecha Model Building
      {
        eventId: 5,
        url: "https://example.com/mecha-model-building-image1.jpg",
        preview: true,
      },
      {
        eventId: 5,
        url: "https://example.com/mecha-model-building-image2.jpg",
        preview: false,
      },
      {
        eventId: 5,
        url: "https://example.com/mecha-model-building-image3.jpg",
        preview: false,
      },
      // Virtual Mecha Battle
      {
        eventId: 6,
        url: "https://example.com/virtual-mecha-battle-image1.jpg",
        preview: true,
      },
      {
        eventId: 6,
        url: "https://example.com/virtual-mecha-battle-image2.jpg",
        preview: false,
      },
      {
        eventId: 6,
        url: "https://example.com/virtual-mecha-battle-image3.jpg",
        preview: false,
      },
      // Craft Fair and Exhibition
      {
        eventId: 7,
        url: "https://example.com/craft-fair-image1.jpg",
        preview: true,
      },
      {
        eventId: 7,
        url: "https://example.com/craft-fair-image2.jpg",
        preview: false,
      },
      {
        eventId: 7,
        url: "https://example.com/craft-fair-image3.jpg",
        preview: false,
      },
      // Art Supplies Swap Meet
      {
        eventId: 8,
        url: "https://example.com/art-supplies-swap-image1.jpg",
        preview: true,
      },
      {
        eventId: 8,
        url: "https://example.com/art-supplies-swap-image2.jpg",
        preview: false,
      },
      {
        eventId: 8,
        url: "https://example.com/art-supplies-swap-image3.jpg",
        preview: false,
      },
      // DIY Anime Merchandise Workshop
      {
        eventId: 9,
        url: "https://example.com/diy-anime-merchandise-image1.jpg",
        preview: true,
      },
      {
        eventId: 9,
        url: "https://example.com/diy-anime-merchandise-image2.jpg",
        preview: false,
      },
      {
        eventId: 9,
        url: "https://example.com/diy-anime-merchandise-image3.jpg",
        preview: false,
      },
      // Magical Girl Transformation Class
      {
        eventId: 10,
        url: "https://example.com/magical-girl-transformation-image1.jpg",
        preview: true,
      },
      {
        eventId: 10,
        url: "https://example.com/magical-girl-transformation-image2.jpg",
        preview: false,
      },
      {
        eventId: 10,
        url: "https://example.com/magical-girl-transformation-image3.jpg",
        preview: false,
      },
      // Magical Girl Costume Contest
      {
        eventId: 11,
        url: "https://example.com/magical-girl-costume-contest-image1.jpg",
        preview: true,
      },
      {
        eventId: 11,
        url: "https://example.com/magical-girl-costume-contest-image2.jpg",
        preview: false,
      },
      {
        eventId: 11,
        url: "https://example.com/magical-girl-costume-contest-image3.jpg",
        preview: false,
      },
      // Magical Girl Anime Marathon
      {
        eventId: 12,
        url: "https://example.com/magical-girl-marathon-image1.jpg",
        preview: true,
      },
      {
        eventId: 12,
        url: "https://example.com/magical-girl-marathon-image2.jpg",
        preview: false,
      },
      {
        eventId: 12,
        url: "https://example.com/magical-girl-marathon-image3.jpg",
        preview: false,
      },
      // Shonen Anime Discussion
      {
        eventId: 13,
        url: "https://example.com/shonen-anime-discussion-image1.jpg",
        preview: true,
      },
      {
        eventId: 13,
        url: "https://example.com/shonen-anime-discussion-image2.jpg",
        preview: false,
      },
      {
        eventId: 13,
        url: "https://example.com/shonen-anime-discussion-image3.jpg",
        preview: false,
      },
      // Shonen Anime Trivia Night
      {
        eventId: 14,
        url: "https://example.com/shonen-anime-trivia-image1.jpg",
        preview: true,
      },
      {
        eventId: 14,
        url: "https://example.com/shonen-anime-trivia-image2.jpg",
        preview: false,
      },
      {
        eventId: 14,
        url: "https://example.com/shonen-anime-trivia-image3.jpg",
        preview: false,
      },
      // Shonen Character Design Workshop
      {
        eventId: 15,
        url: "https://example.com/shonen-character-design-image1.jpg",
        preview: true,
      },
      {
        eventId: 15,
        url: "https://example.com/shonen-character-design-image2.jpg",
        preview: false,
      },
      {
        eventId: 15,
        url: "https://example.com/shonen-character-design-image3.jpg",
        preview: false,
      },
      // Slice of Life Anime Watch Party
      {
        eventId: 16,
        url: "https://example.com/slice-of-life-watch-party-image1.jpg",
        preview: true,
      },
      {
        eventId: 16,
        url: "https://example.com/slice-of-life-watch-party-image2.jpg",
        preview: false,
      },
      {
        eventId: 16,
        url: "https://example.com/slice-of-life-watch-party-image3.jpg",
        preview: false,
      },
      // Slice of Life Discussion
      {
        eventId: 17,
        url: "https://example.com/slice-of-life-discussion-image1.jpg",
        preview: true,
      },
      {
        eventId: 17,
        url: "https://example.com/slice-of-life-discussion-image2.jpg",
        preview: false,
      },
      {
        eventId: 17,
        url: "https://example.com/slice-of-life-discussion-image3.jpg",
        preview: false,
      },
      // Cozy Cooking Night
      {
        eventId: 18,
        url: "https://example.com/cozy-cooking-night-image1.jpg",
        preview: true,
      },
      {
        eventId: 18,
        url: "https://example.com/cozy-cooking-night-image2.jpg",
        preview: false,
      },
      {
        eventId: 18,
        url: "https://example.com/cozy-cooking-night-image3.jpg",
        preview: false,
      },
      // Dark Fantasy Anime Watch Party
      {
        eventId: 19,
        url: "https://example.com/dark-fantasy-watch-party-image1.jpg",
        preview: true,
      },
      {
        eventId: 19,
        url: "https://example.com/dark-fantasy-watch-party-image2.jpg",
        preview: false,
      },
      {
        eventId: 19,
        url: "https://example.com/dark-fantasy-watch-party-image3.jpg",
        preview: false,
      },
      // Horror Manga Reading
      {
        eventId: 20,
        url: "https://example.com/horror-manga-reading-image1.jpg",
        preview: true,
      },
      {
        eventId: 20,
        url: "https://example.com/horror-manga-reading-image2.jpg",
        preview: false,
      },
      {
        eventId: 20,
        url: "https://example.com/horror-manga-reading-image3.jpg",
        preview: false,
      },
      // Psychological Thriller Discussion
      {
        eventId: 21,
        url: "https://example.com/psychological-thriller-discussion-image1.jpg",
        preview: true,
      },
      {
        eventId: 21,
        url: "https://example.com/psychological-thriller-discussion-image2.jpg",
        preview: false,
      },
      {
        eventId: 21,
        url: "https://example.com/psychological-thriller-discussion-image3.jpg",
        preview: false,
      },
      // Cosplay Workshop
      {
        eventId: 22,
        url: "https://example.com/cosplay-workshop-image1.jpg",
        preview: true,
      },
      {
        eventId: 22,
        url: "https://example.com/cosplay-workshop-image2.jpg",
        preview: false,
      },
      {
        eventId: 22,
        url: "https://example.com/cosplay-workshop-image3.jpg",
        preview: false,
      },
      // Cosplay Photoshoot
      {
        eventId: 23,
        url: "https://example.com/cosplay-photoshoot-image1.jpg",
        preview: true,
      },
      {
        eventId: 23,
        url: "https://example.com/cosplay-photoshoot-image2.jpg",
        preview: false,
      },
      {
        eventId: 23,
        url: "https://example.com/cosplay-photoshoot-image3.jpg",
        preview: false,
      },
      // Convention Prep Session
      {
        eventId: 24,
        url: "https://example.com/convention-prep-image1.jpg",
        preview: true,
      },
      {
        eventId: 24,
        url: "https://example.com/convention-prep-image2.jpg",
        preview: false,
      },
      {
        eventId: 24,
        url: "https://example.com/convention-prep-image3.jpg",
        preview: false,
      },
      // Shonen Anime Marathon
      {
        eventId: 25,
        url: "https://example.com/shonen-anime-marathon-image1.jpg",
        preview: true,
      },
      {
        eventId: 25,
        url: "https://example.com/shonen-anime-marathon-image2.jpg",
        preview: false,
      },
      {
        eventId: 25,
        url: "https://example.com/shonen-anime-marathon-image3.jpg",
        preview: false,
      },
      // Shojo Anime Marathon
      {
        eventId: 26,
        url: "https://example.com/shojo-anime-marathon-image1.jpg",
        preview: true,
      },
      {
        eventId: 26,
        url: "https://example.com/shojo-anime-marathon-image2.jpg",
        preview: false,
      },
      {
        eventId: 26,
        url: "https://example.com/shojo-anime-marathon-image3.jpg",
        preview: false,
      },
      // Anime OVA Marathon
      {
        eventId: 27,
        url: "https://example.com/anime-ova-marathon-image1.jpg",
        preview: true,
      },
      {
        eventId: 27,
        url: "https://example.com/anime-ova-marathon-image2.jpg",
        preview: false,
      },
      {
        eventId: 27,
        url: "https://example.com/anime-ova-marathon-image3.jpg",
        preview: false,
      },
      // Ghibli Movie Night: Spirited Away
      {
        eventId: 28,
        url: "https://example.com/spirited-away-movie-night-image1.jpg",
        preview: true,
      },
      {
        eventId: 28,
        url: "https://example.com/spirited-away-movie-night-image2.jpg",
        preview: false,
      },
      {
        eventId: 28,
        url: "https://example.com/spirited-away-movie-night-image3.jpg",
        preview: false,
      },
      // Ghibli Art Workshop
      {
        eventId: 29,
        url: "https://example.com/ghibli-art-workshop-image1.jpg",
        preview: true,
      },
      {
        eventId: 29,
        url: "https://example.com/ghibli-art-workshop-image2.jpg",
        preview: false,
      },
      {
        eventId: 29,
        url: "https://example.com/ghibli-art-workshop-image3.jpg",
        preview: false,
      },
      // Ghibli Cosplay Contest
      {
        eventId: 30,
        url: "https://example.com/ghibli-cosplay-contest-image1.jpg",
        preview: true,
      },
      {
        eventId: 30,
        url: "https://example.com/ghibli-cosplay-contest-image2.jpg",
        preview: false,
      },
      {
        eventId: 30,
        url: "https://example.com/ghibli-cosplay-contest-image3.jpg",
        preview: false,
      },
      
    ], { validate: true });
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    options.tableName = 'EventImages';
    return queryInterface.bulkDelete(options);
  },
};
