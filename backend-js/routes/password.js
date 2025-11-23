// routes/password.js
import express from "express";
import { updatePassword } from "../controllers/authController.js";

const router = express.Router();

// PATCH /password/:userId
router.patch("/:userId", updatePassword);

export default router;
