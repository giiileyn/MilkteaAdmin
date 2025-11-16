import mongoose from "mongoose";

const toppingSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  price: { type: Number, default: 0 },
  stock: { type: Number, default: 0 },
  status: { type: String, enum: ["available", "out-of-stock"], default: "available" },
  createdAt: { type: Date, default: Date.now },
});

export const Topping = mongoose.model("Topping", toppingSchema);
