import React, { useState } from "react";

const LookupPage = () => {
    const [playerName, setPlayerName] = useState("");
    const [playerDetails, setPlayerDetails] = useState(null);
    const [error, setError] = useState(null);

    const fetchPlayerDetails = async () => {
        if (!playerName) return;
        setPlayerDetails(null);
        setError(null);

        try {
            const response = await fetch(`http://localhost:8000/playerlookup/${playerName}`);
            const result = await response.json();

            console.log("Player Details Response:", result);
            if (result.error) {
                setError(result.error);
            } else {
                setPlayerDetails(result);
            }
        } catch (error) {
            console.error("Error fetching player details:", error);
            setError("Failed to fetch player data.");
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-3xl font-bold text-center text-gray-900 mb-8 animate-fade-in-down">
                    NBA Player Look-up
                </h1>

                <div className="bg-white shadow-lg rounded-lg p-6 mb-8">
                    <div className="flex flex-col sm:flex-row gap-4">
                        <input
                            type="text"
                            value={playerName}
                            onChange={(e) => setPlayerName(e.target.value)}
                            placeholder="Enter player name (e.g., LeBron James)"
                            className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                        />
                        <button
                            onClick={fetchPlayerDetails}
                            className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 transform hover:scale-105"
                        >
                            Search
                        </button>
                    </div>
                    {error && (
                        <p className="mt-4 text-red-600 text-center animate-fade-in">
                            {error}
                        </p>
                    )}
                </div>

                {playerDetails && (
                    <div className="bg-white shadow-lg rounded-lg p-6 animate-fade-in-up">
                        <div className="flex flex-col md:flex-row gap-6">
                            {playerDetails.nbaComHeadshot && (
                                <img
                                    src={playerDetails.nbaComHeadshot}
                                    alt="Player Headshot"
                                    className="w-48 h-48 object-cover rounded-full shadow-md mx-auto md:mx-0"
                                />
                            )}
                            <div className="flex-1">
                                <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                                    {playerDetails.longName}
                                </h2>
                                <p className="text-gray-700 mb-2">
                                    <span className="font-bold">Team:</span> {playerDetails.team}
                                </p>
                                <p className="text-gray-700 mb-2">
                                    <span className="font-bold">Position:</span> {playerDetails.pos}
                                </p>
                                <p className="text-gray-700 mb-2">
                                    <span className="font-bold">Height:</span> {playerDetails.height}
                                </p>
                                <p className="text-gray-700 mb-2">
                                    <span className="font-bold">Weight:</span> {playerDetails.weight}
                                </p>
                                <p className="text-gray-700 mb-4">
                                    <span className="font-bold">Birthdate:</span> {playerDetails.bDay}
                                </p>

                                {playerDetails.stats && (
                                    <div className="border-t pt-4">
                                        <h2 className="text-xl font-semibold text-gray-900 mb-3">
                                            Player Statistics
                                        </h2>
                                        <p className="text-gray-700 mb-2">
                                            <span className="font-bold">Points per Game (PPG):</span>{" "}
                                            {playerDetails.stats.pts || "N/A"}
                                        </p>
                                        <p className="text-gray-700 mb-2">
                                            <span className="font-bold">Rebounds:</span>{" "}
                                            {playerDetails.stats.reb || "N/A"}
                                        </p>
                                        <p className="text-gray-700">
                                            <span className="font-bold">Assists:</span>{" "}
                                            {playerDetails.stats.ast || "N/A"}
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