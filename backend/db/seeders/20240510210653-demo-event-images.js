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
      // Anime Workout Session
      {
        eventId: 31,
        url: "https://example.com/anime-workout-session-image1.jpg",
        preview: true,
      },
      {
        eventId: 31,
        url: "https://example.com/anime-workout-session-image2.jpg",
        preview: false,
      },
      {
        eventId: 31,
        url: "https://example.com/anime-workout-session-image3.jpg",
        preview: false,
      },
      // Yoga with Anime Music
      {
        eventId: 32,
        url: "https://example.com/yoga-with-anime-music-image1.jpg",
        preview: true,
      },
      {
        eventId: 32,
        url: "https://example.com/yoga-with-anime-music-image2.jpg",
        preview: false,
      },
      {
        eventId: 32,
        url: "https://example.com/yoga-with-anime-music-image3.jpg",
        preview: false,
      },
      // Cosplay Run
      {
        eventId: 33,
        url: "https://example.com/cosplay-run-image1.jpg",
        preview: true,
      },
      {
        eventId: 33,
        url: "https://example.com/cosplay-run-image2.jpg",
        preview: false,
      },
      {
        eventId: 33,
        url: "https://example.com/cosplay-run-image3.jpg",
        preview: false,
      },
      // Seinen Anime Discussion
      {
        eventId: 34,
        url: "https://example.com/seinen-anime-discussion-image1.jpg",
        preview: true,
      },
      {
        eventId: 34,
        url: "https://example.com/seinen-anime-discussion-image2.jpg",
        preview: false,
      },
      {
        eventId: 34,
        url: "https://example.com/seinen-anime-discussion-image3.jpg",
        preview: false,
      },
      // Seinen Manga Reading Group
      {
        eventId: 35,
        url: "https://example.com/seinen-manga-reading-image1.jpg",
        preview: true,
      },
      {
        eventId: 35,
        url: "https://example.com/seinen-manga-reading-image2.jpg",
        preview: false,
      },
      {
        eventId: 35,
        url: "https://example.com/seinen-manga-reading-image3.jpg",
        preview: false,
      },
      // Seinen Anime Watch Party
      {
        eventId: 36,
        url: "https://example.com/seinen-anime-watch-party-image1.jpg",
        preview: true,
      },
      {
        eventId: 36,
        url: "https://example.com/seinen-anime-watch-party-image2.jpg",
        preview: false,
      },
      {
        eventId: 36,
        url: "https://example.com/seinen-anime-watch-party-image3.jpg",
        preview: false,
      },
      // Sports Anime Watch Party
      {
        eventId: 37,
        url: "https://example.com/sports-anime-watch-party-image1.jpg",
        preview: true,
      },
      {
        eventId: 37,
        url: "https://example.com/sports-anime-watch-party-image2.jpg",
        preview: false,
      },
      {
        eventId: 37,
        url: "https://example.com/sports-anime-watch-party-image3.jpg",
        preview: false,
      },
      // Friendly Sports Competition
      {
        eventId: 38,
        url: "https://example.com/friendly-sports-competition-image1.jpg",
        preview: true,
      },
      {
        eventId: 38,
        url: "https://example.com/friendly-sports-competition-image2.jpg",
        preview: false,
      },
      {
        eventId: 38,
        url: "https://example.com/friendly-sports-competition-image3.jpg",
        preview: false,
      },
      // Sports Anime Trivia Night
      {
        eventId: 39,
        url: "https://example.com/sports-anime-trivia-night-image1.jpg",
        preview: true,
      },
      {
        eventId: 39,
        url: "https://example.com/sports-anime-trivia-night-image2.jpg",
        preview: false,
      },
      {
        eventId: 39,
        url: "https://example.com/sports-anime-trivia-night-image3.jpg",
        preview: false,
      },
      // Historical Anime Watch Party
      {
        eventId: 40,
        url: "https://example.com/historical-anime-watch-party-image1.jpg",
        preview: true,
      },
      {
        eventId: 40,
        url: "https://example.com/historical-anime-watch-party-image2.jpg",
        preview: false,
      },
      {
        eventId: 40,
        url: "https://example.com/historical-anime-watch-party-image3.jpg",
        preview: false,
      },
      // Historical
      {
        eventId: 41,
        url: "https://example.com/historical-anime-discussion-image1.jpg",
        preview: true,
      },
      {
        eventId: 41,
        url: "https://example.com/historical-anime-discussion-image2.jpg",
        preview: false,
      },
      {
        eventId: 41,
        url: "https://example.com/historical-anime-discussion-image3.jpg",
        preview: false,
      },
      // Historical Anime Film Screening
      {
        eventId: 42,
        url: "https://example.com/historical-anime-film-screening-image1.jpg",
        preview: true,
      },
      {
        eventId: 42,
        url: "https://example.com/historical-anime-film-screening-image2.jpg",
        preview: false,
      },
      {
        eventId: 42,
        url: "https://example.com/historical-anime-film-screening-image3.jpg",
        preview: false,
      },
      // Fantasy Anime Discussion
      {
        eventId: 43,
        url: "https://example.com/fantasy-anime-discussion-image1.jpg",
        preview: true,
      },
      {
        eventId: 43,
        url: "https://example.com/fantasy-anime-discussion-image2.jpg",
        preview: false,
      },
      {
        eventId: 43,
        url: "https://example.com/fantasy-anime-discussion-image3.jpg",
        preview: false,
      },
      // Fantasy Book Club
      {
        eventId: 44,
        url: "https://example.com/fantasy-book-club-image1.jpg",
        preview: true,
      },
      {
        eventId: 44,
        url: "https://example.com/fantasy-book-club-image2.jpg",
        preview: false,
      },
      {
        eventId: 44,
        url: "https://example.com/fantasy-book-club-image3.jpg",
        preview: false,
      },
      // Fantasy Anime Movie Marathon
      {
        eventId: 45,
        url: "https://example.com/fantasy-anime-movie-marathon-image1.jpg",
        preview: true,
      },
      {
        eventId: 45,
        url: "https://example.com/fantasy-anime-movie-marathon-image2.jpg",
        preview: false,
      },
      {
        eventId: 45,
        url: "https://example.com/fantasy-anime-movie-marathon-image3.jpg",
        preview: false,
      },
      // Anime Cooking Workshop: Ramen Edition
      {
        eventId: 46,
        url: "https://example.com/anime-cooking-workshop-ramen-image1.jpg",
        preview: true,
      },
      {
        eventId: 46,
        url: "https://example.com/anime-cooking-workshop-ramen-image2.jpg",
        preview: false,
      },
      {
        eventId: 46,
        url: "https://example.com/anime-cooking-workshop-ramen-image3.jpg",
        preview: false,
      },
      // Anime Baking Class: Sweets Galore
      {
        eventId: 47,
        url: "https://example.com/anime-baking-class-sweets-image1.jpg",
        preview: true,
      },
      {
        eventId: 47,
        url: "https://example.com/anime-baking-class-sweets-image2.jpg",
        preview: false,
      },
      {
        eventId: 47,
        url: "https://example.com/anime-baking-class-sweets-image3.jpg",
        preview: false,
      },
      // Anime Food Potluck
      {
        eventId: 48,
        url: "https://example.com/anime-food-potluck-image1.jpg",
        preview: true,
      },
      {
        eventId: 48,
        url: "https://example.com/anime-food-potluck-image2.jpg",
        preview: false,
      },
      {
        eventId: 48,
        url: "https://example.com/anime-food-potluck-image3.jpg",
        preview: false,
      },
      // Manga Reading Session
      {
        eventId: 49,
        url: "https://example.com/manga-reading-session-image1.jpg",
        preview: true,
      },
      {
        eventId: 49,
        url: "https://example.com/manga-reading-session-image2.jpg",
        preview: false,
      },
      {
        eventId: 49,
        url: "https://example.com/manga-reading-session-image3.jpg",
        preview: false,
      },
      // Light Novel Discussio
      {
        eventId: 50,
        url: "https://example.com/light-novel-discussion-image1.jpg",
        preview: true,
      },
      {
        eventId: 50,
        url: "https://example.com/light-novel-discussion-image2.jpg",
        preview: false,
      },
      {
        eventId: 50,
        url: "https://example.com/light-novel-discussion-image3.jpg",
        preview: false,
      },
      // Anime Book Recommendations
      {
        eventId: 51,
        url: "https://example.com/anime-book-recommendations-image1.jpg",
        preview: true,
      },
      {
        eventId: 51,
        url: "https://example.com/anime-book-recommendations-image2.jpg",
        preview: false,
      },
      {
        eventId: 51,
        url: "https://example.com/anime-book-recommendations-image3.jpg",
        preview: false,
      },
      // Ghibli Film Discussion: Princess Mononoke
      {
        eventId: 52,
        url: "https://example.com/ghibli-film-discussion-mononoke-image1.jpg",
        preview: true,
      },
      {
        eventId: 52,
        url: "https://example.com/ghibli-film-discussion-mononoke-image2.jpg",
        preview: false,
      },
      {
        eventId: 52,
        url: "https://example.com/ghibli-film-discussion-mononoke-image3.jpg",
        preview: false,
      },
      // Ghibli Movie Marathon
      {
        eventId: 53,
        url: "https://example.com/ghibli-movie-marathon-image1.jpg",
        preview: true,
      },
      {
        eventId: 53,
        url: "https://example.com/ghibli-movie-marathon-image2.jpg",
        preview: false,
      },
      {
        eventId: 53,
        url: "https://example.com/ghibli-movie-marathon-image3.jpg",
        preview: false,
      },
      // Miyazaki Tribute Art Exhibition
      {
        eventId: 54,
        url: "https://example.com/miyazaki-tribute-art-exhibition-image1.jpg",
        preview: true,
      },
      {
        eventId: 54,
        url: "https://example.com/miyazaki-tribute-art-exhibition-image2.jpg",
        preview: false,
      },
      {
        eventId: 54,
        url: "https://example.com/miyazaki-tribute-art-exhibition-image3.jpg",
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
    options.tableName = 'EventImages';
    return queryInterface.bulkDelete(options);
  },
};
