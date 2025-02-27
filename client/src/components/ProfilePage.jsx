import { useUser, useClerk, UserProfile } from "@clerk/clerk-react";
import { useState } from "react";

const ProfilePage = () => {
  const { user } = useUser();
  const { signOut } = useClerk();
  const [showUpload, setShowUpload] = useState(false);

  if (!user) {
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
            {/* Profile Picture */}
            <img
              src={user?.imageUrl}
              alt="Profile Avatar"
              className="w-32 h-32 rounded-full shadow-md mb-4 object-cover transition-all duration-300 hover:scale-105"
            />

            {/* Upload Button */}
            <button
              onClick={() => setShowUpload(!showUpload)}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-all mb-4"
            >
              {showUpload ? "Close Upload" : "Change Profile Picture"}
            </button>

            {showUpload && (
              <div className="w-full flex justify-center">
                <UserProfile path="/profile" routing="path" />
              </div>
            )}

            {/* Display Name */}
            <h2 className="text-2xl font-semibold text-gray-900 mb-2">
              {user?.fullName || "User"}
            </h2>

            {/* Email */}
            <p className="text-gray-700">
              <span className="font-bold">Email:</span>{" "}
              {user?.primaryEmailAddress?.emailAddress}
            </p>

            {/* Logout Button */}
            <button
              onClick={() => signOut()}
              className="mt-4 bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-lg transition-all duration-300"
            >
              Logout
            </button>
          </div>

          {/* Right Section - General Information */}
          <div className="md:w-2/3 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              General Information
            </h2>
            <div className="space-y-3 text-gray-700">
              <p>Account Created: {new Date(user?.createdAt).toLocaleDateString()}</p>
              <p>User ID: {user?.id}</p>
              <p>Status: {user?.username ? "Verified" : "Guest"}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
