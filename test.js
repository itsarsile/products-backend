const postgres = require('postgres');
require('dotenv').config();

const sql = postgres({
  host: process.env.PG_HOST,
  port: process.env.PG_PORT,
  database: process.env.PG_DB,
  username: process.env.PG_USER,
  password: process.env.PG_PASSWORD,
});

async function findId(id) {
  const { data: id } = await sql`SELECT id FROM category WHERE id=${id}`;
  return data;
}

async function rowCount() {
  const id = await findId(1);
  return id;
}

findId(1).then((res) => console.log(res));

// rowCount().then((res) => console.log(res));
