const express = require("express");
const app = express();
const indexRouter = require("./routes/index");
const loginRouter = require("./routes/login-router");
const registerRouter = require("./routes/register-router");
const session = require("express-session");
const passport = require("passport");
const authenticate = require("./middleware/authenticate");
const cors = require("cors");
require("./passport-config");

const PORT = process.env.PORT;

app.use(session({ secret: "cats", resave: false, saveUninitialized: false }));
app.use(passport.session());
app.use(express.json());

app.use(
  cors({
    origin: "https://jjdavenport.github.io",
    credentials: true,
  })
);

app.use("/api/login/", loginRouter);
app.use("/api/register/", registerRouter);

app.use(authenticate);

app.use("/api/authenticated/", indexRouter);

app.listen(PORT, () => {
  console.log(`listening on http://localhost:${PORT}`);
});
