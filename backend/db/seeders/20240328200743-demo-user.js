'use strict';
const { User } = require('../models');
const bcrypt = require("bcryptjs");

/** @type {import('sequelize-cli').Migration} */
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
      hashedPassword: bcrypt.hashSync('MoonLight00')
      
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
      
    },
    {
      firstName: "Tanjiro",
      lastName: "Kamado",
      username: "DemonSlayerTanjiro",
      email: "demonslayertanjiro@example.com",
      hashedPassword: bcrypt.hashSync('HashiraLegend20')
    },
    {
      firstName: "Nezuko",
      lastName: "Kamado",
      username: "DemonNezuko",
      email: "demonnezuko@example.com",
      hashedPassword: bcrypt.hashSync('BloodDemonArt7')
    },
    {
      firstName: "Eren",
      lastName: "Yeager",
      username: "AttackTitanEren",
      email: "attacktitaneren@example.com",
      hashedPassword: bcrypt.hashSync('FoundingTitan35')
    },
    {
      firstName: "Levi",
      lastName: "Ackerman",
      username: "CaptainLevi",
      email: "captainlevi@example.com",
      hashedPassword: bcrypt.hashSync('SurveyCorps10')
    },
    {
      firstName: "Saitama",
      lastName: "Hero",
      username: "OnePunchManSaitama",
      email: "onepunchmansaitama@example.com",
      hashedPassword: bcrypt.hashSync('SeriousPunch99')
    },
    {
      firstName: "Erza",
      lastName: "Scarlet",
      username: "TitaniaErza",
      email: "titaniaerza@example.com",
      hashedPassword: bcrypt.hashSync('RequipQueen18')
    },
    {
      firstName: "Guts",
      lastName: "Berserk",
      username: "BlackSwordsmanGuts",
      email: "blackswordsman@example.com",
      hashedPassword: bcrypt.hashSync('BerserkerArmor52')
    },
    {
      firstName: "Spike",
      lastName: "Spiegel",
      username: "CowboyBebopSpike",
      email: "cowboybebopspike@example.com",
      hashedPassword: bcrypt.hashSync('RedDragonSyndicate11')
    },
    {
      firstName: "Yusuke",
      lastName: "Urameshi",
      username: "SpiritDetectiveYusuke",
      email: "spiritdetective@example.com",
      hashedPassword: bcrypt.hashSync('ReiGun20')
    },
    {
      firstName: "Roy",
      lastName: "Mustand",
      username: "FlameAlchemist",
      email: "flamealchemistroy@example.com",
      hashedPassword: bcrypt.hashSync('mustache12')
    },
    {
      firstName: "Alphonse",
      lastName: "Elric",
      username: "ArmorAlphonse",
      email: "armoralphonse@example.com",
      hashedPassword: bcrypt.hashSync('TransmutationCircle21')
    },
    {
      firstName: "Kirito",
      lastName: "Kirigaya",
      username: "BlackSwordsmanKirito",
      email: "blackswordkirito@example.com",
      hashedPassword: bcrypt.hashSync('DualBlades42')
    },
    {
      firstName: "Rintarou",
      lastName: "Okabe",
      username: "MadScientistRintarou",
      email: "madscientist@example.com",
      hashedPassword: bcrypt.hashSync('SteinsGate5')
    },
    {
      firstName: "Holo",
      lastName: "Wise",
      username: "WiseWolfHolo",
      email: "wiseholowolf@example.com",
      hashedPassword: bcrypt.hashSync('SpiceAndWolf99')
    },
    {
      firstName: "Tohru",
      lastName: "Honda",
      username: "FruitBasketTohru",
      email: "fruitbaskettohru@example.com",
      hashedPassword: bcrypt.hashSync('Zodiac12')
    },
    {
      firstName: "Sebastian",
      lastName: "Michaelis",
      username: "BlackButlerSebastian",
      email: "blackbutler@example.com",
      hashedPassword: bcrypt.hashSync('DemonButler21')
    },
    {
      firstName: "Kaneki",
      lastName: "Ken",
      username: "TokyoGhoulKaneki",
      email: "tokyoghoul@example.com",
      hashedPassword: bcrypt.hashSync('HalfGhoul77')
    },
    {
      firstName: "Rem",
      lastName: "Death",
      username: "ShinigamiRem",
      email: "shinigamirem@example.com",
      hashedPassword: bcrypt.hashSync('DeathNote44')
    },
    {
      firstName: "Inuyasha",
      lastName: "Hanyo",
      username: "HalfDemonInuyasha",
      email: "halfdemoninuyasha@example.com",
      hashedPassword: bcrypt.hashSync('Tetsusaiga66')
    },
    {
      firstName: "Killua",
      lastName: "Zoldyck",
      username: "AssassinKillua",
      email: "assassinkillua@example.com",
      hashedPassword: bcrypt.hashSync('Godspeed45')
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
    options.tableName = 'Users';
    return queryInterface.bulkDelete(options);
  }
};
