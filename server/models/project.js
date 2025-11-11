// import mongoose from 'mongoose';

// const projectSchema = new mongoose.Schema({
//     name: String,
//     description: String,
//     startDate: Date,
//     endDate: Date
// });

// export default mongoose.model('Project', projectSchema);




// import mongoose from "mongoose";

// const projectSchema = new mongoose.Schema({
//   title: { type: String, required: true },
//   description: { type: String },
//   link: { type: String },
//   imageUrl: { type: String }, // optional for banner images
//   createdAt: { type: Date, default: Date.now },
// });

// export default mongoose.model("Project", projectSchema);





// import mongoose from "mongoose";

// const projectSchema = new mongoose.Schema({
//   title: { type: String, required: true },
//   link: { type: String, required: true },
//   createdAt: { type: Date, default: Date.now },
// });

// export default mongoose.model("Project", projectSchema);




import mongoose from "mongoose";

const projectSchema = new mongoose.Schema({
  title: { type: String, required: [true, "Project title is required"] },
  link: { type: String, required: [true, "Project link (URL) is required"] },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("Project", projectSchema);
