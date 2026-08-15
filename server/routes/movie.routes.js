// server/routes/movie.routes.js
import express from "express";
import mongoose from "mongoose";
import Movie from "../models/Movie.js";
import Rating from "../models/Rating.js";
import { auth } from "../middleware/auth.js";
import { isAdmin } from "../middleware/isAdmin.js";

const router = express.Router();

const parseNum = (val, def) => {
  const n = Number(val);
  return Number.isNaN(n) || n <= 0 ? def : n;
};

// List movies (search, genre filter, sorting & pagination)
router.get("/", async (req, res, next) => {
  try {
    const { q = "", genre = "", page = 1, limit = 24, sort = "latest" } = req.query;

    const pageNum = parseNum(page, 1);
    const limitNum = parseNum(limit, 24);

    const filter = {};
    if (q) filter.title = { $regex: q, $options: "i" };
    if (genre) filter.genres = genre;

    let sortOption = { createdAt: -1 };
    if (sort === "highest") sortOption = { avgRating: -1 };
    else if (sort === "lowest") sortOption = { avgRating: 1 };
    else if (sort === "name") sortOption = { title: 1 };
    else if (sort === "name-desc") sortOption = { title: -1 };

    const docs = await Movie.find(filter)
      .sort(sortOption)
      .skip((pageNum - 1) * limitNum)
      .limit(limitNum);

    res.json(docs);
  } catch (e) {
    next(e);
  }
});

// Get single movie with rating data
router.get("/:id", async (req, res, next) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: "Invalid movie ID" });
    }
    const m = await Movie.findById(req.params.id);
    if (!m) return res.status(404).json({ message: "Movie not found" });

    // include ratings for detail view
    const ratings = await Rating.find({ movie: m._id }).populate("user", "name");
    let avg = 0;
    if (ratings.length) avg = ratings.reduce((s, r) => s + r.stars, 0) / ratings.length;

    res.json({
      ...m.toObject(),
      avgRating: Math.round(avg * 10) / 10,
      ratingCount: ratings.length,
      ratings
    });
  } catch (e) {
    next(e);
  }
});

// Create new movie (admin only)
router.post("/", auth, isAdmin, async (req, res, next) => {
  try {
    const { title, year, genres = [], posterUrl, trailerYouTubeId } = req.body;
    if (!title) return res.status(400).json({ message: "Title required" });

    const movie = await Movie.create({
      title,
      year,
      genres: Array.isArray(genres) ? genres : (genres || "").split(",").map(g => g.trim()).filter(Boolean),
      posterUrl,
      trailerYouTubeId
    });
    res.status(201).json(movie);
  } catch (e) {
    next(e);
  }
});

// Update movie (admin only)
router.put("/:id", auth, isAdmin, async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(400).json({ message: "Invalid movie ID" });
    const updates = req.body;
    if (updates.genres && !Array.isArray(updates.genres)) {
      updates.genres = String(updates.genres).split(",").map(g => g.trim()).filter(Boolean);
    }
    const movie = await Movie.findByIdAndUpdate(id, updates, { new: true });
    if (!movie) return res.status(404).json({ message: "Movie not found" });
    res.json(movie);
  } catch (e) {
    next(e);
  }
});

// Delete movie (admin only)
router.delete("/:id", auth, isAdmin, async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(400).json({ message: "Invalid movie ID" });
    await Movie.findByIdAndDelete(id);
    res.json({ message: "Movie deleted" });
  } catch (e) {
    next(e);
  }
});

// Rate (create/update)
router.post("/:id/rate", auth, async (req, res, next) => {
  try {
    const { stars } = req.body;
    if (![1, 2, 3, 4, 5].includes(stars)) {
      return res.status(400).json({ message: "Stars must be between 1–5" });
    }
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: "Invalid movie ID" });
    }

    const movie = await Movie.findById(req.params.id);
    if (!movie) return res.status(404).json({ message: "Movie not found" });

    const existing = await Rating.findOne({ movie: movie._id, user: req.user.id });
    if (existing) {
      existing.stars = stars;
      await existing.save();
    } else {
      await Rating.create({ movie: movie._id, user: req.user.id, stars });
    }

    const agg = await Rating.aggregate([
      { $match: { movie: movie._id } },
      { $group: { _id: "$movie", avg: { $avg: "$stars" }, count: { $sum: 1 } } }
    ]);

    const { avg = 0, count = 0 } = agg[0] || {};
    movie.avgRating = Math.round(avg * 10) / 10;
    movie.ratingCount = count;
    await movie.save();

    res.json({ avgRating: movie.avgRating, ratingCount: movie.ratingCount });
  } catch (e) {
    next(e);
  }
});

export default router;
