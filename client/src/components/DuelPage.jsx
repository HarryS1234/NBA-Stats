import React, { useState, useEffect } from "react";

const DuelPage = () => {
    const [duelData, setDuelData] = useState(null);
    const [score, setScore] = useState(0);
    const [error, setError] = useState(null);

    const fetchNewDuel = async () => {
        try {
            const response = await fetch("http://localhost:8000/duel");
            const result = await response.json();

            if (result.message) {
                setError(result.message);
            } else {
                setDuelData(result);
            }
        } catch (error) {
            setError("Failed to fetch duel data.");
        }
    };

    useEffect(() => {
        fetchNewDuel(); // Fetch new duel on page load
    }, []);

    const handleGuess = (guess) => {
        if (!duelData) return;

        const correct =
            (guess === "higher" && duelData.player1Stat > duelData.player2Stat) ||
            (guess === "lower" && duelData.player1Stat < duelData.player2Stat);

        if (correct) {
            setScore(score + 1);
            fetchNewDuel(); // Load new duel
        } else {
            setScore(0); // Reset score on wrong guess
            alert("Wrong guess! Game over.");
            fetchNewDuel();
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
            <div className="max-w-3xl w-full">
                {/* Title */}
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-center text-gray-800 mb-6 animate-fade-in-down">
                    NBA Stats Duel
                </h1>

                {/* Score Display */}
                <h2 className="text-2xl font-semibold text-center text-orange-500 mb-8 animate-fade-in">
                    SCORE: {score}
                </h2>

                {/* Error Message */}
                {error && (
                    <p className="text-red-500 text-center mb-6 animate-fade-in">
                        {error}
                    </p>
                )}

                {/* Duel Cards */}
                {duelData && (
                    <div className="bg-white shadow-xl rounded-lg p-6 animate-fade-in-up">
                        {/* Stat Category */}
                        <h3 className="text-lg font-semibold text-gray-800 text-center mb-6">
                            Stat to Compare:{" "}
                            <span className="font-bold text-orange-500">{duelData.statCategory.toUpperCase()}</span>
                        </h3>

                        {/* Player Cards */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
                            {/* Player 1 Card */}
                            <div className="bg-gray-50 p-4 rounded-md shadow-sm transition-all duration-300 hover:shadow-md">
                                <h2 className="text-xl font-semibold text-gray-900 mb-2">
                                    {duelData.player1.longName}
                                </h2>
                                <p className="text-gray-700">
                                    <span className="font-bold">Team:</span> {duelData.player1.team}
                                </p>
                                <p className="text-gray-700 mt-2">
                                    <span className="font-bold">{duelData.statCategory.toUpperCase()}:</span> {duelData.player1Stat}
                                </p>
                            </div>

                            {/* VS Text */}
                            <h2 className="text-2xl font-bold text-gray-500 text-center hidden md:block">
                                VS
                            </h2>

                            {/* Player 2 Card */}
                            <div className="bg-gray-50 p-4 rounded-md shadow-sm transition-all duration-300 hover:shadow-md">
                                <h2 className="text-xl font-semibold text-gray-900 mb-2">
                                    {duelData.player2.longName}
                                </h2>
                                <p className="text-gray-700">
                                    <span className="font-bold">Team:</span> {duelData.player2.team}
                                </p>
                                <p className="text-gray-700 mt-2">
                                    <span className="font-bold">{duelData.statCategory.toUpperCase()}:</span> ???
                                </p>
                            </div>
                        </div>

                        {/* Guess Buttons */}
                        <div className="mt-6 flex justify-center gap-4">
                            <button
                                onClick={() => handleGuess("higher")}
                                className="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-all duration-200 transform hover:scale-105"
                            >
                                Higher
                            </button>
                            <button
                                onClick={() => handleGuess("lower")}
                                className="px-6 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-all duration-200 transform hover:scale-105"
                            >
                                Lower
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default DuelPage;