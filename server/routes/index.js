const express = require("express");
const router = express.Router();

router.post("/logout/", async (req, res, next) => {
  req.logOut((err) => {
    if (err) {
      return next(err);
    }
    res.json({ message: "logged out" });
  });
});

module.exports = router;
