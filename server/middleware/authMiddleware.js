// server/middleware/authMiddleware.js

const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

// Middleware for protected routes
const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      req.user = await User.findById(decoded.id).select("-password");
      next();
    } catch (err) {
      res.status(401).json({ message: "Not authorized, invalid token" });
    }
  } else {
    res.status(401).json({ message: "Not authorized, no token" });
  }
};

// Middleware to check for HR role
const isHR = (req, res, next) => {
  if (req.user && req.user.role === "HR") {
    next();
  } else {
    res.status(403).json({ message: "Access denied. HR only." });
  }
};
module.exports = { protect, isHR }