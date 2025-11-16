import mongoose from "mongoose";

const saleSchema = new mongoose.Schema({
  productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
  size: { type: String },
  toppings: [{ type: String }], // could reference Topping collection
  quantity: { type: Number, required: true },
  totalPrice: { type: Number, required: true },
  soldAt: { type: Date, default: Date.now },
});

export const Sale = mongoose.model("Sale", saleSchema);
