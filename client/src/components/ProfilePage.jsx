import React, { useEffect, useState } from "react";

const ProfilePage = () => {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    fetch("http://localhost:8000/profile")
      .then((response) => response.json())
      .then((data) => setProfile(data))
      .catch((error) => console.error("Error fetching profile:", error));
  }, []);

  if (!profile) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <p className="text-gray-600 text-lg animate-pulse">Loading profile...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden animate-fade-in-up">
        <div className="flex flex-col md:flex-row">
          {/* Left Section - Profile Image & Username */}
          <div className="md:w-1/3 bg-gray-50 p-6 flex flex-col items-center text-center">
            <img
              src={profile.avatar}
              alt="Profile Avatar"
              className="w-32 h-32 rounded-full shadow-md mb-4 object-cover transition-all duration-300 hover:scale-105"
            />
            <h2 className="text-2xl font-semibold text-gray-900 mb-2">
              {profile.username}
            </h2>
            <p className="text-gray-700">
              <span className="font-bold">Email:</span> {profile.email}
            </p>
          </div>

          {/* Right Section - General Information */}
          <div className="md:w-2/3 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              General Information
            </h2>
            <div className="space-y-3 text-gray-700">
              <p>Placeholder Info 1</p>
              <p>Placeholder Info 2</p>
              <p>Placeholder Info 3</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ProfilePage;