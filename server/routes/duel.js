const express = require("express");
const router = express.Router();

const players = {
    "kevin durant": { longName: "Kevin Durant", team: "Phoenix Suns", stats: { pts: 27.2, reb: 7.1, ast: 4.3, blk: 1.2, stl: 0.9 } },
    "lebron james": { longName: "LeBron James", team: "Los Angeles Lakers", stats: { pts: 27.1, reb: 7.4, ast: 7.4, blk: 0.8, stl: 1.2 } },
    "stephen curry": { longName: "Stephen Curry", team: "Golden State Warriors", stats: { pts: 24.3, reb: 4.6, ast: 6.5, blk: 0.4, stl: 1.6 } }
};

// Function to get random player (excluding one)
const getRandomPlayer = (exclude) => {
    const playerNames = Object.keys(players).filter(p => p !== exclude);
    return players[playerNames[Math.floor(Math.random() * playerNames.length)]];
};

// Function to get random stat
const getRandomStat = () => {
    const statCategories = ["pts", "reb", "ast", "blk", "stl"];
    return statCategories[Math.floor(Math.random() * statCategories.length)];
};

// API Endpoint for Duel Game
router.get("/", (req, res) => {
    const player1 = players[Object.keys(players)[Math.floor(Math.random() * Object.keys(players).length)]];
    const player2 = getRandomPlayer(player1.longName.toLowerCase());
    const statCategory = getRandomStat();

    res.json({
        player1,
        player2,
        statCategory,
        player1Stat: player1.stats[statCategory],
        player2Stat: player2.stats[statCategory]
    });
});

module.exports = router;