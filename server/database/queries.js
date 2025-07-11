const pool = require("./pool");

const addAuth = async (username, password) => {
  await pool.query(`INSERT INTO users (username, password) VALUES ($1, $2)`, [
    username,
    password,
  ]);
};

const checkUser = async (username) => {
  const { rows } = await pool.query(
    "SELECT 1 FROM users WHERE username = $1 LIMIT 1",
    [username]
  );
  return rows.length > 0;
};

const login = async (username) => {
  const { rows } = await pool.query("SELECT * FROM users WHERE username = $1", [
    username,
  ]);
  return rows[0];
};

const logout = async (id) => {
  const { rows } = await pool.query("SELECT * FROM users WHERE id = $1", [id]);
  return rows[0];
};

const checkAuth = async (username) => {
  const { rows } = await pool.query("SELECT * FROM users WHERE username = $1", [
    [username],
  ]);
  return rows;
};

module.exports = { addAuth, checkUser, checkAuth, logout, login };
