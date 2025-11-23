// import bcrypt from "bcryptjs";
// import { User } from "../models/User.js";

// export const updatePassword = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const { currentPassword, newPassword } = req.body; // <-- match your frontend keys

//     if (!currentPassword || !newPassword) {
//       return res.status(400).json({ success: false, message: "Missing passwords" });
//     }

//     const user = await User.findById(id);
//     if (!user) return res.status(404).json({ success: false, message: "User not found" });

//     // check current password
//     const isMatch = await bcrypt.compare(currentPassword, user.password);
//     if (!isMatch) {
//       return res.status(400).json({ success: false, message: "Current password is incorrect" });
//     }

//     // hash new password
//     const hashedPassword = await bcrypt.hash(newPassword, 10);
//     user.password = hashedPassword;
//     await user.save();

//     res.status(200).json({ success: true, message: "Password updated successfully" });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ success: false, message: "Server error" });
//   }
// };
