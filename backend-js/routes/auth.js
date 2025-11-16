// routes/authRoutes.js
import express from "express";
import multer from "multer";
import { registerUser } from "../controllers/authController.js";
import { loginUser } from "../controllers/authController.js";


const router = express.Router();
const upload = multer({ dest: "uploads/" }); // temporary file storage

router.post("/register", upload.single("avatar"), registerUser);
router.post("/login", loginUser);
export default router;
