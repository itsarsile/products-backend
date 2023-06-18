/* eslint-disable import/no-extraneous-dependencies */
const knex = require('knex')({
  client: 'pg',
  connection: {
    filename: '../configs/db.config.js',
  },
});

module.exports = knex;
