const express = require("express");
const http = require("http");
const cors = require("cors");
const app = express();
const router = express.Router();
const bodyParser = require("body-parser");
const config = require("./config");
const PORT = config.PORT;

const server = http.createServer(app);
app.use(bodyParser.json());
app.use(cors());
app.use("/chat", require("./controllers/chat")(router, server, cors));
app.use("/api", require("./middlewares/auth.js"));
app.use("/api", require("./controllers/helloWorld.js")(router));
app.use("/", require("./controllers/user.js")(router));

server.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
