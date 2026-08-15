import mongoose from "mongoose";

const movieSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, index: true },
    year: Number,
    genres: [String], // ✅ array of strings
    posterUrl: String,
    trailerYouTubeId: String,
    avgRating: { type: Number, default: 0 },
    ratingCount: { type: Number, default: 0 }
  },
  { timestamps: true }
);

export default mongoose.model("Movie", movieSchema);
