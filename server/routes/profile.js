const express = require("express");
const router = express.Router();

// Mock user data (this would come from a database later)
const userProfile = {
  username: "NBAFan123",
  email: "nbafan123@example.com",
  avatar: "/img/logo-duel.png", // Replace with real image path
};

// Route to get user profile
router.get("/", (req, res) => {
  res.json(userProfile);
});

module.exports = router;