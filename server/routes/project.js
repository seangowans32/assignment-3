// import express from 'express';
// import {
//     getAllProjects,
//     getProjectById,
//     updateProject,
//     deleteProject,
//     createProject
// } from '../controllers/project.js'

// import authMiddleware from '../middlewares/auth.js';

// // Router /projects
// const router = express.Router();

// // HTTP Verbs for RESTful APIs GET, POST, PUT, DELETE
// router.get('/', authMiddleware, getAllProjects);
// router.get('/:id', authMiddleware, getProjectById);
// router.post('/', authMiddleware, createProject);
// router.put('/:id', authMiddleware, updateProject);
// router.delete('/:id', authMiddleware, deleteProject);

// export default router;










// import express from "express";
// import { createProject, getProjects, updateProject, deleteProject } from "../controllers/project.js";
// import authMiddleware from "../middlewares/auth.js";

// const router = express.Router();

// router.get("/", getProjects); // public
// router.post("/", authMiddleware, createProject); // protected (admin)
// router.put("/:id", authMiddleware, updateProject);
// router.delete("/:id", authMiddleware, deleteProject);

// export default router;






import express from 'express';
import { createProject, getProjects, updateProject, deleteProject } from '../controllers/project.js';
// import { protect, adminOnly } from '../middlewares/auth.js';

import { protect, adminOnly } from '../middlewares/auth.js';

const router = express.Router();

router.get('/', getProjects); // public
router.post('/', protect, adminOnly, createProject);
router.put('/:id', protect, adminOnly, updateProject);
router.delete('/:id', protect, adminOnly, deleteProject);

export default router;
