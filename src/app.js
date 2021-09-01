const express = require("express");
const main = require("./controller/main");

const app = express();
const PORT = 3000;

app.listen(PORT, () => console.log(`app listening on port ${PORT}`));
app.get("/", (req, res) =>
  res.send('<h2 style="text-align: center"> API FACINGHOAX </h2>')
);

app.get("/api/login", function (req, res) {
  var result = main.login();
  res.status(200).json(result);
});
