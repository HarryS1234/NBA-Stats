import React from "react";
import { useNavigate } from "react-router-dom"; // Import for navigation

const HomePage = () => {
  const navigate = useNavigate(); // Hook to handle navigation

  // Function to handle navigation to the Duel page
  const handleGetStarted = () => {
    navigate("/duel"); // Navigate to the Duel page
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center bg-no-repeat flex flex-col items-center justify-center py-16 px-4 sm:px-6 lg:px-8"
      style={{ backgroundImage: "url('/assets/NbaBg.png')" }} // Background image
    >
      {/* Content Container with Gradient Overlay */}
      <div className="relative z-10 text-center max-w-4xl mx-auto bg-gradient-to-b from-black/60 to-black/10 rounded-lg p-8 backdrop-blur-sm border border-white/20 shadow-[0_0_20px_rgba(255,165,0,0.5)]">
        {/* Title with Glow Effect */}
        <h1 className="text-5xl sm:text-6xl lg:text-7xl text-white font-extrabold mb-8 animate-fade-in-down tracking-tight drop-shadow-[0_0_10px_rgba(255,165,0,0.8)]">
          NBA Stats Duel
        </h1>

        {/* Description with Shadow */}
        <p className="text-xl sm:text-2xl lg:text-3xl text-white font-medium leading-relaxed animate-fade-in-up max-w-3xl mx-auto px-4 drop-shadow-[0_0_6px_rgba(0,0,0,0.8)]">
          Dive into the ultimate NBA experience! Explore player stats, test your
          knowledge with trivia challenges, and compete like a pro.
        </p>

        {/* Call-to-Action Button */}
        <div className="mt-10 animate-fade-in-up delay-200">
          <button
            onClick={handleGetStarted}
            className="px-8 py-3 bg-orange-500 text-white text-lg font-semibold rounded-full shadow-lg hover:bg-orange-600 transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 border border-orange-300 hover:border-orange-500"
          >
            Get Started
          </button>
        </div>
      </div>
    </div>
  );
};

export default HomePage;