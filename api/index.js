const express = require("express");
const app = express();
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();
const colors = require("colors");
const connectDB = require("./db/db");
const cloudinary = require("cloudinary");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const userRoutes = require("./routes/userRoutes");
const errorHandler = require("./middleware/error");
const eventRoutes = require("./routes/eventRoutes");
const orderRoutes = require("./routes/orderRoutes");
const sellerRoutes = require("./routes/sellerRoutes");
const messageRoutes = require("./routes/messageRoutes");
const productRoutes = require("./routes/productRoutes");
const paymentRoutes = require("./routes/paymentRoutes");
const withdrawRoutes = require("./routes/withdrawRoutes");
const couponCodeRoutes = require("./routes/couponCodeRoutes");
const conversationRoutes = require("./routes/conversationRoutes");

process.on("uncaughtException", (err) => {
  console.log(`Error: ${err.message}`.underline);
  console.log(`Shutting down the server due to uncaught exception!`);
});

connectDB();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })
);

app.use(express.json({ limit: "10mb" }));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true, limit: "10mb" }));

app.get("/", (req, res) => {
  res.send("API is running...");
});
app.use("/api/users", userRoutes);
app.use("/api/sellers", sellerRoutes);
app.use("/api/products", productRoutes);
app.use("/api/events", eventRoutes);
app.use("/api/couponCodes", couponCodeRoutes);
app.use("/api/payments", paymentRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/withdraws", withdrawRoutes);
app.use("/api/conversations", conversationRoutes);
app.use("/api/messages", messageRoutes);

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
