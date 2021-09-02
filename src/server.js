const express = require("express");
const cors = require("cors");
const app = express();
const router = express.Router();
const bodyParser = require("body-parser");

app.use(bodyParser.json());
app.use(cors());
app.use("/api", require("./middlewares/auth.js"));
app.use("/api", require("./controllers/helloWorld.js")(router));
app.use("/", require("./controllers/user.js")(router));

module.exports = app;
