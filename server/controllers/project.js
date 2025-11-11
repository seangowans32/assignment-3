import Project from "../models/project.js";

export const createProject = async (req, res) => {
  try {
    if(!req.user || req.user.role !== "admin") {
      return res.status(403).json({ message: "Access denied: Admins only" });
    }

    const project = await Project.create(req.body);
    res.status(201).json(project);

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

export const getProjects = async (req, res) => {
  try {
    const projects = await Project.find().sort({ createdAt: -1 });
    res.json(projects);

  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

export const updateProject = async (req, res) => {
  try {
    if(!req.user || req.user.role !== "admin") {
      return res.status(403).json({ message: "Access denied: Admins only" });
    }

    const updated = await Project.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if(!updated) return res.status(404).json({ message: "Project not found" });

    res.json(updated);

  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

export const deleteProject = async (req, res) => {
  try {
    if(!req.user || req.user.role !== "admin") {
      return res.status(403).json({ message: "Access denied: Admins only" });
    }

    const deleted = await Project.findByIdAndDelete(req.params.id);
    if(!deleted) return res.status(404).json({ message: "Project not found" });

    res.json({ message: "Project deleted successfully" });

  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};