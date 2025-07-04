const pool = require("./pool");

const addAuth = async (username, password) => {
  await pool.query(`INSERT INTO users (username, password) VALUES ($1, $2)`, [
    username,
    password,
  ]);
};

const getUsers = async () => {
  const { rows } = await pool.query("SELECT username FROM users");
  return rows;
};

const checkAuth = async () => {
  const { rows } = await pool.query("");
  return rows;
};

module.exports = { addAuth, getUsers, checkAuth };
