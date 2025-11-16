import { Product } from "../models/Product.js"; 


// GET ALL PRODUCTS
export const getProducts = async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    res.json(products);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error fetching products" });
  }
};

// GET SINGLE PRODUCT BY ID
export const getProductById = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await Product.findById(id);
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.json(product);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error fetching product" });
  }
};


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


// UPDATE PRODUCT
export const updateProduct = async (req, res) => {
  const { id } = req.params;
  try {
    const updatedProduct = await Product.findByIdAndUpdate(id, req.body, { new: true });
    if (!updatedProduct) return res.status(404).json({ message: "Product not found" });
    res.json(updatedProduct);
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: "Error updating product", error: err.message });
  }
};

// DELETE PRODUCT
export const deleteProduct = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedProduct = await Product.findByIdAndDelete(id);
    if (!deletedProduct) return res.status(404).json({ message: "Product not found" });
    res.json({ message: "Product deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error deleting product", error: err.message });
  }
};