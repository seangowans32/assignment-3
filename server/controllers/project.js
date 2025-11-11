// import ProjectModel from '../models/project.js';

// // Create CRUD operations for Project

// // Get All Projects = Same as db.projects.find()
// export const getAllProjects = async (req, res) => {
//     try {
//         const projects = await ProjectModel.find();
//         res.status(200).json(projects);
//     } catch (error) {
//         res.status(500).json({ message: error.message }); // 500 HTTP status code for server error
//     }
// }

// // Read a project by ID = Same as db.projects.findOne({_id: ObjectId("id")})
// export const getProjectById = async (req, res) => {
//     try {
//         const project = await ProjectModel.findById(req.params.id);
//         if (!project) {
//             return res.status(404).json({ message: 'Project not found' }); // 404 HTTP status code for not found
//         }
//         res.status(200).json(project);
//     } catch (error) {
//         res.status(500).json({ message: error.message }); // 500 HTTP status code for server error
//     }
// }

// // Create a new project = Same as db.projects.insertOne()
// export const createProject = async (req, res) => {
//     try {
//         const newProject = new ProjectModel(req.body);
//         const savedProject = await newProject.save();
//         res.status(201).json(savedProject); // 201 HTTP status code for created
//     } catch (error) {
//         res.status(500).json({ message: error.message }); // 500 HTTP status code for server error
//     }
// }

// // Update a project by ID = Same as db.projects.updateOne({_id: ObjectId("id")}, {$set: {...}})
// export const updateProject = async (req, res) => {
//     try {
//         const updatedProject = await ProjectModel.findByIdAndUpdate(req.params.id,req.body, {
//             new: true
//         });

//         if (!updatedProject){
//             return res.status(404).json({ message: 'Project not found' }); // 404 HTTP status code for not found
//         }

//         res.status(200).json(updatedProject);
//     } catch (error) {
//        res.status(500).json({ message: error.message }); // 500 HTTP status code for server error
//     }
// }

// // Delete a project by ID = Same as db.projects.deleteOne({_id: ObjectId("id")})
// export const deleteProject = async (req, res) => {
//     try {
//         const deletedProject = await ProjectModel.findByIdAndDelete(req.params.id);

//         if (!deletedProject){
//             return res.status(404).json({ message: 'Project not found' }); // 404 HTTP status code for not found
//         }

//         res.status(200).json({ message: 'Project deleted successfully' });
//     } catch (error) {
//         res.status(500).json({ message: error.message }); // 500 HTTP status code for server error
//     }
// }














// import Project from "../models/project.js";

// // CREATE
// export const createProject = async (req, res) => {
//   try {
//     if(req.user.role !== "admin") {
//         return res.status(403).json({ message: "Access denied: Admins only" });
//     }

//     const project = await Project.create(req.body);
//     res.status(201).json(project);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: "Server error" });
//   }
// };

// // READ ALL
// export const getProjects = async (req, res) => {
//   try {
//     if(req.user.role !== "admin") {
//         return res.status(403).json({ message: "Access denied: Admins only" });
//     }

//     const projects = await Project.find().sort({ createdAt: -1 });
//     res.json(projects);
//   } catch (err) {
//     res.status(500).json({ message: "Server error" });
//   }
// };

// // UPDATE
// export const updateProject = async (req, res) => {
//   try {
//     if(req.user.role !== "admin") {
//         return res.status(403).json({ message: "Access denied: Admins only" });
//     }

//     const updated = await Project.findByIdAndUpdate(req.params.id, req.body, { new: true });
//     res.json(updated);
//   } catch (err) {
//     res.status(500).json({ message: "Server error" });
//   }
// };

// // DELETE
// export const deleteProject = async (req, res) => {
//   try {
//     await Project.findByIdAndDelete(req.params.id);
//     res.json({ message: "Project deleted" });
//   } catch (err) {
//     res.status(500).json({ message: "Server error" });
//   }
// };









import Project from "../models/project.js";

// CREATE — Admin only
export const createProject = async (req, res) => {
  try {
    if (!req.user || req.user.role !== "admin") {
      return res.status(403).json({ message: "Access denied: Admins only" });
    }

    const project = await Project.create(req.body);
    res.status(201).json(project);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// READ ALL — Public (anyone can see)
export const getProjects = async (req, res) => {
  try {
    const projects = await Project.find().sort({ createdAt: -1 });
    res.json(projects);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

// UPDATE — Admin only
export const updateProject = async (req, res) => {
  try {
    if (!req.user || req.user.role !== "admin") {
      return res.status(403).json({ message: "Access denied: Admins only" });
    }

    const updated = await Project.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ message: "Project not found" });

    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

// DELETE — Admin only
export const deleteProject = async (req, res) => {
  try {
    if (!req.user || req.user.role !== "admin") {
      return res.status(403).json({ message: "Access denied: Admins only" });
    }

    const deleted = await Project.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Project not found" });

    res.json({ message: "Project deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};
