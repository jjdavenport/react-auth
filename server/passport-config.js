const bcrypt = require("bcryptjs");
const passport = require("passport");
const localStrategy = require("passport-local").Strategy;
const { login, logout } = require("./database/queries");

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

module.exports = passport;
