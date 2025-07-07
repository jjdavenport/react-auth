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

module.exports = { addAuth, checkUser };
