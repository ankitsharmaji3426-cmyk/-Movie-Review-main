import mongoose from "mongoose";

const commentSchema = new mongoose.Schema(
  {
    movie: { type: mongoose.Schema.Types.ObjectId, ref: "Movie", required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    text: { type: String, required: true, trim: true },
    parent: { type: mongoose.Schema.Types.ObjectId, ref: "Comment", default: null }
  },
  { timestamps: true }
);

export default mongoose.model("Comment", commentSchema);
