const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const duelScoreRoutes = require("./routes/duelscore");

// Load environment variables
dotenv.config();

// MongoDB Connection
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB Connected...");
  } catch (error) {
    console.error("MongoDB Connection Failed:", error.message);
    process.exit(1);
  }
};

// Initialize Express App
const app = express();
const PORT = process.env.PORT || 8000;

// Middleware
app.use(cors());
app.use(express.json());
app.use("/duel", duelScoreRoutes);

// Connect to MongoDB
connectDB();

// Import Routes (Convert to `require()`)
const profileRoutes = require("./routes/profile");
const playerLookupRoutes = require("./routes/playerlookup");
const playerComparisonRoutes = require("./routes/comparison");
const duelRoutes = require("./routes/duel");
const playerStatsRoutes = require("./routes/playerstats");

// Use Routes
app.use("/profile", profileRoutes);
app.use("/playerlookup", playerLookupRoutes);
app.use("/comparison", playerComparisonRoutes);
app.use("/duel", duelRoutes);
app.use("/api/playerstats", playerStatsRoutes);

// Default Route
app.get("/", (req, res) => {
  res.send("Server is running!");
});

// Start the server
app.listen(PORT, () => {
  console.log(`Backend running at http://localhost:${PORT}`);
});
