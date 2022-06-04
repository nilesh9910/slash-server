const mongoose = require("mongoose");
const { SERVER_DB_URI } = require("../constants/constant");

const connectDB = () => {
  try {
    mongoose.connect(SERVER_DB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = { connectDB, mongoose };
