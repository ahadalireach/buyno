const mongoose = require("mongoose");

const connectDatabase = () => {
  mongoose
    .connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then((data) => {
      console.log(
        `mongod connected with server: ${data.connection.host}`.green.bold
      );
    });
};

module.exports = connectDatabase;
