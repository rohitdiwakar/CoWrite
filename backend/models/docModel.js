import mongoose from "mongoose";

mongoose.connect(
  "mongodb+srv://diwakarr67:Rohitd12345@cluster0.mgz82.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
);
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
