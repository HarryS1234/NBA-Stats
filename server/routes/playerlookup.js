const express = require("express");
const router = express.Router();

const players = {
    "kevin durant": {
        longName: "Kevin Durant",
        team: "Phoenix Suns",
        pos: "SF/PF",
        height: "6'10\"",
        weight: "240 lbs",
        bDay: "September 29, 1988",
        stats: {
            pts: 27.2,
            reb: 7.1,
            ast: 4.3
        }
    },
    "lebron james": {
        longName: "LeBron James",
        team: "Los Angeles Lakers",
        pos: "SF/PF",
        height: "6'9\"",
        weight: "250 lbs",
        bDay: "December 30, 1984",
        stats: {
            pts: 27.1,
            reb: 7.4,
            ast: 7.4
        }
    },
    "stephen curry": {
        longName: "Stephen Curry",
        team: "Golden State Warriors",
        pos: "PG",
        height: "6'3\"",
        weight: "185 lbs",
        bDay: "March 14, 1988",
        stats: {
            pts: 24.3,
            reb: 4.6,
            ast: 6.5
        }
    }
};

router.get("/:playerName", (req, res) => {
    const playerName = req.params.playerName.toLowerCase(); // Convert input to lowercase

    if (players[playerName]) {
        res.json(players[playerName]);
    } else {
        res.status(404).json({ message: "Player not found" });
    }
});

module.exports = router;