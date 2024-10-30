'use strict';
const { Band, Musician } = require('../models');
const bandMusicians = [
  {
    name: 'The Falling Box',
    musicians: [
      { firstName: 'Adam', lastName: 'Appleby' },
      { firstName: 'Anton', lastName: 'Martinovic' },
      { firstName: 'Wilson', lastName: 'Holt' },
    ],
  },
  {
    name: 'America The Piano',
    musicians: [
      { firstName: 'Marine', lastName: 'Sweet' },
      { firstName: 'Georgette', lastName: 'Kubo' },
    ],
  },
  {
    name: 'Loved Autumn',
    musicians: [{ firstName: 'Aurora', lastName: 'Hase' }],
  },
  {
    name: 'Playin Sound',
    musicians: [
      { firstName: 'Trenton', lastName: 'Lesley' },
      { firstName: 'Camila', lastName: 'Nenci' },
    ],
  },
  {
    name: 'The King River',
    musicians: [
      { firstName: 'Rosemarie', lastName: 'Affini' },
      { firstName: 'Victoria', lastName: 'Cremonesi' },
    ],
  },
];
module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    for (let index = 0; index < bandMusicians.length; index++) {
      let { name, musicians } = bandMusicians[index];
      console.log(name);

      let band = await Band.findOne({ where: { name } });
      for (let musician of musicians) {
        await band.createMusician(musician);
      }
    }
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    for (let index = 0; index < bandMusicians.length; index++) {
      let { name, musicians } = bandMusicians[index];
      let band = await Band.findOne({ where: { name } });
      if (band) {
        for (let index2 = 0; index2 < musicians.length; index2++) {
          await Musician.destroy({
            where: { ...musicians[index2], bandId: band.id },
          });
        }
        await band.destroy();
      }
    }
  },
};
