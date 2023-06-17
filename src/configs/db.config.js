const postgres = require('postgres');
require('dotenv').config();

const sql = postgres({
  host: process.env.PG_HOST,
  port: process.env.PG_PORT,
  database: process.env.PG_DB,
  username: process.env.PG_USER,
  password: process.env.PG_PASSWORD,
});

module.exports = sql;
