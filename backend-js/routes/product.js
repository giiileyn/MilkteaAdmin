import express from "express";
import { Product } from "../models/Product.js"; // adjust path if needed

const router = express.Router();

// CREATE PRODUCT
router.post("/", async (req, res) => {
  try {
    const product = new Product(req.body);
    const savedProduct = await product.save();
    res.status(201).json(savedProduct);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

export default router; // <-- export the router, not Product
