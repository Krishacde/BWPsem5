// require("dotenv").config();

// const express = require("express");

// // const cors = require("cors");
// const connectDB = require("./config/db");

// const app = express();
// const User = require("./models/User");


// // Connect Database
// connectDB();





// // // Middleware
// // app.use(cors());
// // app.use(express.json());
// // app.use(express.urlencoded({ extended: true }));

// // Test Route
// app.get("/", (req, res) => {
//   res.send("🚀 Server is running...");
// });

// // Example API Route
// app.get("/api", (req, res) => {
//   res.json({
//     success: true,
//     message: "API is working!"
//   });
// });


// // Server
// const PORT = process.env.PORT || 5000;

// app.listen(PORT, () => {
//   console.log(`✅ Server running on http://localhost:${PORT}`);
// });
require("dotenv").config();

const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const connectDB = require("./config/db");

const authRoutes = require("./routes/auth");
const errorHandler = require("./middleware/errorHandler");

const app = express();


// =========================
// DATABASE
// =========================

connectDB();


// =========================
// MIDDLEWARE
// =========================

app.use(cors());

app.use(express.json());

app.use(express.urlencoded({
  extended: true
}));


// Morgan HTTP logging
app.use(morgan("dev"));


// =========================
// ROUTES
// =========================

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Auth server is running"
  });
});

app.get("/api", (req, res) => {
  res.json({
    success: true,
    message: "API is working"
  });
});

app.use("/api/auth", authRoutes);


// =========================
// 404 ROUTE
// =========================

app.use((req, res, next) => {
  const error = new Error(
    `Route not found: ${req.method} ${req.originalUrl}`
  );

  error.statusCode = 404;

  next(error);
});


// =========================
// ERROR HANDLER
// =========================

app.use(errorHandler);


// =========================
// SERVER
// =========================

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(
    `Server running on http://localhost:${PORT}`
  );
});