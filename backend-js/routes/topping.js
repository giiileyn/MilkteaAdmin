import express from "express";
import { createTopping, getToppings, updateTopping, deleteTopping } from "../controllers/toppingController.js";

const router = express.Router();

router.post("/", createTopping);
router.get("/", getToppings);
router.put("/:id", updateTopping);
router.delete("/:id", deleteTopping);

export default router;
