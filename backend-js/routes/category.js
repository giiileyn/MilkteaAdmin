import express from "express";
import { createCategory, getAllCategories } from "../controllers/categoryController.js";

const router = express.Router();

router.post("/", createCategory);  // Create a new category
router.get("/", getAllCategories); // Get all categories

export default router;