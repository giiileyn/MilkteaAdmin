import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  category: { type: String, required: true }, // could also be ObjectId referencing Categories
  flavor: { type: String },
  price: { type: Number, required: true }, // <-- added top-level price
  sizes: [
    {
      name: { type: String, required: true },
      price: { type: Number, required: true },
    },
  ],
  toppings: [{ type: String }], 
  image: { type: String },
  stock: { type: Number, default: 0 },
  status: { type: String, enum: ["available", "out-of-stock", "discontinued"], default: "available" },
  createdAt: { type: Date, default: Date.now },
});

export const Product = mongoose.model("Product", productSchema);
