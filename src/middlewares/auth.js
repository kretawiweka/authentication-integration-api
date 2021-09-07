const jwt = require("jsonwebtoken");
const config = require("../config.js");

module.exports = function (req, res, next) {
  const authHeader = req.headers.authorization;

  if (authHeader) {
    try {
      req.user = jwt.verify(req.headers["authorization"], config.JWT_SECRET);
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
