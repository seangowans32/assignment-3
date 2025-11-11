import express from "express";
import { createEducation, getEducation } from "../controllers/education.js";
import { protect, adminOnly } from "../middlewares/auth.js";

const router = express.Router();

router.get("/", getEducation);
router.post("/", protect, adminOnly, createEducation);

export default router;
