'use strict';
const { Event } = require("../models");
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
   await Event.bulkCreate([
    
    {
      venueId:,
      groupId:3,
      name: "Anime Picnic under the Cherry Blossoms",
      about:
        "Join fellow anime enthusiasts for a picturesque picnic under blooming cherry blossoms. Bring your favorite anime-themed snacks and enjoy cosplay contests, trivia, and screenings of popular anime films and episodes.",
      type: "In Person",
      private: false,
      city: "Los Angeles",
      state: "CA",
    },
    {
      venueId:,
      groupId:7,
      name: "Manga Book Club at Mt. Fuji Cafe",
      about:
        "Gather with fellow manga lovers at Mt. Fuji Cafe for lively discussions about your favorite manga series. Share recommendations, fan theories, and delve into the world of Japanese comics.",
      type: "In Person",
      private: false,
      city: "Seattle",
      state: "WA",
    },
    {
      venueId:,
      groupId:1,
      name: "Anime Karaoke Night at Sakura Lounge",
      about:
        "Sing your heart out to iconic anime theme songs and J-pop hits at Sakura Lounge's Anime Karaoke Night. Cosplay encouraged, and prizes await the best performances!",
      type: "In Person",
      private: true,
      city: "San Francisco",
      state: "CA",
    },
    {
      venueId:,
      groupId:4,
      name: "Cosplay Parade in Central Park",
      about:
        "Join a vibrant parade of cosplayers through the scenic trails of Central Park. From classic characters to the latest anime trends, showcase your cosplay creativity!",
      type: "In Person",
      private: false,
      city: "New York",
      state: "NY",
    },
    {
      venueId:,
      groupId:7,
      name: "Anime Movie Marathon",
      about:
        "Embark on an epic anime movie marathon. Enjoy back-to-back screenings of classic and contemporary anime films, plus exclusive sneak peeks!",
      type: "Online",
      private: false
    },
    {
      venueId:,
      groupId:5,
      name: "Anime Gaming Tournament",
      about:
        "Compete in thrilling anime gaming tournaments at Shinobi Arena. Test your skills in popular titles like Naruto Ultimate Ninja Storm and Dragon Ball FighterZ!",
      type: "Online",
      private: false
    },
    {
      venueId:,
      groupId:6,
      name: "Anime Art Exhibit at Studio Ghibli Gallery",
      about:
        "Marvel at exquisite anime-inspired artwork at the Studio Ghibli Gallery's Anime Art Exhibit. Discover talented artists and immerse yourself in the beauty of anime aesthetics.",
      type: "In Person",
      private: false,
      city: "Chicago",
      state: "IL",
    },
    {
      venueId:,
      groupId:2,
      name: "Anime Trivia Night",
      about:
        "Test your anime knowledge at Anime Trivia Night. Compete against fellow fans for bragging rights and enjoy delicious ramen specials!",
      type: "Online",
      private: false
    },
    {
      venueId:,
      groupId:4,
      name: "Anime Dance Party at Neon Dreams Club",
      about:
        "Dance the night away to electrifying anime EDM remixes at Neon Dreams Club's Anime Dance Party. Get your groove on with fellow otaku under the neon lights!",
      type: "In Person",
      private: false,
      city: "Miami",
      state: "FL",
    },
    {
      venueId:,
      groupId:1,
      name: "Anime Figure Swap Meet at Akihabara Alley",
      about:
        "Trade, buy, and sell anime figures and merchandise at Akihabara Alley's Anime Figure Swap Meet. Discover rare collectibles and connect with fellow figure enthusiasts!",
      type: "In Person",
      private: false,
      city: "Dallas",
      state: "TX",
    },
    {
      venueId:,
      groupId:8,
      name: "Anime Cosplay Picnic at Cherry Blossom Park",
      about:
        "Celebrate the beauty of cosplay amidst blooming cherry blossoms at Cherry Blossom Park's Anime Cosplay Picnic. Bring your favorite characters to life in a picturesque setting!",
      type: "In Person",
      private: false,
      city: "Washington",
      state: "DC",
    },
    {
      venueId:,
      groupId:5,
      name: "Virtual Anime Watch Party: Attack on Titan Finale",
      about:
        "Experience the epic conclusion of Attack on Titan with fellow fans at our Virtual Anime Watch Party. Discuss theories, reactions, and bid farewell to this legendary series!",
      type: "Online",
      private: false,
    },
    {
      venueId:,
      groupId:1,
      name: "Anime Book Signing with Renowned Mangaka",
      about:
        "Meet and greet a legendary mangaka at our Anime Book Signing event. Get your favorite manga volumes signed and gain insight into the creative process behind iconic series!",
      type: "In Person",
      private: false,
      city:'Los Angeles',
      state:'CA',
    },
    {
      venueId:,
      groupId:6,
      name: "Anime Cooking Class: Ramen Master Edition",
      about:
        "Learn the art of crafting authentic ramen from an anime-inspired menu at our Anime Cooking Class. Impress your friends with homemade ramen worthy of a shonen hero!",
      type: "Online",
      private: false
    },
    {
      venueId:,
      groupId:4,
      name: "Anime Yoga Session: Zen in the Spirit of Anime",
      about:
        "Find balance and harmony with an anime-themed yoga session. Connect mind, body, and spirit as we flow through poses inspired by iconic anime characters and settings!",
      type: "In Person",
      private: false,
      city: "San Jose",
      state: "CA",
    },
    {
      venueId:,
      groupId:8,
      name: "Anime Charity Cosplay Ball",
      about:
        "Dress to impress in your finest cosplay attire at our Anime Charity Cosplay Ball. Dance, mingle, and raise funds for a noble cause with fellow otaku philanthropists!",
      type: "In Person",
      private: false,
      city: "Boston",
      state: "MA",
    },
    {
      venueId:,
      groupId:3,
      name: "Anime Crafting Workshop: DIY Plushie Party",
      about:
        "Unleash your creativity and craft adorable anime plushies at our DIY Plushie Party. Learn sewing techniques and bring your favorite anime characters to life!",
      type: "In Person",
      private: false,
      city:'New York',
      state:'NY',
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
