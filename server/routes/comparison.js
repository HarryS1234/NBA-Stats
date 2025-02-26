const express = require("express");
const router = express.Router();

const players = {
    "kevin durant": { longName: "Kevin Durant", team: "Phoenix Suns", stats: { pts: 27.2, reb: 7.1, ast: 4.3 } },
    "lebron james": { longName: "LeBron James", team: "Los Angeles Lakers", stats: { pts: 27.1, reb: 7.4, ast: 7.4 } },
    "stephen curry": { longName: "Stephen Curry", team: "Golden State Warriors", stats: { pts: 24.3, reb: 4.6, ast: 6.5 } }
};

// Route to compare two players
router.get("/:player1/:player2", (req, res) => {
    const player1 = req.params.player1.toLowerCase();
    const player2 = req.params.player2.toLowerCase();

    if (!players[player1] || !players[player2]) {
        return res.status(404).json({ message: "One or both players not found" });
    }

    res.json({
        player1: players[player1],
        player2: players[player2],
    });
});

module.exports = router;