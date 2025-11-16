import { Product } from "../models/Product.js"; 

// Create a new product
export const createProduct = async (req, res) => {
  try {
    const { name, category, flavor, price, sizes, toppings, image, stock, status } = req.body;

    // Basic validation
    if (!name || !category || !price || !sizes || sizes.length === 0) {
      return res.status(400).json({ message: "Name, category, price, and sizes are required" });
    }

    // Create product
    const newProduct = new Product({
      name,
      category,
      flavor,
      price,
      sizes,
      toppings,
      image,
      stock,
      status,
    });

    const savedProduct = await newProduct.save();
    return res.status(201).json({ message: "Product created successfully", product: savedProduct });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error", error: error.message });
  }
};
