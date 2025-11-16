import express from "express";
import { getOrders, getOrderById } from "../controllers/orderController.js";

const router = express.Router();

// Route to get all orders
router.get("/", getOrders);

// Route to get a single order by ID
router.get("/:id", getOrderById);

export default router;
