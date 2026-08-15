// server/middleware/isAdmin.js
import User from "../models/User.js";

export async function isAdmin(req, res, next) {
  try {
    // auth middleware must have set req.user.id
    if (!req.user?.id) return res.status(401).json({ message: "No user" });
    const user = await User.findById(req.user.id).select("role");
    if (!user || user.role !== "admin") {
      return res.status(403).json({ message: "Access denied (admin only)" });
    }
    next();
  } catch (e) {
    next(e);
  }
}
