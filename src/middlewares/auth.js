const jwt = require("jsonwebtoken");
const config = require("../config.js");

module.exports = function (req, res, next) {
  const authHeader = req.headers.authorization;

  if (authHeader) {
    var token = req.headers.authorization.split(" ")[1];
    try {
      jwt.verify(token, config.JWT_SECRET, config.JWT_CONFIG);
    } catch (err) {
      return res.status(401).json({
        error: {
          msg: "Failed to authenticate token!",
        },
      });
    }
  } else {
    return res.status(401).json({
      error: {
        msg: "No token!",
      },
    });
  }
  next();
  return;
};
