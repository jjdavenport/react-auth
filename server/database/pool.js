require("dotenv").config();
const { Pool } = require("pg");

const HOST = process.env.HOST;
const USER = process.env.USER;
const DATABASE = process.env.DATABASE;
const PASSWORD = process.env.PASSWORD;
const PORT = process.env.DB_PORT;

module.exports = new Pool({
  host: HOST,
  user: USER,
  DATABASE: DATABASE,
  password: PASSWORD,
  port: PORT,
});
