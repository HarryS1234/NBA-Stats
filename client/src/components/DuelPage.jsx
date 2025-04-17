import React, { useState, useEffect } from "react";
import { useUser } from "@clerk/clerk-react";

const DuelPage = () => {
  const { user } = useUser();
  const [duelData, setDuelData] = useState(null);
  const [score, setScore] = useState(0);
  const [leaderboard, setLeaderboard] = useState([]);
  const [error, setError] = useState(null);

  const fetchNewDuel = async () => {
    try {
      const backendUrl = import.meta.env.VITE_BACKEND_URL || "http://localhost:8000";
      const response = await fetch(`${backendUrl}/duel`);
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

  const fetchLeaderboard = async () => {
    try {
      const backendUrl = import.meta.env.VITE_BACKEND_URL || "http://localhost:8000";
      const response = await fetch(`${backendUrl}/duel/leaderboard`);
      const data = await response.json();
      setLeaderboard(data);
    } catch (error) {
      console.error("Failed to load leaderboard");
    }
  };

  useEffect(() => {
    fetchNewDuel();
    fetchLeaderboard();
  }, []);

  const submitScore = async (finalScore) => {
    if (!user) return;

    try {
      const backendUrl = import.meta.env.VITE_BACKEND_URL || "http://localhost:8000";
      await fetch(`${backendUrl}/duel/score`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: user.id,
          username: user.fullName,
          profileImage: user.imageUrl,
          score: finalScore,
        }),
      });
      fetchLeaderboard();
    } catch (err) {
      console.error("Error submitting score:", err);
    }
  };

  const handleGuess = (guess) => {
    if (!duelData) return;

    const correct =
      (guess === "higher" && duelData.player1Stat > duelData.player2Stat) ||
      (guess === "lower" && duelData.player1Stat < duelData.player2Stat);

    if (correct) {
      setScore(score + 1);
      fetchNewDuel();
    } else {
      submitScore(score);
      setScore(0);
      alert("Wrong guess! Game over.");
      fetchNewDuel();
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8 flex flex-col items-center">
      <div className="max-w-3xl w-full">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-center text-gray-800 mb-6 animate-fade-in-down">
          NBA Stats Duel
        </h1>

        <h2 className="text-2xl font-semibold text-center text-orange-500 mb-8 animate-fade-in">
          SCORE: {score}
        </h2>

        {error && (
          <p className="text-red-500 text-center mb-6 animate-fade-in">
            {error}
          </p>
        )}

        {duelData && (
          <div className="bg-white shadow-xl rounded-lg p-6 animate-fade-in-up">
            <h3 className="text-lg font-semibold text-gray-800 text-center mb-6">
              Stat to Compare:{" "}
              <span className="font-bold text-orange-500">
                {duelData.statCategory.toUpperCase()}
              </span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
              <div className="bg-gray-50 p-4 rounded-md shadow-sm">
                <h2 className="text-xl font-semibold text-gray-900 mb-2">
                  {duelData.player1.longName}
                </h2>
                <p className="text-gray-700">
                  <span className="font-bold">Team:</span>{" "}
                  {duelData.player1.team}
                </p>
                <p className="text-gray-700 mt-2">
                  <span className="font-bold">
                    {duelData.statCategory.toUpperCase()}:
                  </span>{" "}
                  {duelData.player1Stat}
                </p>
              </div>

              <h2 className="text-2xl font-bold text-gray-500 text-center hidden md:block">
                VS
              </h2>

              <div className="bg-gray-50 p-4 rounded-md shadow-sm">
                <h2 className="text-xl font-semibold text-gray-900 mb-2">
                  {duelData.player2.longName}
                </h2>
                <p className="text-gray-700">
                  <span className="font-bold">Team:</span>{" "}
                  {duelData.player2.team}
                </p>
                <p className="text-gray-700 mt-2">
                  <span className="font-bold">
                    {duelData.statCategory.toUpperCase()}:
                  </span>{" "}
                  ???
                </p>
              </div>
            </div>

            <div className="mt-6 flex justify-center gap-4">
              <button
                onClick={() => handleGuess("higher")}
                className="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-all duration-200"
              >
                Higher
              </button>
              <button
                onClick={() => handleGuess("lower")}
                className="px-6 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-all duration-200"
              >
                Lower
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Leaderboard */}
      <div className="bg-white mt-10 p-6 rounded-lg shadow-md w-full max-w-2xl">
        <h2 className="text-2xl font-bold mb-4 text-center text-orange-600">🏆 Top 5 Scores</h2>
        <ul className="space-y-4">
          {leaderboard.map((entry, idx) => (
            <li key={idx} className="flex items-center gap-4 border-b pb-2">
              <img src={entry.profileImage} className="w-10 h-10 rounded-full" alt="avatar" />
              <div className="flex-1">
                <p className="font-semibold">{entry.username}</p>
                <p className="text-sm text-gray-600">Score: {entry.score}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default DuelPage;
