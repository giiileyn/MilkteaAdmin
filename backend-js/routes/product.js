import express from "express";
import {
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
} from "../controllers/productController.js"; 
import { Product } from "../models/Product.js"; 

const router = express.Router();

// GET all products
router.get("/", getProducts);

// GET single product
router.get("/:id", getProductById);

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

// UPDATE PRODUCT
router.put("/:id", updateProduct);

// DELETE PRODUCT
router.delete("/:id", deleteProduct);

export default router;
