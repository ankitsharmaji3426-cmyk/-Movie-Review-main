import "dotenv/config.js";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import rateLimit from "express-rate-limit";
import { connectDB } from "./config/db.js";
import authRoutes from "./routes/auth.routes.js";
import movieRoutes from "./routes/movie.routes.js";
import commentRoutes from "./routes/comment.routes.js";
import { notFound, errorHandler } from "./middleware/error.js";

const app = express();

app.use(helmet());
app.use(cors({ origin: process.env.CLIENT_URL, credentials: false }));
app.use(express.json());
app.use(morgan("dev"));
app.use(rateLimit({ windowMs: 60_000, limit: 200 }));

app.get("/", (req, res) => res.json({ ok: true }));
app.use("/api/auth", authRoutes);
app.use("/api/movies", movieRoutes);   // ✅ matches ActionMovies.jsx
app.use("/api/comments", commentRoutes);

app.use(notFound);
app.use(errorHandler);

const start = async () => {
  await connectDB(process.env.MONGO_URI);
  const port = process.env.PORT || 5000;
  app.listen(port, () => console.log(`🚀 API on http://localhost:${port}`));
};
start();
