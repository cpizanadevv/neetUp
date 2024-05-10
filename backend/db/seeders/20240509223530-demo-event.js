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
      venueId:1,
      groupId:3,
      name: "Anime Picnic under the Cherry Blossoms",
      description:
        "Join fellow anime enthusiasts for a picturesque picnic under blooming cherry blossoms. Bring your favorite anime-themed snacks and enjoy cosplay contests, trivia, and screenings of popular anime films and episodes.",
      type: "In Person",
      capacity: 50,
    price: 10,
    startDate: new Date('2024-06-01T08:00:00'),
    endDate: new Date('2024-06-01T18:00:00')
    },
    {
      venueId:2,
      groupId:7,
      name: "Manga Book Club at Mt. Fuji Cafe",
      description:
        "Gather with fellow manga lovers at Mt. Fuji Cafe for lively discussions about your favorite manga series. Share recommendations, fan theories, and delve into the world of Japanese comics.",
      type: "In Person",
      capacity: 30,
      price: 15,
      startDate: new Date('2024-06-02T10:00:00'),
      endDate: new Date('2024-06-02T16:00:00')
    },
    {
      venueId:3,
      groupId:1,
      name: "Anime Karaoke Night at Sakura Lounge",
      description:
        "Sing your heart out to iconic anime theme songs and J-pop hits at Sakura Lounge's Anime Karaoke Night. Cosplay encouraged, and prizes await the best performances!",
      type: "In Person",
      capacity: 100,
      price: 20,
      startDate: new Date('2024-06-03T12:00:00'),
      endDate: new Date('2024-06-03T20:00:00')
    },
    {
      venueId:4,
      groupId:4,
      name: "Cosplay Parade in Central Park",
      description:
        "Join a vibrant parade of cosplayers through the scenic trails of Central Park. From classic characters to the latest anime trends, showcase your cosplay creativity!",
      type: "In Person",
      capacity: 80,
      price: 25,
      startDate: new Date('2024-06-04T09:00:00'),
      endDate: new Date('2024-06-04T17:00:00')
    },
    {
      venueId:null,
      groupId:7,
      name: "Anime Movie Marathon",
      description:
        "Embark on an epic anime movie marathon. Enjoy back-to-back screenings of classic and contemporary anime films, plus exclusive sneak peeks!",
      type: "Online",
      capacity: 70,
      price: 0,
      startDate: new Date('2024-06-05T11:00:00'),
      endDate: new Date('2024-06-05T19:00:00')
    },
    {
      venueId:null,
      groupId:5,
      name: "Anime Gaming Tournament",
      description:
        "Compete in thrilling anime gaming tournaments at Shinobi Arena. Test your skills in popular titles like Naruto Ultimate Ninja Storm and Dragon Ball FighterZ!",
      type: "Online",
      capacity: 60,
      price: 35,
      startDate: new Date('2024-06-06T13:00:00'),
      endDate: new Date('2024-06-06T21:00:00')
    },
    {
      venueId:5,
      groupId:6,
      name: "Anime Art Exhibit at Studio Ghibli Gallery",
      description:
        "Marvel at exquisite anime-inspired artwork at the Studio Ghibli Gallery's Anime Art Exhibit. Discover talented artists and immerse yourself in the beauty of anime aesthetics.",
      type: "In Person",
      capacity: 40,
      price: 40,
      startDate: new Date('2024-06-07T07:00:00'),
      endDate: new Date('2024-06-07T15:00:00')
    },
    {
      venueId:null,
      groupId:2,
      name: "Anime Trivia Night",
      description:
        "Test your anime knowledge at Anime Trivia Night. Compete against fellow fans for bragging rights and enjoy delicious ramen specials!",
      type: "Online",
      capacity: 90,
      price: 0,
      startDate: new Date('2024-06-08T14:00:00'),
      endDate: new Date('2024-06-08T22:00:00')
    },
    {
      venueId:6,
      groupId:4,
      name: "Anime Dance Party at Neon Dreams Club",
      description:
        "Dance the night away to electrifying anime EDM remixes at Neon Dreams Club's Anime Dance Party. Get your groove on with fellow otaku under the neon lights!",
      type: "In Person",
      capacity: 120,
      price: 50,
      startDate: new Date('2024-06-09T10:00:00'),
      endDate: new Date('2024-06-09T18:00:00')
    },
    {
      venueId:7,
      groupId:1,
      name: "Anime Figure Swap Meet at Akihabara Alley",
      description:
        "Trade, buy, and sell anime figures and merchandise at Akihabara Alley's Anime Figure Swap Meet. Discover rare collectibles and connect with fellow figure enthusiasts!",
      type: "In Person",
      capacity: 55,
      price: 55,
      startDate: new Date('2024-06-10T11:30:00'),
      endDate: new Date('2024-06-10T19:30:00')
    },
    {
      venueId:8,
      groupId:8,
      name: "Anime Cosplay Picnic at Cherry Blossom Park",
      description:
        "Celebrate the beauty of cosplay amidst blooming cherry blossoms at Cherry Blossom Park's Anime Cosplay Picnic. Bring your favorite characters to life in a picturesque setting!",
      type: "In Person",
      capacity: 85,
      price: 20,
      startDate: new Date('2024-06-11T12:45:00'),
      endDate: new Date('2024-06-11T20:45:00')
  
    },
    {
      venueId:null,
      groupId:5,
      name: "Virtual Anime Watch Party: Attack on Titan Finale",
      description:
        "Experience the epic conclusion of Attack on Titan with fellow fans at our Virtual Anime Watch Party. Discuss theories, reactions, and bid farewell to this legendary series!",
      type: "Online",
      capacity: 65,
      price: 0,
      startDate: new Date('2024-06-12T08:15:00'),
      endDate: new Date('2024-06-12T16:15:00')
    },
    {
      venueId:9,
      groupId:1,
      name: "Anime Book Signing with Renowned Mangaka",
      description:
        "Meet and greet a legendary mangaka at our Anime Book Signing event. Get your favorite manga volumes signed and gain insight into the creative process behind iconic series!",
      type: "In Person",
      capacity: 75,
      price: 0,
      startDate: new Date('2024-06-13T09:30:00'),
      endDate: new Date('2024-06-13T17:30:00')
    },
    {
      venueId:null,
      groupId:6,
      name: "Anime Cooking Class: Ramen Master Edition",
      description:
        "Learn the art of crafting authentic ramen from an anime-inspired menu at our Anime Cooking Class. Impress your friends with homemade ramen worthy of a shonen hero!",
      type: "Online",
      capacity: 110,
      price: 75,
      startDate: new Date('2024-06-14T13:45:00'),
      endDate: new Date('2024-06-14T21:45:00')
    },
    {
      venueId:10,
      groupId:4,
      name: "Anime Yoga Session: Zen in the Spirit of Anime",
      description:
        "Find balance and harmony with an anime-themed yoga session. Connect mind, body, and spirit as we flow through poses inspired by iconic anime characters and settings!",
      type: "In Person",
      capacity: 95,
      price: 0,
      startDate: new Date('2024-06-15T15:00:00'),
      endDate: new Date('2024-06-15T23:00:00')
    },
    {
      venueId:11,
      groupId:8,
      name: "Anime Charity Cosplay Ball",
      description:
        "Dress to impress in your finest cosplay attire at our Anime Charity Cosplay Ball. Dance, mingle, and raise funds for a noble cause with fellow otaku philanthropists!",
      type: "In Person",
      capacity: 200,
      price: 100,
      startDate: new Date('2024-06-16T10:00:00'),
      endDate: new Date('2024-06-16T18:00:00')
    },
    {
      venueId:12,
      groupId:3,
      name: "Anime Crafting Workshop: DIY Plushie Party",
      description:
        "Unleash your creativity and craft adorable anime plushies at our DIY Plushie Party. Learn sewing techniques and bring your favorite anime characters to life!",
      type: "In Person",
      capacity: 70,
      price: 35,
      startDate: new Date('2024-06-17T12:00:00'),
      endDate: new Date('2024-06-17T20:00:00')
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
