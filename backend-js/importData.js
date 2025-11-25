import mongoose from "mongoose";
import fs from "fs";
import dotenv from "dotenv";
import { Category } from "./models/Category.js";
import { Inventory } from "./models/Inventory.js";
import { Order } from "./models/Order.js";
import { Product } from "./models/Product.js";
import { Sale } from "./models/Sale.js";
import { Topping } from "./models/Topping.js";
import { User } from "./models/User.js";


dotenv.config({ path: "./.env" });

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("✅ MongoDB connected...");
  } catch (error) {
    console.error("❌ MongoDB connection error:", error);
    process.exit(1);
  }
};

const importData = async () => {
  try {
    const categories = JSON.parse(fs.readFileSync("./data/categories.json"));
    const inventory = JSON.parse(fs.readFileSync("./data/inventory.json"));
    const toppings = JSON.parse(fs.readFileSync("./data/toppings.json"));
    const products = JSON.parse(fs.readFileSync("./data/products.json"));
    const orders = JSON.parse(fs.readFileSync("./data/orders.json"));
    const sales = JSON.parse(fs.readFileSync("./data/sales.json"));
    const users = JSON.parse(fs.readFileSync("./data/users.json")); // ← ADD THIS

    await Category.deleteMany();
    await Inventory.deleteMany();
    await Topping.deleteMany();
    await Product.deleteMany();
    await Order.deleteMany();
    await Sale.deleteMany();
    await User.deleteMany(); // ← ADD THIS

    await Category.insertMany(categories);
    await Inventory.insertMany(inventory);
    await Topping.insertMany(toppings);

    const insertedProducts = await Product.insertMany(products);
    await Order.insertMany(orders);
    await User.insertMany(users); // ← ADD THIS

    if (insertedProducts.length > 0) {
      sales.forEach((s) => (s.productId = insertedProducts[0]._id));
      await Sale.insertMany(sales);
    }

    console.log("🌱 Data successfully imported!");
    process.exit();
  } catch (error) {
    console.error("❌ Error importing data:", error);
    process.exit(1);
  }
};


const run = async () => {
  await connectDB();
  await importData();
};

run();
