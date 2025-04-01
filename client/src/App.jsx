import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import { ClerkProvider, SignedIn, SignedOut, RedirectToSignIn } from "@clerk/clerk-react";

import Navigation from "./components/Navigation";
import HomePage from "./components/HomePage";
import ComparisonPage from "./components/ComparisonPage";
import DuelPage from "./components/DuelPage";
import ProfilePage from "./components/ProfilePage";
import LookupPage from "./components/LookUpPage";
import LoginPage from "./components/LogInPage";
import RegisterPage from "./components/RegisterPage";
import Chatbot from "./components/ChatBot";
function App() {
  return (
    <Router>
      <Navigation />
      <Chatbot/>
      <AuthRedirect /> {/* Auto-redirects to login if not signed in */}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/look-up" element={<LookupPage />} />
        <Route path="/comparison" element={<ComparisonPage />} />
        <Route path="/duel" element={<DuelPage />} />
      
        <Route
          path="/myprofile"
          element={
            <SignedIn>
              <ProfilePage />
            </SignedIn>
          }
        />
        <Route
          path="/myprofile"
          element={
            <SignedOut>
              <RedirectToSignIn />
            </SignedOut>
          }
        />

        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Routes>
    </Router>
  );
}

// Auto-redirect users to login if they aren't signed in
const AuthRedirect = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("clerk-user")) {
      navigate("/login");
    }
  }, []);

  return null;
};

export default App;
