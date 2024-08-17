import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();
mongoose.connect(process.env.MONGO_DB_URI);
// mongoose.connect("mongodb://127.0.0.1:27017/docs");

const docSchema = mongoose.Schema({
  title: String,
  content: {
    type: String,
    default: "",
  },
  uploadedBy: String,
  date: {
    type: Date,
    default: Date.now,
  },
  lastUpdate: {
    type: Date,
    default: Date.now,
  },
});

const Document = mongoose.model("Document", docSchema);
export default Document;
