import mongoose from "mongoose";

mongoose.connect(
  "mongodb+srv://diwakarr67:Rohitd12345@cluster0.mgz82.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
);
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
