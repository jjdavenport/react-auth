const express = require("express");
const app = express();
const index = require("./routes/index");
const session = require("express-session");
const passport = require("passport");

const PORT = process.env.PORT;

app.use(session({ secret: "cats", resave: false, saveUninitialized: false }));
app.use(passport.session());
app.use(express.json());

app.use("/api/", index);

app.listen(PORT, () => {
  console.log(`listening on http://localhost:${PORT}`);
});
