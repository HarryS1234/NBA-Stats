const express = require("express");
const router = express.Router();
const Player = require("../models/Player");

// Utility: Pick a random stat category
const getRandomStat = () => {
    const statCategories = ["points", "rebounds", "assists", "steals", "blocks"];
    return statCategories[Math.floor(Math.random() * statCategories.length)];
};

// Utility: Get two random players from the DB
const getTwoRandomPlayers = async () => {
    const count = await Player.countDocuments();
    const randomIndexes = [
        Math.floor(Math.random() * count),
        Math.floor(Math.random() * count),
    ];

    const players = await Player.find().skip(randomIndexes[0]).limit(1);
    let player1 = players[0];

    let player2;
    do {
        const randomPlayer = await Player.findOne().skip(randomIndexes[1]);
        if (randomPlayer._id.toString() !== player1._id.toString()) {
            player2 = randomPlayer;
        }
    } while (!player2);

    return [player1, player2];
};

// Endpoint: /duel
router.get("/", async (req, res) => {
    try {
        const [player1, player2] = await getTwoRandomPlayers();
        const statCategory = getRandomStat();

        // Prevent divide by 0
        const gp1 = player1.gamesPlayed || 1;
        const gp2 = player2.gamesPlayed || 1;

        // Compute per-game stat averages
        const player1Stat = (player1.stats[statCategory] / gp1).toFixed(1);
        const player2Stat = (player2.stats[statCategory] / gp2).toFixed(1);

        res.json({
            statCategory,
            player1: {
                longName: player1.name,
                team: player1.team,
            },
            player2: {
                longName: player2.name,
                team: player2.team,
            },
            player1Stat: parseFloat(player1Stat),
            player2Stat: parseFloat(player2Stat),
        });
    } catch (err) {
        console.error("Duel API error:", err);
        res.status(500).json({ error: "Server error during duel" });
    }
});

module.exports = router;
