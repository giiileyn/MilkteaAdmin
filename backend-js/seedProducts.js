import mongoose from "mongoose";
import dotenv from "dotenv";
import { Product } from "./models/Product.js";
import { Category } from "./models/Category.js";
import { Topping } from "./models/Topping.js";

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/milktea";

const connectDB = async () => {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log("✅ Connected to MongoDB for seeding");
  } catch (err) {
    console.error("❌ MongoDB connection failed", err);
    process.exit(1);
  }
};

const seed = async () => {
  try {
    // Optional: Clear existing data
    await Product.deleteMany({});
    await Category.deleteMany({});
    await Topping.deleteMany({});

    console.log("🗑️ Cleared old data");

    // Categories
    const categories = [
      { name: "Milk Tea", description: "Classic and flavored milk teas" },
      { name: "Fruit Tea", description: "Refreshing fruit teas" },
      { name: "Smoothie", description: "Fruity or creamy smoothies" },
      { name: "Snack", description: "Pastries and snacks" },
    ];
    const savedCategories = await Category.insertMany(categories);
    console.log("📦 Categories seeded");

    // Toppings
    const toppings = [
      { name: "Pearls", price: 10, stock: 100 },
      { name: "Pudding", price: 12, stock: 80 },
      { name: "Red Bean", price: 15, stock: 50 },
      { name: "Cheese Foam", price: 20, stock: 40 },
    ];
    await Topping.insertMany(toppings);
    console.log("🍬 Toppings seeded");

    // Products
    const products = [
      {
        name: "Classic Milk Tea",
        category: "Milk Tea",
        flavor: "Original",
        sizes: [
          { name: "Regular", price: 50 },
          { name: "Large", price: 70 },
        ],
        toppings: ["Pearls", "Pudding"],
        image: "https://example.com/classic-milktea.jpg",
        stock: 50,
        status: "available",
      },
      {
        name: "Taro Milk Tea",
        category: "Milk Tea",
        flavor: "Taro",
        sizes: [
          { name: "Regular", price: 60 },
          { name: "Large", price: 80 },
        ],
        toppings: ["Pearls", "Red Bean"],
        image: "https://example.com/taro-milktea.jpg",
        stock: 40,
        status: "available",
      },
      {
        name: "Mango Fruit Tea",
        category: "Fruit Tea",
        flavor: "Mango",
        sizes: [
          { name: "Regular", price: 55 },
          { name: "Large", price: 75 },
        ],
        toppings: ["Pudding", "Cheese Foam"],
        image: "https://example.com/mango-fruittea.jpg",
        stock: 30,
        status: "available",
      },
      {
        name: "Strawberry Smoothie",
        category: "Smoothie",
        flavor: "Strawberry",
        sizes: [
          { name: "Regular", price: 65 },
          { name: "Large", price: 85 },
        ],
        toppings: ["Cheese Foam"],
        image: "https://example.com/strawberry-smoothie.jpg",
        stock: 20,
        status: "available",
      },
      {
        name: "Butter Croissant",
        category: "Snack",
        stock: 25,
        price: 40,
        status: "available",
        image: "https://example.com/butter-croissant.jpg",
      },
    ];

    await Product.insertMany(products);
    console.log("🧋 Products seeded");

    console.log("✅ Seeding completed!");
    process.exit();
  } catch (err) {
    console.error("❌ Seeding failed:", err);
    process.exit(1);
  }
};

connectDB().then(seed);
