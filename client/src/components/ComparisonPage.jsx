import React, { useState } from "react";

const ComparisonPage = () => {
  const [player1, setPlayer1] = useState("");
  const [player2, setPlayer2] = useState("");
  const [comparisonData, setComparisonData] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const fetchPlayerStats = async (name) => {
    const backendUrl = import.meta.env.VITE_BACKEND_URL || "http://localhost:8000";
    const response = await fetch(`${backendUrl}/api/playerstats/${name}`);
    if (!response.ok) throw new Error(`Failed to fetch stats for ${name}`);
    return response.json();
  };

  const fetchComparison = async () => {
    if (!player1 || !player2) {
      setError("Please enter both player names.");
      return;
    }

    setIsLoading(true);
    setComparisonData(null);
    setError(null);

    try {
      const [data1, data2] = await Promise.all([
        fetchPlayerStats(player1),
        fetchPlayerStats(player2),
      ]);

      setComparisonData({ player1: data1, player2: data2 });
    } catch (err) {
      console.error("Comparison error:", err);
      setError("Failed to fetch player comparison. Please check the names and try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">
          NBA Player Comparison
        </h1>

        <div className="bg-white shadow-lg rounded-lg p-6 mb-8">
          <div className="flex flex-col sm:flex-row gap-4">
            <input
              type="text"
              value={player1}
              onChange={(e) => setPlayer1(e.target.value)}
              placeholder="Enter first player (e.g., LeBron James)"
              className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:ring-orange-500"
            />
            <input
              type="text"
              value={player2}
              onChange={(e) => setPlayer2(e.target.value)}
              placeholder="Enter second player (e.g., Kevin Durant)"
              className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:ring-orange-500"
            />
            <button
              onClick={fetchComparison}
              disabled={isLoading}
              className="px-6 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 disabled:opacity-50"
            >
              {isLoading ? "Comparing..." : "Compare"}
            </button>
          </div>
          {error && <p className="mt-4 text-red-500 text-center">{error}</p>}
        </div>

        {comparisonData && (
          <div className="bg-white shadow-lg rounded-lg p-6">
            <h2 className="text-2xl font-semibold text-gray-800 text-center mb-6">
              {comparisonData.player1.name} vs {comparisonData.player2.name}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[comparisonData.player1, comparisonData.player2].map((player, idx) => (
                <div key={idx} className="space-y-4 text-center">
                  <h3 className="text-xl font-semibold text-orange-500">{player.name}</h3>
                  <p className="text-gray-700"><strong>Team:</strong> {player.team}</p>
                  <p className="text-gray-700"><strong>Position:</strong> {player.position}</p>
                  <div className="bg-gray-50 p-4 rounded-lg mt-4">
                    <p><strong>Points/Game:</strong> {player.stats.points}</p>
                    <p><strong>Rebounds/Game:</strong> {player.stats.rebounds}</p>
                    <p><strong>Assists/Game:</strong> {player.stats.assists}</p>
                    <p><strong>Steals/Game:</strong> {player.stats.steals}</p>
                    <p><strong>Blocks/Game:</strong> {player.stats.blocks}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ComparisonPage;
