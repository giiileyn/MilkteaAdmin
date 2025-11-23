// index.js
import express from "express";
import cors from "cors";
import { connectDB } from "./db.js";
import authRoutes from "./routes/auth.js";
import productRoutes from "./routes/product.js";
import categoryRoutes from "./routes/category.js";
import toppingsRoutes from "./routes/topping.js";
import orderRoutes from "./routes/order.js";
import passwordRoutes from "./routes/password.js";

const app = express();
const PORT = 4000;

app.use(cors());
app.use(express.json());
app.use("/auth", authRoutes);
app.use("/products", productRoutes);
app.use("/categories", categoryRoutes);
app.use("/add_toppings", toppingsRoutes);
app.use("/orders", orderRoutes);
app.use("/password", passwordRoutes);

app.get("/", (req, res) => {
  res.send("Backend is working!");
});

app.listen(PORT, async () => {
  console.log(`Server running on http://localhost:${PORT}`);
  await connectDB();
});
