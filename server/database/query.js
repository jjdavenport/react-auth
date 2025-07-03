const pool = require("./pool");

const addAuth = async (username, password) => {
  await pool.query(`INSERT INTO users (username, password) VALUES ($1, $2)`, [
    username,
    password,
  ]);
};

module.exports = { addAuth };
