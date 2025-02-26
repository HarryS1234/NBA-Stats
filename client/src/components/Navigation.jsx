import React from "react";
import { Link } from "react-router-dom";

const Navigation = () => {
  return (
    <nav className="bg-gray-800 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo on the left */}
          <div className="flex-shrink-0">
            <Link to="/">
              <img
                src="../assets/logo.png"
                alt="Logo"
                className="h-10 w-auto transition-all duration-300 hover:scale-105"
              />
            </Link>
          </div>

          {/* Centered Title */}
          <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2">
            <h1 className="text-2xl font-bold text-white animate-fade-in">
              NBA Stats Duel
            </h1>
          </div>

          {/* Links on the right */}
          <div className="flex items-center">
            <ul className="flex space-x-6">
              <li>
                <Link
                  to="/"
                  className="text-gray-300 hover:text-white hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium transition-all duration-200"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/lookup"
                  className="text-gray-300 hover:text-white hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium transition-all duration-200"
                >
                  Look-up
                </Link>
              </li>
              <li>
                <Link
                  to="/comparison"
                  className="text-gray-300 hover:text-white hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium transition-all duration-200"
                >
                  Comparison
                </Link>
              </li>
              <li>
                <Link
                  to="/duel"
                  className="text-gray-300 hover:text-white hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium transition-all duration-200"
                >
                  Duel
                </Link>
              </li>
              <li>
                <Link
                  to="/profile"
                  className="text-gray-300 hover:text-white hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium transition-all duration-200"
                >
                  My Profile
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;