import express from "express";
import Vote from "../models/Vote.js";

const router = express.Router();

/* SAVE VOTE */

router.post("/vote", async (req, res) => {
  try {
    const { mobile } = req.body;

    const existingVote = await Vote.findOne({ mobile });

    if (existingVote) {
      return res.status(400).json({
        message: "This mobile number has already voted"
      });
    }

    const vote = new Vote(req.body);
    await vote.save();

    res.json({ message: "Vote submitted successfully" });

  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

/* PARTY-WISE RESULT */
router.get("/results/party", async (req, res) => {
  const data = await Vote.aggregate([
    { $group: { _id: "$party", count: { $sum: 1 } } }
  ]);
  res.json(data);
});

/* DISTRICT-WISE RESULT */
router.get("/results/district", async (req, res) => {
  const data = await Vote.aggregate([
    { $group: { _id: "$district", count: { $sum: 1 } } }
  ]);
  res.json(data);
});

/* AGE GROUP ANALYSIS */
router.get("/results/age", async (req, res) => {
  const data = await Vote.aggregate([
    {
      $bucket: {
        groupBy: "$age",
        boundaries: [18, 26, 36, 51, 100],
        default: "Other",
        output: { count: { $sum: 1 } }
      }
    }
  ]);
  res.json(data);
});

export default router;