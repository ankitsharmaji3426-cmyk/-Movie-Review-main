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
const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:3000",
  process.env.CLIENT_URL,
  "https://movie-review-main-production.up.railway.app",
  "https://movie-review-main-psi.vercel.app",
].filter(Boolean);

app.use(helmet());
app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
        return;
      }

      callback(new Error("Not allowed by CORS"));
    },
    credentials: true,
  })
);
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
