'use strict';
const { Musician, Instrument, MusicianInstrument } = require('../models');
const musicianInstruments = [
  {
    musician: { firstName: 'Adam', lastName: 'Appleby' },
    instruments: [{ type: 'piano' }, { type: 'guitar' }],
  },
  {
    musician: { firstName: 'Anton', lastName: 'Martinovic' },
    instruments: [{ type: 'piano' }, { type: 'bass' }],
  },
  {
    musician: { firstName: 'Wilson', lastName: 'Holt' },
    instruments: [{ type: 'cello' }],
  },
  {
    musician: { firstName: 'Marine', lastName: 'Sweet' },
    instruments: [{ type: 'saxophone' }],
  },
  {
    musician: { firstName: 'Georgette', lastName: 'Kubo' },
    instruments: [
      { type: 'drums' },
      { type: 'trumpet' },
      { type: 'saxophone' },
    ],
  },
  {
    musician: { firstName: 'Aurora', lastName: 'Hase' },
    instruments: [{ type: 'violin' }, { type: 'cello' }],
  },
  {
    musician: { firstName: 'Trenton', lastName: 'Lesley' },
    instruments: [{ type: 'piano' }],
  },
  {
    musician: { firstName: 'Camila', lastName: 'Nenci' },
    instruments: [{ type: 'piano' }],
  },
  {
    musician: { firstName: 'Rosemarie', lastName: 'Affini' },
    instruments: [{ type: 'piano' }, { type: 'violin' }],
  },
  {
    musician: { firstName: 'Victoria', lastName: 'Cremonesi' },
    instruments: [{ type: 'violin' }],
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
    for (let index1 = 0; index1 < musicianInstruments.length; index1++) {
      let { musician, instruments } = musicianInstruments[index1];

      let musicianRow = await Musician.findOne({ where: { ...musician } });

      for (let index2 = 0; index2 < instruments.length; index2++) {
        let instrument = await Instrument.findOne({
          where: { ...instruments[index2] },
        });

        if (instrument) {
          console.log('found instrument');
        } else {
          console.log('not found instrument');
        }
        await musicianRow.addInstrument(instrument);
        console.log('association added');
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
    for (let index1 = 0; index1 < musicianInstruments.length; index1++) {
      let { musician, instruments } = musicianInstruments[index1];
      let musicianRow = await Musician.findOne({ where: { ...musician } });
      if (musician) {
        for (let index2 = 0; index2 < instruments.length; index2++) {
          let instrument = await Instrument.findOne({
            where: { ...instruments[index2] },
          });
          await MusicianInstrument.destroy({
            where: { musicianId: musicianRow.id, instrumentId: instrument.id },
          });
        }
      }
    }
  },
};
