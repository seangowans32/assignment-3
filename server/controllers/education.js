import Education from "../models/education.js";

// CREATE
export const createEducation = async (req, res) => {
  try {
    if (req.user.role !== "admin")
      return res.status(403).json({ message: "Access denied: Admins only" });

    const edu = await Education.create(req.body);
    res.status(201).json(edu);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

// READ ALL
export const getEducation = async (req, res) => {
  try {
    const edu = await Education.find().sort({ createdAt: -1 });
    res.json(edu);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};
