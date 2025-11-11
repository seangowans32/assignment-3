import mongoose from "mongoose";

const educationSchema = new mongoose.Schema({
  type: { type: String, enum: ["education", "qualification"], required: true },
  title: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("Education", educationSchema);