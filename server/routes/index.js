const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const passport = require("passport");
const localStrategy = require("passport-local").Strategy;
const { addAuth, checkUser, login, logout } = require("../database/query");

passport.use(
  new localStrategy(async (username, password, done) => {
    try {
      const user = await login(username);

      if (!user) {
        return done(null, false, { message: "incorrect username" });
      }

      const match = await bcrypt.compare(password, user.password);
      if (!match) {
        return done(null, false, { message: "incorrect password" });
      }

      return done(null, user);
    } catch (error) {
      return done(error);
    }
  })
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await logout(id);
    done(null, user);
  } catch (error) {
    done(error);
  }
});

router.get("/login/status", (req, res) => {
  if (req.isAuthenticated()) {
    res.status(200).json({
      loggedIn: true,
      user: req.user,
    });
  } else {
    res.status(200).json({ loggedIn: false });
  }
});

router.post("/login/", (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) return next(err);
    if (!user) {
      return res.status(401).json({ success: false, message: info.message });
    }
    req.logIn(user, (err) => {
      if (err) return next(err);
      return res.status(200).json({ success: true, message: "Logged in" });
    });
  })(req, res, next);
});

router.post("/register/check-username/", async (req, res) => {
  const { username } = req.body;
  const userExists = await checkUser(username);
  res.json({ available: !userExists });
});

router.post("/login/check-username/", async (req, res) => {
  const { username } = req.body;
  const userExists = await checkUser(username);
  res.json({ exists: userExists });
});

router.post("/register/", async (req, res, next) => {
  try {
    const { username, password, confirmPassword } = req.body;
    if (!username || !password || !confirmPassword) {
      return res
        .status(400)
        .json({ success: false, message: "username and password required" });
    }
    if (password !== confirmPassword) {
      res
        .status(400)
        .json({ success: false, message: "passwords do not match" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    await addAuth(username, hashedPassword);
    res.status(200).json({ success: true });
  } catch (error) {
    res.status(500).json({ success: false });
    return next(error);
  }
});

module.exports = router;
