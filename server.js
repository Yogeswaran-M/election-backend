import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import voteRoutes from "./routes/voteRoutes.js";
import dotenv from "dotenv";
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// app.post("/api/admin/login", (req, res) => {
//   const { username, password } = req.body;

//   console.log("LOGIN DATA", username, password);
  

//   if (username === "admin" && password === "1234") {
//     res.json({ token: "secure-admin-token" });
//   } else {
//     res.status(401).json({ message: "Invalid admin credentials" });
//   }
// });

// app.get("/api/admin/results", async (req, res) => {
//   const authHeader = req.headers.authorization;

//   if (authHeader !== "Bearer secure-admin-token") {
//     return res.status(403).json({ message: "Unauthorized" });
//   }

//   const results = await Vote.find(); // MongoDB
//   res.json(results);
// });

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Atlas connected"))
  .catch(err => console.error(err));

app.use("/api", voteRoutes);

app.listen(5000, () => {
  console.log("Server running on port 5000");
});