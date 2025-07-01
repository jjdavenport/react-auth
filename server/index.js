const express = require("express");
const app = express();
const index = require("./routes/index");

const PORT = 3000;

app.use("/", index);

app.listen(PORT, () => {
  console.log(`listening on http://localhost:${PORT}`);
});
