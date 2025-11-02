const mongoose = require("mongoose");
require("dotenv").config();

const dbURL = process.env.ATLASBD_URL;

async function initDB() {
  try {
    const connect = await mongoose.connect(dbURL);
    console.log("✅ Mongo DB connected");

    return connect;
  } catch (error) {
    console.log(error);
  }
}

module.exports = initDB;
