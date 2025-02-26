import React from "react";

const HomePage = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      {/* Centered Title */}
      <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8 animate-fade-in-down">
        NBA Stats Duel
      </h1>

      {/* Centered Image */}
      <div className="max-w-2xl w-full mb-8">
        <img
          src="../assets/NbaBg.png"
          alt="NBA Background"
          className="w-full h-auto rounded-lg shadow-lg transform transition-all duration-300 hover:scale-105 animate-fade-in"
        />
      </div>

      {/* Centered Description */}
      <div className="max-w-3xl text-center">
        <p className="text-lg md:text-xl text-gray-700 leading-relaxed animate-fade-in-up">
          Welcome to NBA Stats Duel, your ultimate source for NBA player
          statistics and trivia challenges. Explore our features and see how
          you can dive deep into the world of NBA stats.
        </p>
      </div>
    </div>
  );
};

export default HomePage;