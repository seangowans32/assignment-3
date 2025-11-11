import express from "express";
import { createContact, getContacts } from "../controllers/contact.js";
import { protect, adminOnly } from "../middlewares/auth.js";

const router = express.Router();

router.post("/", createContact); // public form
router.get("/", protect, adminOnly, getContacts); // admin view

export default router;
