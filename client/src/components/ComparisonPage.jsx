import React, { useState } from "react";

const ComparisonPage = () => {
    const [player1, setPlayer1] = useState("");
    const [player2, setPlayer2] = useState("");
    const [comparisonData, setComparisonData] = useState(null);
    const [error, setError] = useState(null);

    const fetchComparison = async () => {
        if (!player1 || !player2) return;
        setComparisonData(null);
        setError(null);

        try {
            const response = await fetch(`http://localhost:8000/comparison/${player1}/${player2}`);
            const result = await response.json();

            if (result.message) {
                setError(result.message);
            } else {
                setComparisonData(result);
            }
        } catch (error) {
            setError("Failed to fetch player comparison.");
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-3xl font-bold text-center text-gray-900 mb-8 animate-fade-in-down">
                    NBA Player Comparison
                </h1>
                
                <div className="bg-white shadow-lg rounded-lg p-6 mb-8">
                    <div className="flex flex-col sm:flex-row gap-4">
                        <input
                            type="text"
                            value={player1}
                            onChange={(e) => setPlayer1(e.target.value)}
                            placeholder="Enter first player (e.g., LeBron James)"
                            className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                        />
                        <input
                            type="text"
                            value={player2}
                            onChange={(e) => setPlayer2(e.target.value)}
                            placeholder="Enter second player (e.g., Kevin Durant)"
                            className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                        />
                        <button
                            onClick={fetchComparison}
                            className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 transform hover:scale-105"
                        >
                            Compare
                        </button>
                    </div>
                    {error && (
                        <p className="mt-4 text-red-600 text-center animate-fade-in">
                            {error}
                        </p>
                    )}
                </div>

                {comparisonData && (
                    <div className="bg-white shadow-lg rounded-lg p-6 animate-fade-in-up">
                        <h2 className="text-2xl font-semibold text-gray-900 mb-4 text-center">
                            {comparisonData.player1.longName} vs {comparisonData.player2.longName}
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-3">
                                <p className="text-gray-700">
                                    <span className="font-bold">Team:</span> {comparisonData.player1.team}
                                </p>
                                <p className="text-gray-700">
                                    <span className="font-bold">PPG:</span> {comparisonData.player1.stats.pts}
                                </p>
                                <p className="text-gray-700">
                                    <span className="font-bold">Rebounds:</span> {comparisonData.player1.stats.reb}
                                </p>
                                <p className="text-gray-700">
                                    <span className="font-bold">Assists:</span> {comparisonData.player1.stats.ast}
                                </p>
                            </div>
                            <div className="space-y-3">
                                <p className="text-gray-700">
                                    <span className="font-bold">Team:</span> {comparisonData.player2.team}
                                </p>
                                <p className="text-gray-700">
                                    <span className="font-bold">PPG:</span> {comparisonData.player2.stats.pts}
                                </p>
                                <p className="text-gray-700">
                                    <span className="font-bold">Rebounds:</span> {comparisonData.player2.stats.reb}
                                </p>
                                <p className="text-gray-700">
                                    <span className="font-bold">Assists:</span> {comparisonData.player2.stats.ast}
                                </p>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ComparisonPage;