import mongoose from "mongoose";
import { DB_NAME } from "../../constants.js";

const connectDB = async () => {
  try {
    await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`);
    console.log("MongoDB database connected!!");
  } catch (error) {
    console.error(`Error connecting Database: ${error.message}`);
    throw new Error("Database connection failed");
  }
};

export default connectDB;
