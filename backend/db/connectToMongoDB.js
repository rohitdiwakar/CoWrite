import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const connectToMongoDB = async () => {
  try {
    const uri = process.env.MONGO_DB_URI;
    // console.log(process.env);
    // console.log(uri);
    if (!uri) {
      throw new Error("MONGO_DB_URI is undefined. Check your .env file.");
    }

    console.log("Connecting to MongoDB with URI:"); // For debugging
    await mongoose.connect(uri);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.log("Error connecting to MongoDB:", error.message);
  }
};

export default connectToMongoDB;
