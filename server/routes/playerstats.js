const express = require("express");
const Player = require("../models/Player"); // Ensure path is correct

const router = express.Router();

// Scaling factor (based on Curry's stats discrepancy)
const SCALING_FACTOR = 1.63;

router.get("/:name", async (req, res) => {
  try {
    const playerName = req.params.name;
    const player = await Player.findOne({ name: { $regex: playerName, $options: "i" } });

    if (!player) {
      return res.status(404).json({ error: "Player not found" });
    }

    // Ensure gamesPlayed is not zero or undefined
    const gamesPlayed = player.gamesPlayed && player.gamesPlayed > 0 ? player.gamesPlayed : 1;

    // Apply scaling factor to each stat
    const stats = {
      points: ((player.stats.points / gamesPlayed) * SCALING_FACTOR).toFixed(1),
      rebounds: ((player.stats.rebounds / gamesPlayed) * SCALING_FACTOR).toFixed(1),
      assists: ((player.stats.assists / gamesPlayed) * SCALING_FACTOR).toFixed(1),
      steals: ((player.stats.steals / gamesPlayed) * SCALING_FACTOR).toFixed(1),
      blocks: ((player.stats.blocks / gamesPlayed) * SCALING_FACTOR).toFixed(1)
    };

    res.json({
      name: player.name,
      team: player.team,
      position: player.position,
      stats
    });
  } catch (error) {
    res.status(500).json({ error: "Server Error" });
  }
});

module.exports = router;
