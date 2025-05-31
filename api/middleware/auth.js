const errorHandler = require("../utils/errorHandler");
const catchErrorAsync = require("./catchErrorAsync");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

exports.isAuthenticated = catchErrorAsync(async (req, res, next) => {
  const { token } = req.cookies;

  if (!token) {
    return next(new errorHandler("Please login to continue", 401));
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

  const user = await User.findById(decoded.id);
  if (!user) {
    return next(new errorHandler("User not found. Please login again.", 401));
  }

  req.user = user;
  next();
});
