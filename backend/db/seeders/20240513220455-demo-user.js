'use strict';
const { User } = require('../models');
const bcrypt = require("bcryptjs");


let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}


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
   await User.bulkCreate([
    {
      email: 'demo@user.io',
      username: 'Demo-lition',
      hashedPassword: bcrypt.hashSync('password'),
    },
    {
      email: 'user1@user.io',
      username: 'FakeUser1',
      hashedPassword: bcrypt.hashSync('password2'),
    },
    {
      email: 'user2@user.io',
      username: 'FakeUser2',
      hashedPassword: bcrypt.hashSync('password3'),
    },
    {
      firstName: "Naruto",
      lastName: "Uzumaki",
      username: "BelieveItNaruto",
      email: "believeitnaruto@example.com",
      hashedPassword: bcrypt.hashSync('Ninja9')
     
    },
    {
      firstName: "Sakura",
      lastName: "Haruno",
      username: "SakuraBlossom",
      email: "sakurablossom@example.com",
      hashedPassword: bcrypt.hashSync('DragonBlade7')
     
    },
    {
      firstName: "Luffy",
      lastName: "Monkey",
      username: "StrawHatLuffy",
      email: "strawhatluffy@example.com",
      hashedPassword: bcrypt.hashSync('OtakuElite3')
     
    },
    {
      firstName: "Sasuke",
      lastName: "Uchiha",
      username: "AvengerSasuke",
      email: "avengersasuke@example.com",
      hashedPassword: bcrypt.hashSync('ChibiStar5')
     
    },
    {
      firstName: "Ichigo",
      lastName: "Kurosaki",
      username: "SoulReaperIchigo",
      email: "soulreaperichigo@example.com",
      hashedPassword: bcrypt.hashSync('MechWarrior12')
     
    },
    {
      firstName: "Hinata",
      lastName: "Hyuga",
      username: "ByakuganHinata",
      email: "byakuganhinata@example.com",
      hashedPassword: bcrypt.hashSync('ShinigamiRealm8')
     
    },
    {
      firstName: "Lelouch",
      lastName: "Lamperouge",
      username: "ZeroRequiem",
      email: "zerorequiem@example.com",
      hashedPassword: bcrypt.hashSync('MagicalGirl99')
     
    },
    {
      firstName: "Edward",
      lastName: "Elric",
      username: "FullmetalAlchemist",
      email: "fullmetalalchemist@example.com",
      hashedPassword: bcrypt.hashSync('SaiyanLegend23')
     
    },
    {
      firstName: "Kagome",
      lastName: "Higurashi",
      username: "FeudalEraKagome",
      email: "feudaleraKagome@example.com",
      hashedPassword: bcrypt.hashSync('PirateCrew77')
     
    },
    {
      firstName: "Vegeta",
      lastName: "Prince",
      username: "PrinceOfSaiyans",
      email: "princeofsaiyans@example.com",
      hashedPassword: bcrypt.hashSync('SamuraiSword14')
     
    },
    {
      firstName: "Rukia",
      lastName: "Kuchiki",
      username: "ShinigamiRukia",
      email: "shinigamirukia@example.com",
      hashedPassword: bcrypt.hashSync('AnimeMaster21')
     
    },
    {
      firstName: "Sailor",
      lastName: "Moon",
      username: "MoonPrincess",
      email: "moonprincess@example.com",
      hashedPassword: bcrypt.hashSync('')
     
    },
    {
      firstName: "Goku",
      lastName: "Son",
      username: "KamehamehaGoku",
      email: "kamehamehagoku@example.com",
      hashedPassword: bcrypt.hashSync('MechaPilot88')
     
    },
    {
      firstName: "Mikasa",
      lastName: "Ackerman",
      username: "TitanSlayerMikasa",
      email: "titanslayermikasa@example.com",
      hashedPassword: bcrypt.hashSync('KawaiiNeko6')
     
    },
    {
      firstName: "Natsu",
      lastName: "Dragneel",
      username: "FireDragonNatsu",
      email: "firedragonnatsu@example.com",
      hashedPassword: bcrypt.hashSync('ElementalHero17')
     
    },
    {
      firstName: "Asuna",
      lastName: "Yuuki",
      username: "SwordArtOnlineAsuna",
      email: "swordartonlineasuna@example.com",
      hashedPassword: bcrypt.hashSync('Cyberpunk2099')
     
    },
    {
      firstName: "Usagi",
      lastName: "Tsukino",
      username: "SailorMoonUsagi",
      email: "sailormoonusagi@example.com",
      hashedPassword: bcrypt.hashSync('ShonenChampion42')
     
    },
    {
      firstName: "Gon",
      lastName: "Freecss",
      username: "HunterGon",
      email: "huntergon@example.com",
      hashedPassword: bcrypt.hashSync('CosplayWizard27')
     
    },
    {
      firstName: "Nami",
      lastName: "Navigator",
      username: "OrangeHairNami",
      email: "orangehairnami@example.com",
      hashedPassword: bcrypt.hashSync('GundamPilotZero')
     
    },
    {
      firstName: "Light",
      lastName: "Yagami",
      username: "DeathNoteLight",
      email: "deathnotelight@example.com",
      hashedPassword: bcrypt.hashSync('HeroicKnight88')
     
    }
   ], { validate: true });
  },


  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Users');
  }
};
