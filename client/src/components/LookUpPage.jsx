import React, { useState } from "react";

const LookupPage = () => {
    const [playerName, setPlayerName] = useState("");
    const [playerDetails, setPlayerDetails] = useState(null);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const fetchPlayerDetails = async () => {
        if (!playerName) {
            setError("Please enter a player name.");
            return;
        }

        setIsLoading(true);
        setPlayerDetails(null);
        setError(null);

        try {
            const backendUrl = import.meta.env.VITE_BACKEND_URL || "http://localhost:8000";
            const response = await fetch(`${backendUrl}/api/playerstats/${encodeURIComponent(playerName)}`);
            
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const result = await response.json();
            console.log("Player Details Response:", result);

            if (result.error) {
                setError(result.error);
            } else {
                setPlayerDetails(result);
            }
        } catch (error) {
            console.error("Error fetching player details:", error);
            setError("Failed to fetch player data. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
                {/* Title */}
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-center text-gray-800 mb-8 animate-fade-in-down">
                    NBA Player Look-up
                </h1>

                {/* Search Bar and Button */}
                <div className="bg-white shadow-lg rounded-lg p-6 mb-8 animate-fade-in-up">
                    <div className="flex flex-col sm:flex-row gap-4">
                        <input
                            type="text"
                            value={playerName}
                            onChange={(e) => setPlayerName(e.target.value)}
                            placeholder="Enter player name (e.g., LeBron James)"
                            className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200 placeholder:text-gray-400"
                        />
                        <button
                            onClick={fetchPlayerDetails}
                            disabled={isLoading}
                            className="px-6 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 transition-all duration-200 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isLoading ? "Searching..." : "Search"}
                        </button>
                    </div>
                    {error && (
                        <p className="mt-4 text-red-500 text-center animate-fade-in">
                            {error}
                        </p>
                    )}
                </div>

                {/* Player Details Section */}
                {playerDetails && (
                    <div className="bg-white shadow-lg rounded-lg p-6 animate-fade-in-up">
                        <div className="flex flex-col md:flex-row gap-6">
                            <div className="flex-1">
                                <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                                    {playerDetails.name}
                                </h2>
                                <p className="text-gray-700 mb-2">
                                    <span className="font-bold">Team:</span> {playerDetails.team}
                                </p>
                                <p className="text-gray-700 mb-2">
                                    <span className="font-bold">Position:</span> {playerDetails.position}
                                </p>

                                {playerDetails.stats && (
                                    <div className="border-t border-gray-200 pt-4">
                                        <h2 className="text-xl font-semibold text-gray-800 mb-3">
                                            Season Averages (Per Game)
                                        </h2>
                                        <p className="text-gray-700 mb-2">
                                            <span className="font-bold">Points per Game:</span> {playerDetails.stats.points || "N/A"}
                                        </p>
                                        <p className="text-gray-700 mb-2">
                                            <span className="font-bold">Rebounds per Game:</span> {playerDetails.stats.rebounds || "N/A"}
                                        </p>
                                        <p className="text-gray-700 mb-2">
                                            <span className="font-bold">Assists per Game:</span> {playerDetails.stats.assists || "N/A"}
                                        </p>
                                        <p className="text-gray-700 mb-2">
                                            <span className="font-bold">Steals per Game:</span> {playerDetails.stats.steals || "N/A"}
                                        </p>
                                        <p className="text-gray-700 mb-2">
                                            <span className="font-bold">Blocks per Game:</span> {playerDetails.stats.blocks || "N/A"}
                                        </p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default LookupPage;
