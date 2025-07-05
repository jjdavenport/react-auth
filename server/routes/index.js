const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const { addAuth } = require("../database/query");

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

router.post("/api/check-username", (req,res) => {
  
})

router.post("/api/register/", async (req, res) => {
  try {
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    await addAuth(username, hashedPassword);
    res.status(200).json({ success: true });
  } catch {
    console.log("error");
    res.status(500).json({ success: false });
  }
});

module.exports = router;
