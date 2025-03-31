const mongoose = require("mongoose");

const scoreSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  username: { type: String, required: true },
  profileImage: { type: String },
  score: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Score", scoreSchema);
