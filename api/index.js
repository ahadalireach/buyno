const express = require("express");
const app = express();
const cors = require("cors");
const dotenv = require("dotenv");
const colors = require("colors");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const connectDB = require("./db/db");
const errorHandler = require("./middleware/error");
const userRoutes = require("./routes/userRoutes");

process.on("uncaughtException", (err) => {
  console.log(`Error: ${err.message}`.underline);
  console.log(`Shutting down the server due to uncaught exception!`);
});

dotenv.config();
connectDB();

app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());
app.use("/uploads", express.static("uploads"));
app.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));

app.use("/test", (req, res) => {
  res.send("Hello world!");
});

app.use("/api/user", userRoutes);

app.use(errorHandler);
const server = app.listen(process.env.PORT, () => {
  console.log(
    `Server is running on http://localhost:${process.env.PORT}`.magenta.bold
      .underline
  );
});

process.on("unhandledRejection", (err) => {
  console.log(`Shutting down the server for: ${err.message}`.underline);
  console.log(`Shutting down the server for unhandled promise rejection!`);

  server.close(() => {
    process.exit(1);
  });
});

module.exports = app;
