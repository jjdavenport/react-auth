const { checkUser, addAuth } = require("../database/queries");
const bcrypt = require("bcryptjs");
const passport = require("passport");

exports.registerUser = async (req, res, next) => {
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
};

exports.checkLogin = async (req, res) => {
  const { username } = req.body;
  const userExists = await checkUser(username);
  res.json({ exists: userExists });
};

exports.checkRegister = async (req, res) => {
  const { username } = req.body;
  const userExists = await checkUser(username);
  res.json({ available: !userExists });
};

exports.loginUser = async (req, res, next) => {
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
};

exports.loginStatus = async (req, res) => {
  if (req.isAuthenticated()) {
    res.status(200).json({
      loggedIn: true,
      user: req.user,
    });
  } else {
    res.status(200).json({ loggedIn: false });
  }
};
