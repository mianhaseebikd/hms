import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";



const connectDB = async () => {
  try {
    const dbConnection = await mongoose.connect(`${process.env.MONGODB_URL}/${DB_NAME}`);
    console.log("✅ Mongoose Database connected at:", dbConnection.connection.host);
  } catch (error) {
    console.error("❌ Mongoose Database connection error:", error);
    process.exit(1);
  }
};



export default connectDB;