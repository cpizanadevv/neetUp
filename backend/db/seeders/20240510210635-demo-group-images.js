"use strict";
const { GroupImage } = require("../models");

/** @type {import('sequelize-cli').Migration} */
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
    await GroupImage.bulkCreate([
      // Otaku Haven
      {
        groupId: 1,
        url: "https://example.com/images/otaku-haven-1.jpg",
        preview: true,
      },
      {
        groupId: 1,
        url: "https://example.com/images/otaku-haven-2.jpg",
        preview: false,
      },
      {
        groupId: 1,
        url: "https://example.com/images/otaku-haven-3.jpg",
        preview: false,
      },

      // Mecha Madness
      {
        groupId: 2,
        url: "https://example.com/images/mecha-madness-1.jpg",
        preview: true,
      },
      {
        groupId: 2,
        url: "https://example.com/images/mecha-madness-2.jpg",
        preview: false,
      },
      {
        groupId: 2,
        url: "https://example.com/images/mecha-madness-3.jpg",
        preview: false,
      },

      // FanArts and Crafts
      {
        groupId: 3,
        url: "https://example.com/images/fanarts-crafts-1.jpg",
        preview: true,
      },
      {
        groupId: 3,
        url: "https://example.com/images/fanarts-crafts-2.jpg",
        preview: false,
      },
      {
        groupId: 3,
        url: "https://example.com/images/fanarts-crafts-3.jpg",
        preview: false,
      },

      // Magical Girls United
      {
        groupId: 4,
        url: "https://example.com/images/magical-girls-1.jpg",
        preview: true,
      },
      {
        groupId: 4,
        url: "https://example.com/images/magical-girls-2.jpg",
        preview: false,
      },
      {
        groupId: 4,
        url: "https://example.com/images/magical-girls-3.jpg",
        preview: false,
      },

      // Shonen Showdown
      {
        groupId: 5,
        url: "https://example.com/images/shonen-showdown-1.jpg",
        preview: true,
      },
      {
        groupId: 5,
        url: "https://example.com/images/shonen-showdown-2.jpg",
        preview: false,
      },
      {
        groupId: 5,
        url: "https://example.com/images/shonen-showdown-3.jpg",
        preview: false,
      },

      // Slice of Life Society
      {
        groupId: 6,
        url: "https://example.com/images/slice-of-life-1.jpg",
        preview: true,
      },
      {
        groupId: 6,
        url: "https://example.com/images/slice-of-life-2.jpg",
        preview: false,
      },
      {
        groupId: 6,
        url: "https://example.com/images/slice-of-life-3.jpg",
        preview: false,
      },

      // Dark Fantasy League
      {
        groupId: 7,
        url: "https://example.com/images/dark-fantasy-1.jpg",
        preview: true,
      },
      {
        groupId: 7,
        url: "https://example.com/images/dark-fantasy-2.jpg",
        preview: false,
      },
      {
        groupId: 7,
        url: "https://example.com/images/dark-fantasy-3.jpg",
        preview: false,
      },

      // Cosplay Collective
      {
        groupId: 8,
        url: "https://example.com/images/cosplay-collective-1.jpg",
        preview: true,
      },
      {
        groupId: 8,
        url: "https://example.com/images/cosplay-collective-2.jpg",
        preview: false,
      },
      {
        groupId: 8,
        url: "https://example.com/images/cosplay-collective-3.jpg",
        preview: false,
      },

      // Anime Marathon
      {
        groupId: 9,
        url: "https://example.com/images/anime-marathon-1.jpg",
        preview: true,
      },
      {
        groupId: 9,
        url: "https://example.com/images/anime-marathon-2.jpg",
        preview: false,
      },
      {
        groupId: 9,
        url: "https://example.com/images/anime-marathon-3.jpg",
        preview: false,
      },

      // Ghibli Fan Club
      {
        groupId: 10,
        url: "https://example.com/images/ghibli-fan-club-1.jpg",
        preview: true,
      },
      {
        groupId: 10,
        url: "https://example.com/images/ghibli-fan-club-2.jpg",
        preview: false,
      },
      {
        groupId: 10,
        url: "https://example.com/images/ghibli-fan-club-3.jpg",
        preview: false,
      },

      // Anime Fitness Squad
      {
        groupId: 11,
        url: "https://example.com/images/anime-fitness-squad-1.jpg",
        preview: true,
      },
      {
        groupId: 11,
        url: "https://example.com/images/anime-fitness-squad-2.jpg",
        preview: false,
      },
      {
        groupId: 11,
        url: "https://example.com/images/anime-fitness-squad-3.jpg",
        preview: false,
      },

      // Seinen Society
      {
        groupId: 12,
        url: "https://example.com/images/seinen-society-1.jpg",
        preview: true,
      },
      {
        groupId: 12,
        url: "https://example.com/images/seinen-society-2.jpg",
        preview: false,
      },
      {
        groupId: 12,
        url: "https://example.com/images/seinen-society-3.jpg",
        preview: false,
      },

      // Sports Anime Enthusiasts
      {
        groupId: 13,
        url: "https://example.com/images/sports-anime-1.jpg",
        preview: true,
      },
      {
        groupId: 13,
        url: "https://example.com/images/sports-anime-2.jpg",
        preview: false,
      },
      {
        groupId: 13,
        url: "https://example.com/images/sports-anime-3.jpg",
        preview: false,
      },

      // Historical Anime Group
      {
        groupId: 14,
        url: "https://example.com/images/historical-anime-1.jpg",
        preview: true,
      },
      {
        groupId: 14,
        url: "https://example.com/images/historical-anime-2.jpg",
        preview: false,
      },
      {
        groupId: 14,
        url: "https://example.com/images/historical-anime-3.jpg",
        preview: false,
      },

      // Fantasy Worlds Club
      {
        groupId: 15,
        url: "https://example.com/images/fantasy-worlds-1.jpg",
        preview: true,
      },
      {
        groupId: 15,
        url: "https://example.com/images/fantasy-worlds-2.jpg",
        preview: false,
      },
      {
        groupId: 15,
        url: "https://example.com/images/fantasy-worlds-3.jpg",
        preview: false,
      },

      // Anime Cooking Club
      {
        groupId: 16,
        url: "https://example.com/images/anime-cooking-club-1.jpg",
        preview: true,
      },
      {
        groupId: 16,
        url: "https://example.com/images/anime-cooking-club-2.jpg",
        preview: false,
      },
      {
        groupId: 16,
        url: "https://example.com/images/anime-cooking-club-3.jpg",
        preview: false,
      },

      // Anime Book Club
      {
        groupId: 17,
        url: "https://example.com/images/anime-book-club-1.jpg",
        preview: true,
      },
      {
        groupId: 17,
        url: "https://example.com/images/anime-book-club-2.jpg",
        preview: false,
      },
      {
        groupId: 17,
        url: "https://example.com/images/anime-book-club-3.jpg",
        preview: false,
      },

      // Miyazaki Appreciation Society
      {
        groupId: 18,
        url: "https://example.com/images/miyazaki-society-1.jpg",
        preview: true,
      },
      {
        groupId: 18,
        url: "https://example.com/images/miyazaki-society-2.jpg",
        preview: false,
      },
      {
        groupId: 18,
        url: "https://example.com/images/miyazaki-society-3.jpg",
        preview: false,
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    options.tableName = 'GroupImages';
    return queryInterface.bulkDelete(options);
  },
};
