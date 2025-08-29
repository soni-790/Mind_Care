import mongoose from "mongoose";

const meditationSchema = new mongoose.Schema({
  title: String,
  description: String,
  audioUrl: String
}, { timestamps: true });

export default mongoose.model("Meditation", meditationSchema);
