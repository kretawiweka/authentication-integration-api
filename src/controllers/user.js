const jwt = require("jsonwebtoken");
const config = require("../config.js");

module.exports = function (router) {
  router.post("/login", function (req, res) {
    if (req.body.username === "admin" && req.body.password === "admin") {
      res.json({
        id: 1,
        username: "admin",
        jwt: jwt.sign(
          {
            id: 1,
          },
          config.JWT_SECRET
        ),
      });
    } else {
      res.status(401).json({
        error: {
          message: "Wrong username or password!",
        },
      });
    }
  });

  return router;
};
