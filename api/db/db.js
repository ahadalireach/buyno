const mongoose = require("mongoose");

const connectDatabase = () => {
  mongoose
    .connect(process.env.MONGO_URI)
    .then((data) => {
      console.log(
        `mongod connected with server: ${data.connection.host}`.yellow.bold
          .underline
      );
    })
    .catch((err) => {
      console.error("Database connection failed:", err.message);
    });
};

module.exports = connectDatabase;
