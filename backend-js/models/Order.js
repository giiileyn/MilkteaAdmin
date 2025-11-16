import mongoose from "mongoose"; 

const orderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, 
  products: [
    {
      productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
      name: { type: String, required: true }, 
      size: { type: String, enum: ["Regular", "Large"], required: true },
      toppings: [{ type: String }], 
      quantity: { type: Number, required: true, min: 1 },
      price: { type: Number, required: true } 
    }
  ],
  totalPrice: { type: Number, required: true }, 
  status: { type: String, enum: ["pending", "completed", "cancelled"], default: "pending" },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date }
});

// Update `updatedAt` automatically
orderSchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  next();
});

export const Order = mongoose.model("Order", orderSchema);
