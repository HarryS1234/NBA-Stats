require("dotenv").config({ path: "../.env" });
const fetch = require("node-fetch");
const mongoose = require("mongoose");
const Player = require("../models/Player"); // Ensure this path is correct

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log("MongoDB Connected..."))
  .catch(err => console.error("MongoDB Connection Failed:", err));

const fetchSeasonAverages = async () => {
  console.log("Fetching NBA player season averages...");

  const url = `https://api.sportsdata.io/v3/nba/stats/json/PlayerSeasonStats/${process.env.NBA_SEASON}?key=${process.env.SPORTSDATA_API_KEY}`;

  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`API request failed with status ${response.status}`);

    const data = await response.json();
    if (!data || !Array.isArray(data) || data.length === 0) {
      console.error("No player season data found!");
      return;
    }

    for (const player of data) {
      const playerData = {
        name: player.Name,
        team: player.Team || "Free Agent",
        position: player.Position || "Unknown",
        stats: {
          points: player.Points || 0,
          rebounds: player.Rebounds || 0,
          assists: player.Assists || 0,
          steals: player.Steals || 0,
          blocks: player.BlockedShots || 0,
        },
        gamesPlayed: player.Games || 1,
        minutesPerGame: player.Minutes || 0,
        fieldGoalPercentage: player.FieldGoalsPercentage || 0,
        threePointPercentage: player.ThreePointersPercentage || 0,
        freeThrowPercentage: player.FreeThrowsPercentage || 0,
      };

      await Player.findOneAndUpdate({ name: playerData.name }, playerData, { upsert: true });
      console.log(`Updated stats for ${playerData.name}`);
    }

    console.log("Player season stats updated!");
    mongoose.connection.close();
  } catch (error) {
    console.error("Error fetching season stats:", error);
  }
};

// Run the function
fetchSeasonAverages();
