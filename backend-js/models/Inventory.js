import mongoose from "mongoose";

const inventorySchema = new mongoose.Schema({
  name: { type: String, required: true },
  type: { type: String, enum: ["base", "syrup", "powder", "milk", "topping"], required: true },
  quantity: { type: Number, required: true },
  unit: { type: String, enum: ["g", "ml", "pcs"], required: true },
  threshold: { type: Number, default: 0 },
  status: { type: String, enum: ["available", "low-stock", "out-of-stock"], default: "available" },
  createdAt: { type: Date, default: Date.now },
});

export const Inventory = mongoose.model("Inventory", inventorySchema);
