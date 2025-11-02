const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports.authMiddleware = function (req, res, next) {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ message: "Token missing" });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decode) => {
    if (err) {
      if (err.name === "TokenExpiredError") {
        return res.status(401).json({ message: "Token Expired" });
      }

      return res.status(401).json({ message: "Invalid Token" });
    }

    req.user = decode;
    next();
  });
};

module.exports.requireAdmin = function (req, res, next) {
  if (req.user.role !== "admin") {
    return res.status(403).json({ message: "Forbidden" });
  }
  next();
};
