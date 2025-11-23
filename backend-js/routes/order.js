import express from "express";
import { getOrders, getOrderById, updateOrderStatus  } from "../controllers/orderController.js";

const router = express.Router();

// Route to get all orders
router.get("/", getOrders);

// Route to get a single order by ID
router.get("/:id", getOrderById);



// Route to update order status
router.patch("/:id/status", updateOrderStatus);

export default router;
