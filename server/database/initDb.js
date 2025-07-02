require("dotenv").config();
const { Client } = require("pg");

const HOST = process.env.HOST;
const USER = process.env.USER;
const DATABASE = process.env.DATABASE;
const PASSWORD = process.env.PASSWORD;
const PORT = process.env.DB_PORT;

const SQL = `
CREATE TABLE IF NOT EXISTS users (
   id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
   username VARCHAR ( 255 ),
   password VARCHAR ( 255 )
);
`;

const initDb = async () => {
  console.log("seeding");
  const client = new Client({
    connectionString: `postgressql://${USER}:${PASSWORD}@${HOST}:${PORT}/${DATABASE}`,
  });
  await client.connect();
  await client.query(SQL);
  await client.end();
  console.log("done");
};

initDb();
