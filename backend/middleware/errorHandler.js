const errorHandler = (err, req, res, next) => {
  // Show complete error in terminal
  console.error("\n========== ERROR ==========");
  console.error("Message:", err.message);
  console.error("Stack:", err.stack);
  console.error("===========================\n");

  let statusCode = err.statusCode || 500;
  let message = err.message || "Internal Server Error";

  // MongoDB duplicate key error
  if (err.code === 11000) {
    statusCode = 400;

    const field = Object.keys(err.keyPattern)[0];

    message = `${field} already exists`;
  }

  // Mongoose validation error
  if (err.name === "ValidationError") {
    statusCode = 400;

    const errors = Object.values(err.errors).map(
      (error) => error.message
    );

    message = errors.join(", ");
  }

  // Invalid MongoDB ObjectId
  if (err.name === "CastError") {
    statusCode = 400;
    message = "Invalid ID";
  }

  // JWT errors
  if (err.name === "JsonWebTokenError") {
    statusCode = 401;
    message = "Invalid token";
  }

  if (err.name === "TokenExpiredError") {
    statusCode = 401;
    message = "Token has expired";
  }

  res.status(statusCode).json({
    success: false,
    message
  });
};

module.exports = errorHandler;