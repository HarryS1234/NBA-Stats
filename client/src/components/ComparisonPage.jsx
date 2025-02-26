import React, { useState } from "react";

const ComparisonPage = () => {
    const [player1, setPlayer1] = useState("");
    const [player2, setPlayer2] = useState("");
    const [comparisonData, setComparisonData] = useState(null);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false); // Added loading state

    const fetchComparison = async () => {
        if (!player1 || !player2) {
            setError("Please enter both player names.");
            return;
        }

        setIsLoading(true); // Start loading
        setComparisonData(null);
        setError(null);

        try {
            const response = await fetch(`http://localhost:8000/comparison/${player1}/${player2}`);
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const result = await response.json();
            console.log("Comparison Response:", result);

            if (result.message) {
                setError(result.message);
            } else {
                setComparisonData(result);
            }
        } catch (error) {
            console.error("Error fetching player comparison:", error);
            setError("Failed to fetch player comparison. Please try again.");
        } finally {
            setIsLoading(false); // Stop loading
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
                {/* Title */}
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-center text-gray-800 mb-8 animate-fade-in-down">
                    NBA Player Comparison
                </h1>

                {/* Search Bar and Button */}
                <div className="bg-white shadow-lg rounded-lg p-6 mb-8 animate-fade-in-up">
                    <div className="flex flex-col sm:flex-row gap-4">
                        <input
                            type="text"
                            value={player1}
                            onChange={(e) => setPlayer1(e.target.value)}
                            placeholder="Enter first player (e.g., LeBron James)"
                            className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200 placeholder:text-gray-400"
                        />
                        <input
                            type="text"
                            value={player2}
                            onChange={(e) => setPlayer2(e.target.value)}
                            placeholder="Enter second player (e.g., Kevin Durant)"
                            className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200 placeholder:text-gray-400"
                        />
                        <button
                            onClick={fetchComparison}
                            disabled={isLoading} // Disable button while loading
                            className="px-6 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 transition-all duration-200 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isLoading ? "Comparing..." : "Compare"}
                        </button>
                    </div>
                    {error && (
                        <p className="mt-4 text-red-500 text-center animate-fade-in">
                            {error}
                        </p>
                    )}
                </div>

                {/* Comparison Results */}
                {comparisonData && (
                    <div className="bg-white shadow-lg rounded-lg p-6 animate-fade-in-up">
                        <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
                            {comparisonData.player1.longName} vs {comparisonData.player2.longName}
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Player 1 Stats */}
                            <div className="space-y-4">
                                <div className="text-center">
                                    <h3 className="text-xl font-semibold text-orange-500 mb-2">
                                        {comparisonData.player1.longName}
                                    </h3>
                                    <p className="text-gray-700">
                                        <span className="font-bold">Team:</span> {comparisonData.player1.team}
                                    </p>
                                </div>
                                <div className="bg-gray-50 p-4 rounded-lg">
                                    <p className="text-gray-700">
                                        <span className="font-bold">PPG:</span> {comparisonData.player1.stats.pts || "N/A"}
                                    </p>
                                    <p className="text-gray-700">
                                        <span className="font-bold">Rebounds:</span> {comparisonData.player1.stats.reb || "N/A"}
                                    </p>
                                    <p className="text-gray-700">
                                        <span className="font-bold">Assists:</span> {comparisonData.player1.stats.ast || "N/A"}
                                    </p>
                                </div>
                            </div>

                            {/* Player 2 Stats */}
                            <div className="space-y-4">
                                <div className="text-center">
                                    <h3 className="text-xl font-semibold text-orange-500 mb-2">
                                        {comparisonData.player2.longName}
                                    </h3>
                                    <p className="text-gray-700">
                                        <span className="font-bold">Team:</span> {comparisonData.player2.team}
                                    </p>
                                </div>
                                <div className="bg-gray-50 p-4 rounded-lg">
                                    <p className="text-gray-700">
                                        <span className="font-bold">PPG:</span> {comparisonData.player2.stats.pts || "N/A"}
                                    </p>
                                    <p className="text-gray-700">
                                        <span className="font-bold">Rebounds:</span> {comparisonData.player2.stats.reb || "N/A"}
                                    </p>
                                    <p className="text-gray-700">
                                        <span className="font-bold">Assists:</span> {comparisonData.player2.stats.ast || "N/A"}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ComparisonPage;