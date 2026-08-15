import mongoose from "mongoose";

const ratingSchema = new mongoose.Schema(
  {
    movie: { type: mongoose.Schema.Types.ObjectId, ref: "Movie", required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    stars: { type: Number, min: 1, max: 5, required: true }
  },
  { timestamps: true }
);

ratingSchema.index({ movie: 1, user: 1 }, { unique: true }); // one rating per user/movie

export default mongoose.model("Rating", ratingSchema);
