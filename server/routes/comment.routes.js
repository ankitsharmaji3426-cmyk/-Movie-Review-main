import express from "express";
import Comment from "../models/Comment.js";
import { auth } from "../middleware/auth.js";

const router = express.Router();

// List comments (threaded) for a movie
router.get("/movie/:movieId", async (req, res, next) => {
  try {
    const all = await Comment.find({ movie: req.params.movieId })
      .populate("user", "name")
      .sort({ createdAt: 1 })
      .lean();

    // Build tree
    const byId = new Map(all.map(c => [String(c._id), { ...c, replies: [] }]));
    const roots = [];
    for (const c of byId.values()) {
      if (c.parent) {
        const parent = byId.get(String(c.parent));
        if (parent) parent.replies.push(c);
      } else roots.push(c);
    }
    res.json(roots);
  } catch (e) { next(e); }
});

// Create comment
router.post("/", auth, async (req, res, next) => {
  try {
    const { movieId, text, parentId = null } = req.body;
    if (!text?.trim()) return res.status(400).json({ message: "Text required" });
    const c = await Comment.create({
      movie: movieId, text: text.trim(), parent: parentId, user: req.user.id
    });
    const populated = await c.populate("user", "name");
    res.status(201).json(populated);
  } catch (e) { next(e); }
});

export default router;
