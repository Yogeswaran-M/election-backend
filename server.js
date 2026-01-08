import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import rateLimit from "express-rate-limit";
import dotenv from "dotenv";
import voteRoutes from "./routes/voteRoutes.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// 🌍 GLOBAL LIMIT
const globalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100
});
app.use(globalLimiter);

// 🗳️ VOTE LIMIT (ONLY HERE)
const voteLimiter = rateLimit({
  windowMs: 10 * 60 * 1000,
  max: 5,
  message: { error: "Too many vote attempts" }
});

app.use("/api/vote", voteLimiter, voteRoutes);

// 🔥 MongoDB connect
const connectDB = async () => {
  if (mongoose.connection.readyState === 1) return;

  try {
    await mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 5000
    });
    console.log("MongoDB Atlas connected");
  } catch (err) {
    console.error("Mongo connection failed:", err.message);
    process.exit(1);
  }
};

connectDB();

// ❤️ Health check
app.get("/health", (req, res) => {
  res.send("OK");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});