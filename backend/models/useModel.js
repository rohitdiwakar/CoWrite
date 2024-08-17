import mongoose from "mongoose";

import dotenv from "dotenv";

dotenv.config();
mongoose.connect(process.env.MONGO_DB_URI);
// mongoose.connect("mongodb://127.0.0.1:27017/docs");

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  phone: String,
  username: String,
  isBlocked: {
    type: Boolean,
    default: false,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const User = mongoose.model("User", userSchema);
export default User;
