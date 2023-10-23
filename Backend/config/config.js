const mongoose = require("mongoose");

const connectDb = async () => {
  try {
    const conn = await mongoose
      .connect(
        `mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@cluster0.62w7s.mongodb.net/${process.env.DATABASE_NAME}?retryWrites=true&w=majority`
      )
      .then(() => console.log("Database Connected"));
  } catch (error) {
    console.log(`Error : ${error.message}`);
    process.exit(1);
  }
};
module.exports = connectDb;