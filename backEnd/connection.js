const mongoose = require("mongoose");
require("dotenv").config();
// DB_NAME,
const { DB_HOST, DB_PASSWORD, DB_USER, DB_PORT, DB_NAME } = process.env;

const connect = async () => {
  try {
    await mongoose.connect(`mongodb://127.0.0.1:27017/${DB_NAME}`);
    // await mongoose.connect(
    //   `mongodb://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}`
    // );
    console.log("Connected to MongoDB Successfully");
  } catch (e) {
    console.log(`Error connecting to MongoDB: ${e.message}`);
  }
};

module.exports = connect;
