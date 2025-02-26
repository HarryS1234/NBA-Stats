const express = require("express");
const router = express.Router();

// In-memory storage for profiles
let profiles = [];

const initialProfile = {
  id: 1,
  username: "NBAFan123",
  email: "nbafan123@example.com",
  avatar: "/img/logo-duel.png", // Ensure this is in client/public/img/
  createdAt: new Date(),
};
profiles.push(initialProfile);

router.get("/", (req, res) => {
  console.log("GET /profile - Profiles array:", profiles); // Debug log
  if (profiles.length === 0) {
    console.log("No profiles found, returning 404");
    return res.status(404).json({ error: "No profile found. Create one first!" });
  }
  console.log("Returning latest profile:", profiles[profiles.length - 1]);
  res.json(profiles[profiles.length - 1]);
});

router.post("/", (req, res) => {
  const { username, email, avatar } = req.body;
  console.log("POST /profile - Received data:", req.body); // Debug log

  if (!username || !email) {
    console.log("Validation failed: Missing username or email");
    return res.status(400).json({ error: "Username and email are required" });
  }

  const existingProfile = profiles.find((p) => p.username === username);
  if (existingProfile) {
    console.log("Username already exists:", username);
    return res.status(400).json({ error: "Username already exists" });
  }

  const newProfile = {
    id: profiles.length + 1,
    username,
    email,
    avatar: avatar || "/img/logo-duel.png",
    createdAt: new Date(),
  };

  profiles.push(newProfile);
  console.log("Profile created:", newProfile);
  res.status(201).json(newProfile);
});

module.exports = router;