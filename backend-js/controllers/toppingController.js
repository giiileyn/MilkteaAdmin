import { Topping } from "../models/Topping.js";

export const createTopping = async (req, res) => {
  try {
    const { name, price = 0, stock = 0, status = "available" } = req.body;
    const topping = new Topping({ name, price, stock, status });
    const saved = await topping.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getToppings = async (req, res) => { res.json(await Topping.find()); };
export const updateTopping = async (req, res) => { res.status(501).send("Not implemented"); };
export const deleteTopping = async (req, res) => { res.status(501).send("Not implemented"); };
