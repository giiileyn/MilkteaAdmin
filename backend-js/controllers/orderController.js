import { Order } from "../models/Order.js";

// Get all orders
export const getOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("user", "name email") // populate user details (only name and email)
      .populate("products.productId", "name price"); // populate product details
    res.status(200).json(orders);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch orders", error });
  }
};

// Get single order by ID
export const getOrderById = async (req, res) => {
  const { id } = req.params;
  try {
    const order = await Order.findById(id)
      .populate("user", "name email")
      .populate("products.productId", "name price");

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.status(200).json(order);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch order", error });
  }
};


// Update order status
export const updateOrderStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body; // expect { "status": "Completed" } in JSON

  try {
    const order = await Order.findByIdAndUpdate(
      id,
      { status },
      { new: true } // return the updated document
    )
      .populate("user", "name email")
      .populate("products.productId", "name price");

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.status(200).json({ success: true, data: order });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to update order status", error });
  }
};

