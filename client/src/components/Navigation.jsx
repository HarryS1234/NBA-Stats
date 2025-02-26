import React, { useState } from "react";
import { Link } from "react-router-dom";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-gradient-to-r from-orange-500 via-yellow-400 to-orange-500 shadow-xl sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo on the left - Larger and Animated */}
          <div className="flex-shrink-0">
            <Link to="/" className="flex items-center">
              <img
                src="../assets/logo.png"
                alt="NBA Stats Duel Logo"
                className="h-16 w-auto transform transition-all duration-500 hover:rotate-12 hover:scale-110"
              />
              <span className="ml-3 text-2xl font-extrabold text-white drop-shadow-md hidden md:block animate-pulse-slow">
                NBA Stats Duel
              </span>
            </Link>
          </div>

          {/* Links on the right (Desktop) */}
          <div className="hidden lg:flex items-center">
            <ul className="flex space-x-8">
              {["Home", "Look-up", "Comparison", "Duel", "My Profile"].map((item) => (
                <li key={item}>
                  <Link
                    to={item === "Home" ? "/" : `/${item.toLowerCase().replace(" ", "")}`}
                    className="relative text-white text-lg font-semibold px-4 py-2 rounded-lg transition-all duration-300 hover:bg-dark-blue hover:text-yellow-300 group"
                  >
                    {item}
                    <span className="absolute bottom-0 left-0 w-0 h-1 bg-yellow-300 transition-all duration-300 group-hover:w-full"></span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-white hover:text-dark-blue focus:outline-none p-2 rounded-full bg-orange-600 transition-all duration-300 hover:bg-yellow-400"
              aria-label="Toggle menu"
            >
              <svg
                className="h-8 w-8"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                {isOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16m-7 6h7"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu (Dropdown) */}
        {isOpen && (
          <div className="lg:hidden bg-dark-blue px-4 pt-4 pb-6 animate-slide-down">
            <ul className="flex flex-col space-y-4">
              {["Home", "Look-up", "Comparison", "Duel", "My Profile"].map((item) => (
                <li key={item}>
                  <Link
                    to={item === "Home" ? "/" : `/${item.toLowerCase().replace(" ", "")}`}
                    className="text-white text-lg font-semibold block px-4 py-3 rounded-md bg-orange-600 hover:bg-yellow-400 hover:text-dark-blue transition-all duration-300"
                    onClick={() => setIsOpen(false)}
                  >
                    {item}

                    </Link>
                  </li>
                ))}
            </ul>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;