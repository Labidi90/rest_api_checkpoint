require("dotenv").config({ path: __dirname + "/.env" });
const mongoose = require("mongoose");

const connectDatabase = async () => {
  // mongoose
  //     .connect(process.env.MONGO_URI)
  // .then(() => console.log("connected to the database"))
  // .catch((error) => {
  //   console.error("couldn't connect to the database", error);
  //   process.exit(1);
  // });
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("connected to the database");
  } catch (error) {
    console.error("couldn't connect to the database", error);
  }
};

module.exports = connectDatabase;
