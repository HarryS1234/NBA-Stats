const mongoose = require("mongoose");

const playerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  team: { type: String, required: true },
  position: { type: String, required: true },
  gamesPlayed: { type: Number, required: true, default: 1 }, // Ensure gamesPlayed is included
  stats: {
    points: { type: Number, required: true },
    rebounds: { type: Number, required: true },
    assists: { type: Number, required: true },
    steals: { type: Number, required: true },
    blocks: { type: Number, required: true },
  },
  jerseyNumber: Number,
  height: String,
  weight: String,
  nationality: String,
});

module.exports = mongoose.model("Player", playerSchema);
