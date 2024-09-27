"use strict";

const { Event } = require("../models");
/** @type {import('sequelize-cli').Migration} */

let options = {};

if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}
module.exports = {
  async up(queryInterface, Sequelize) {
    await Event.bulkCreate([
      // Otaku Haven
      {
        venueId: null,
        groupId: 1,
        name: "Anime Discussion Night",
        description:
          "Join us online to discuss the latest anime series and episodes!",
        type: "Online",
        capacity: 50,
        price: 0,
        startDate: new Date("2024-06-15T20:00:00"),
        endDate: new Date("2024-06-15T22:00:00"),
      },
      {
        venueId: null,
        groupId: 1,
        name: "Fan Art Showcase",
        description:
          "Show off your fan art and get feedback from fellow otakus.",
        type: "Online",
        capacity: 30,
        price: 0,
        startDate: new Date("2024-06-22T18:00:00"),
        endDate: new Date("2024-06-22T20:00:00"),
      },
      {
        venueId: null,
        groupId: 1,
        name: "Cosplay Tips and Tricks",
        description:
          "Learn cosplay tips and tricks from experienced cosplayers.",
        type: "Online",
        capacity: 40,
        price: 5.00,
        startDate: new Date("2024-06-29T17:00:00"),
        endDate: new Date("2024-06-29T19:00:00"),
      },
      // Mecha Madness
      {
        venueId: null,
        groupId: 2,
        name: "Mecha Anime Watch Party",
        description: "Watch and discuss classic mecha anime series.",
        type: "Online",
        capacity: 60,
        price: 0,
        startDate: new Date("2024-07-05T19:00:00"),
        endDate: new Date("2024-07-05T23:00:00"),
      },
      {
        venueId: null,
        groupId: 2,
        name: "Mecha Model Building",
        description:
          "Learn to build your own mecha models with step-by-step instructions.",
        type: "Online",
        capacity: 20,
        price: 10.00,
        startDate: new Date("2024-07-12T15:00:00"),
        endDate: new Date("2024-07-12T18:00:00"),
      },
      {
        venueId: null,
        groupId: 2,
        name: "Virtual Mecha Battle",
        description: "Participate in a virtual mecha battle simulation.",
        type: "Online",
        capacity: 30,
        price: 5.00,
        startDate: new Date("2024-07-19T14:00:00"),
        endDate: new Date("2024-07-19T17:00:00"),
      },
      // FanArts and Crafts
      {
        venueId: 1,
        groupId: 3,
        name: "Craft Fair and Exhibition",
        description: "Showcase your handmade crafts and art.",
        type: "In Person",
        capacity: 40,
        price: 0,
        startDate: new Date("2024-06-20T10:00:00"),
        endDate: new Date("2024-06-20T14:00:00"),
      },
      {
        venueId: 2,
        groupId: 3,
        name: "Art Supplies Swap Meet",
        description: "Exchange art supplies with other members.",
        type: "In Person",
        capacity: 30,
        price: 0,
        startDate: new Date("2024-06-27T13:00:00"),
        endDate: new Date("2024-06-27T15:00:00"),
      },
      {
        venueId: 3,
        groupId: 3,
        name: "DIY Anime Merchandise Workshop",
        description: "Create your own anime merchandise.",
        type: "In Person",
        capacity: 20,
        price: 15.00,
        startDate: new Date("2024-07-04T11:00:00"),
        endDate: new Date("2024-07-04T14:00:00"),
      },
      // Magical Girls United
      {
        venueId: 4,
        groupId: 4,
        name: "Magical Girl Transformation Class",
        description: "Learn transformation sequences and poses.",
        type: "In Person",
        capacity: 25,
        price: 10.00,
        startDate: new Date("2024-06-21T15:00:00"),
        endDate: new Date("2024-06-21T18:00:00"),
      },
      {
        venueId: 5,
        groupId: 4,
        name: "Magical Girl Costume Contest",
        description: "Compete in a magical girl costume contest.",
        type: "In Person",
        capacity: 50,
        price:0,
        startDate: new Date("2024-06-28T14:00:00"),
        endDate: new Date("2024-06-28T17:00:00"),
      },
      {
        venueId: 6,
        groupId: 4,
        name: "Magical Girl Anime Marathon",
        description: "Watch your favorite magical girl anime series.",
        type: "In Person",
        capacity: 60,
        price:0,
        startDate: new Date("2024-07-05T12:00:00"),
        endDate: new Date("2024-07-05T20:00:00"),
      },

      // Shonen Showdown Events
      {
        venueId: null,
        groupId: 5,
        name: "Shonen Anime Discussion",
        description:
          "Discuss the latest episodes of your favorite shonen anime.",
        type: "Online",
        capacity: 50,
        price:0,
        startDate: new Date("2024-06-23T18:00:00"),
        endDate: new Date("2024-06-23T20:00:00"),
      },
      {
        venueId: null,
        groupId: 5,
        name: "Shonen Anime Trivia Night",
        description: "Test your knowledge of shonen anime in our trivia night.",
        type: "Online",
        capacity: 40,
        price:0,
        startDate: new Date("2024-06-30T19:00:00"),
        endDate: new Date("2024-06-30T21:00:00"),
      },
      {
        venueId: null,
        groupId: 5,
        name: "Shonen Character Design Workshop",
        description: "Learn to design your own shonen characters.",
        type: "Online",
        capacity: 30,
        price: 10.00,
        startDate: new Date("2024-07-07T15:00:00"),
        endDate: new Date("2024-07-07T18:00:00"),
      },

      // Slice of Life Society Events
      {
        venueId: null,
        groupId: 6,
        name: "Slice of Life Anime Watch Party",
        description: "Watch cozy slice of life anime with friends.",
        type: "Online",
        capacity: 50,
        price: 0,
        startDate: new Date("2024-06-25T19:00:00"),
        endDate: new Date("2024-06-25T21:00:00"),
      },
      {
        venueId: null,
        groupId: 6,
        name: "Slice of Life Discussion",
        description: "Discuss your favorite slice of life anime moments.",
        type: "Online",
        capacity: 40,
        price: 0,
        startDate: new Date("2024-07-02T18:00:00"),
        endDate: new Date("2024-07-02T20:00:00"),
      },
      {
        venueId: null,
        groupId: 6,
        name: "Cozy Cooking Night",
        description:
          "Cook simple and cozy meals inspired by slice of life anime.",
        type: "Online",
        capacity: 30,
        price: 5,
        startDate: new Date("2024-07-09T17:00:00"),
        endDate: new Date("2024-07-09T19:00:00"),
      },
      // Dark Fantasy League
      {
        venueId: null,
        groupId: 7,
        name: "Dark Fantasy Anime Watch Party",
        description: "Watch dark fantasy anime series together.",
        type: "Online",
        capacity: 50,
        price: 0,
        startDate: new Date("2024-06-28T20:00:00"),
        endDate: new Date("2024-06-28T23:00:00"),
      },
      {
        venueId: null,
        groupId: 7,
        name: "Horror Manga Reading",
        description: "Read and discuss horror manga in an online session.",
        type: "Online",
        capacity: 30,
        price: 5,
        startDate: new Date("2024-07-05T21:00:00"),
        endDate: new Date("2024-07-05T23:00:00"),
      },
      {
        venueId: null,
        groupId: 7,
        name: "Psychological Thriller Discussion",
        description:
          "Dive into psychological thrillers and discuss their themes.",
        type: "Online",
        capacity: 40,
        price: 0,
        startDate: new Date("2024-07-12T20:00:00"),
        endDate: new Date("2024-07-12T22:00:00"),
      },

      // Cosplay Collective Events
      {
        venueId: 7,
        groupId: 8,
        name: "Cosplay Workshop",
        description: "Learn the basics of cosplay crafting.",
        type: "In Person",
        capacity: 25,
        price: 15.00,
        startDate: new Date("2024-06-24T10:00:00"),
        endDate: new Date("2024-06-24T13:00:00"),
      },
      {
        venueId: 8,
        groupId: 8,
        name: "Cosplay Photoshoot",
        description: "Join us for a cosplay photoshoot session.",
        type: "In Person",
        capacity: 20,
        price: 10.00,
        startDate: new Date("2024-07-01T14:00:00"),
        endDate: new Date("2024-07-01T17:00:00"),
      },
      {
        venueId: 9,
        groupId: 8,
        name: "Convention Prep Session",
        description: "Get tips on how to prepare for anime conventions.",
        type: "In Person",
        capacity: 30,
        price: 5.00,
        startDate: new Date("2024-07-08T16:00:00"),
        endDate: new Date("2024-07-08T18:00:00"),
      },

      // Anime Marathon Events
      {
        venueId: null,
        groupId: 9,
        name: "Shonen Anime Marathon",
        description: "Binge-watch your favorite shonen anime with fellow fans.",
        type: "Online",
        capacity: 100,
        price: 0,
        startDate: new Date("2024-06-30T10:00:00"),
        endDate: new Date("2024-06-30T22:00:00"),
      },
      {
        venueId: null,
        groupId: 9,
        name: "Shojo Anime Marathon",
        description: "Enjoy a day of shojo anime series and movies.",
        type: "Online",
        capacity: 100,
        price: 0,
        startDate: new Date("2024-07-07T10:00:00"),
        endDate: new Date("2024-07-07T22:00:00"),
      },
      {
        venueId: null,
        groupId: 9,
        name: "Anime OVA Marathon",
        description: "Watch various anime OVAs together.",
        type: "Online",
        capacity: 100,
        price:0,
        startDate: new Date("2024-07-14T10:00:00"),
        endDate: new Date("2024-07-14T22:00:00"),
      },

      // Ghibli Fan Club Events
      {
        venueId: null,
        groupId: 10,
        name: "Ghibli Movie Night: Spirited Away",
        description: "Watch and discuss Spirited Away.",
        type: "Online",
        capacity: 50,
        price:0,
        startDate: new Date("2024-06-26T20:00:00"),
        endDate: new Date("2024-06-26T23:00:00"),
      },
      {
        venueId: null,
        groupId: 10,
        name: "Ghibli Art Workshop",
        description: "Create art inspired by Studio Ghibli films.",
        type: "Online",
        capacity: 30,
        price: 10.00,
        startDate: new Date("2024-07-03T15:00:00"),
        endDate: new Date("2024-07-03T18:00:00"),
      },
      {
        venueId: null,
        groupId: 10,
        name: "Ghibli Cosplay Contest",
        description:
          "Dress up as your favorite Ghibli characters and compete in a contest.",
        type: "Online",
        capacity: 40,
        price:0,
        startDate: new Date("2024-07-10T18:00:00"),
        endDate: new Date("2024-07-10T21:00:00"),
      }
    ], {validate: true});
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    options.tableName = 'Events';
    return queryInterface.bulkDelete(options);
  },
};
