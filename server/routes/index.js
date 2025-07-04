const express = require("express");
const router = express.Router();
const { addAuth, getUsers } = require("../database/query");

router.get("/api/register/", async (req, res) => {
  try {
    const users = await getUsers();
    res.json(users);
    console.log(users);
  } catch {
    console.log("errors");
  }
});

router.post("/api/login/", async (req, res) => {
  try {
    const { username, password } = req.body;
    await checkAuth(username, password);
    res.status(200).json({ success: true });
  } catch {
    console.log("error");
    res.status(500).json({ success: false });
  }
});

router.post("/api/register/", async (req, res) => {
  try {
    const { username, password } = req.body;
    await addAuth(username, password);
    res.status(200).json({ success: true });
  } catch {
    console.log("error");
    res.status(500).json({ success: false });
  }
});

module.exports = router;
