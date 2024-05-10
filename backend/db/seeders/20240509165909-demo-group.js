"use strict";
const { Group } = require("../models");

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
    await Group.bulkCreate([
      {
        organizerId:3,
        name:'Otaku Haven',
        about:'Welcome to Otaku Haven, where anime enthusiasts gather to discuss their favorite series, share fan art, and participate in cosplay events. Join us to connect with fellow otaku and immerse yourself in the world of anime!',
        type:'Online',
        private:false,
      },
      {
        organizerId:8,
        name:'Mecha Madness',
        about:"Mecha Madness is a community dedicated to all things mecha anime. Whether you're a fan of classic series like Gundam or newer titles like Evangelion, this is the place to be. Join us for discussions, watch parties, and mech-themed events!",
        type:'Online',
        private:false,
      },
      {
        organizerId:5,
        name: 'FanArts and Crafts',
        about:"Welcome to FanArts and Crafts, where creativity knows no bounds! Whether you're a skilled artist, a crafty DIY enthusiast, or simply passionate about fan creations, this is the perfect group for you. Join us as we explore the world of anime-inspired art, handmade crafts, and creative projects. From fan art showcases to craft tutorials and collaborative projects, we're here to inspire and support each other's artistic endeavors. Let your imagination run wild and unleash your inner creativity with FanArts and Crafts!",
        type:"In Person",
        private:false,
        city:"Los Angeles",
        state:"CA",
      },
      {
        organizerId:12,
        name:'Magical Girls United',
        about:"Magical Girls United is where fans of the magical girl genre come together to celebrate their favorite heroines. From Sailor Moon to Cardcaptor Sakura, we embrace the power of friendship, love, and sparkly transformations. Join us for magical adventures and everlasting friendship!",
        type:'In Person',
        private:true,
        city:'New York',
        state:'NY',
      },
      {
        organizerId:19,
        name:'Shonen Showdown',
        about:"Shonen Showdown is the ultimate destination for fans of action-packed shonen anime. Whether you're into epic battles, intense training arcs, or powerful friendships, this is the group for you. Join us as we journey through the worlds of Naruto, One Piece, Dragon Ball, and more!",
        type:'Online',
        private:false
      },
      {
        organizerId:7,
        name:'Slice of Life Society',
        about:"Welcome to Slice of Life Society, where we appreciate the beauty in everyday moments portrayed in slice-of-life anime. Join us for cozy watch parties, heartfelt discussions, and a warm sense of community. Let's explore the ordinary and find the extraordinary together!",
        type:"Online",
        private:false
      },
      {
        organizerId:9,
        name:'Dark Fantasy League',
        about:"Dark Fantasy League is for those who revel in the darker side of anime. From supernatural mysteries to psychological thrillers, we delve into the depths of darkness and intrigue. Join us if you dare to explore the shadows of the anime world.",
        type:'Online',
        private:true,
      },
      {
        organizerId:10,
        name:'Cosplay Collective',
        about:"Cosplay Collective is where creativity knows no bounds. Whether you're a seasoned cosplayer or just starting out, this is your place to shine. Join us for cosplay workshops, photo shoots, and conventions as we bring our favorite characters to life!",
        type:'In Person',
        private:false,
        city:'Los Angeles',
        state:'CA',
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
    await queryInterface.bulkDelete('Groups')
  },
};
