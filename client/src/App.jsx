import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navigation from "./components/Navigation";
import HomePage from "./components/HomePage";
import ComparisonPage from "./components/ComparisonPage";
import DuelPage from "./components/DuelPage";
import ProfilePage from "./components/ProfilePage";
import LookUpPage from "./components/LookUpPage"; // Updated to match exact file name

function App() {
  return (
    <Router>
      <Navigation />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/lookup" element={<LookUpPage />} /> {/* Updated to use LookUpPage */}
        <Route path="/comparison" element={<ComparisonPage />} />
        <Route path="/duel" element={<DuelPage />} />
        <Route path="/profile" element={<ProfilePage />} />
      </Routes>
    </Router>
  );
}

export default App;