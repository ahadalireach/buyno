const errorHandler = require("../utils/errorHandler");

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.message = err.message || "Internal server Error";

  // Image upload error
  if (err.name === "LIMIT_FILE_SIZE") {
    return next(new errorHandler("Each image must be less than 5MB.", 400));
  }

  // wrong mongodb id error
  if (err.name === "CastError") {
    const message = `Resource not found. Invalid ID: ${err.path}.`;
    err = new errorHandler(message, 400);
  }

  // Duplicate key error
  if (err.code === 11000) {
    const message = `Duplicate key entered: ${Object.keys(err.keyValue)}.`;
    err = new errorHandler(message, 400);
  }

  // wrong jwt error
  if (err.name === "JsonWebTokenError") {
    const message = `Invalid authentication token. Please log in again.`;
    err = new errorHandler(message, 400);
  }

  // jwt expired
  if (err.name === "TokenExpiredError") {
    const message = `Authentication token has expired. Please log in again.`;
    err = new errorHandler(message, 400);
  }

  res.status(err.statusCode).json({
    success: false,
    message: err.message,
  });
};
