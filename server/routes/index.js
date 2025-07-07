const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const { addAuth, checkUser } = require("../database/query");

router.post("/api/login/", async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res
        .status(400)
        .json({ success: false, message: "username and password required" });
    }
    await checkAuth(username, password);
    res.status(200).json({ success: true });
  } catch {
    console.log("error");
    res.status(500).json({ success: false });
  }
});

router.post("/api/register/check-username", async (req, res) => {
  const { username } = req.body;
  const userExists = await checkUser(username);
  res.json({ available: !userExists });
});

router.post("/api/login/check-username", async (req, res) => {
  const { username } = req.body;
  const userExists = await checkUser(username);
  res.json({ exists: userExists });
});

router.post("/api/register/", async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res
        .status(400)
        .json({ success: false, message: "username and password required" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    await addAuth(username, hashedPassword);
    res.status(200).json({ success: true });
  } catch {
    console.log("error");
    res.status(500).json({ success: false });
  }
});

module.exports = router;
