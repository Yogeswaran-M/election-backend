import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import voteRoutes from "./routes/voteRoutes.js";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// 🔥 MongoDB connect – optimized
const connectDB = async () => {
  if (mongoose.connection.readyState === 1) {
    console.log("Mongo already connected");
    return;
  }

  try {
    await mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 5000,
    });
    console.log("MongoDB Atlas connected");
  } catch (err) {
    console.error("Mongo connection failed:", err.message);
    process.exit(1);
  }
};

connectDB(); // ✅ only once

// 🔥 Health check (IMPORTANT for Render sleep)
app.get("/health", (req, res) => {
  res.send("OK");
});

// routes
app.use("/api", voteRoutes);

app.listen(5000, () => {
  console.log("Server running on port 5000");
});