import express from "express";
import Vote from "../models/Vote.js";

const router = express.Router();

// import express from "express";
// import Vote from "../models/Vote.js";

// const router = express.Router();

router.post("/vote", async (req, res) => {
  try {
    const { name, age, district, party, mobile } = req.body;

    if (!mobile) {
      return res.status(400).json({ msg: "Mobile required" });
    }

    // 🔥 FAST duplicate check
    const alreadyVoted = await Vote.exists({ mobile });
    if (alreadyVoted) {
      return res.status(409).json({ msg: "Already voted" });
    }

    await Vote.create({ name, age, district, party, mobile });

    res.json({ success: true });

  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error" });
  }
});

export default router;