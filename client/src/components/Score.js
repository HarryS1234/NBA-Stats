import React from "react";

const Score = ({ score }) => {
  return (
    <div className="inline-block bg-blue-600 text-white px-4 py-2 rounded-full shadow-md transition-all duration-300 hover:bg-blue-700 hover:shadow-lg animate-fade-in">
      <h3 className="text-lg font-semibold">Score: {score}</h3>
    </div>
  );
};

export default Score;