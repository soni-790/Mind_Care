import mongoose from "mongoose";

const resourceSchema = new mongoose.Schema({
  title: String,
  link: String,
  category: String
}, { timestamps: true });

export default mongoose.model("Resource", resourceSchema);
