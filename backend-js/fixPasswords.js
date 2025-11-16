import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import { User } from "./models/User.js";

dotenv.config(); // loads your .env variables

mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch(err => console.error("❌ Connection error:", err));

const fixPasswords = async () => {
  try {
    const users = await User.find();
    for (const user of users) {
      const hashed = await bcrypt.hash(user.password, 10);
      user.password = hashed;
      await user.save();
      console.log(`✅ Password updated for user: ${user.email}`);
    }
    console.log("🌱 All passwords updated!");
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

fixPasswords();
