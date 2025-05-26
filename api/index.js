const express = require("express");
const app = express();
const cors = require("cors");
const dotenv = require("dotenv");
const colors = require("colors");
const connectDB = require("./db/db");

process.on("uncaughtException", (err) => {
  console.log(`Error: ${err.message}`.underline);
  console.log(`Shutting down the server due to uncaught exception!`);
});

dotenv.config();
connectDB();

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use(express.json());

app.use("/test", (req, res) => {
  res.send("Hello world!");
});
const server = app.listen(process.env.PORT, () => {
  console.log(
    `Server is running on http://localhost:${process.env.PORT}`.magenta.bold
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
