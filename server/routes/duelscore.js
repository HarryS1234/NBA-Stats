const express = require("express");
const Score = require("../models/Score");

const router = express.Router();

// Submit a new score
router.post("/score", async (req, res) => {
  const { userId, username, profileImage, score } = req.body;

  try {
    const newScore = new Score({ userId, username, profileImage, score });
    await newScore.save();
    res.status(201).json({ message: "Score saved!" });
  } catch (error) {
    res.status(500).json({ error: "Failed to save score" });
  }
});

// Get Top 5 High Scores
router.get("/leaderboard", async (req, res) => {
  try {
    const topScores = await Score.find()
      .sort({ score: -1 })
      .limit(5);

    res.json(topScores);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch leaderboard" });
  }
});

module.exports = router;
