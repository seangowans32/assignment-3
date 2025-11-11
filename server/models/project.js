import mongoose from "mongoose";

const projectSchema = new mongoose.Schema({
  title: { type: String, required: [true, "Project title is required"] },
  link: { type: String, required: [true, "Project link (URL) is required"] },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("Project", projectSchema);