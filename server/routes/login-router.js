const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth-controller");

router.get("/status/", authController.loginStatus);
router.post("/", authController.loginUser);
router.post("/check-username/", authController.checkLogin);

module.exports = router;
