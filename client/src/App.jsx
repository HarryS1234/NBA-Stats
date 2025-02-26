import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navigation from "./components/Navigation";
import HomePage from "./components/HomePage";
import ComparisonPage from "./components/ComparisonPage";
import DuelPage from "./components/DuelPage";
import ProfilePage from "./components/ProfilePage";
import LookupPage from "./components/LookUpPage";

function App() {
  return (
    <Router>
      <Navigation />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/look-up" element={<LookupPage />} />
        <Route path="/comparison" element={<ComparisonPage />} />
        <Route path="/duel" element={<DuelPage />} />
        <Route path="/myprofile" element={<ProfilePage />} /> {/* Changed from /myprofile to /profile */}
      </Routes>
    </Router>
  );
}

export default App;