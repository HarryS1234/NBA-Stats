const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 8000;

// Middleware
app.use(cors());
app.use(express.json());

// Import Routes
const profileRoutes = require("./routes/profile");
const playerLookupRoutes = require("./routes/playerlookup");
const playerComparisonRoutes = require("./routes/comparison")
const duelRoutes = require("./routes/duel")

app.use("/profile", profileRoutes);
app.use("/playerlookup", playerLookupRoutes);
app.use("/comparison", playerComparisonRoutes);
app.use("/duel", duelRoutes);



// Default Route
app.get("/", (req, res) => {
  res.send("Server is running!");
});

// Start the server
app.listen(PORT, () => {
  console.log(`✅ Backend running at http://localhost:${PORT}`);
});