import express from "express";
import Vote from "../models/Vote.js";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { name, age, mobile, district, constituency, party } = req.body;

    // ✅ Required check
    if (!name || !age || !mobile || !district || !constituency || !party) {
      return res.status(400).json({ msg: "All fields required" });
    }

    // ✅ Mobile format check
    if (!/^[6-9]\d{9}$/.test(mobile)) {
      return res.status(400).json({ msg: "Invalid mobile number" });
    }

    // ✅ Duplicate vote check (LOGIC LEVEL)
    const alreadyVoted = await Vote.exists({ mobile });
    if (alreadyVoted) {
      return res.status(409).json({ msg: "Already voted" });
    }

    // ✅ Save vote
    await Vote.create({
      name,
      age,
      mobile,
      district,
      constituency,
      party
    });

    return res.json({ success: true });

  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error" });
  }
});

export default router;