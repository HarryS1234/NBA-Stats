import { useUser, UserButton, SignOutButton } from "@clerk/clerk-react";

const ProfilePage = () => {
  const { user } = useUser();

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
            {/* Profile Picture from Clerk */}
            <img
              src={user?.imageUrl}
              alt="Profile Avatar"
              className="w-32 h-32 rounded-full shadow-md mb-4 object-cover transition-all duration-300 hover:scale-105"
            />
            
            {/* Display Name */}
            <h2 className="text-2xl font-semibold text-gray-900 mb-2">
              {user?.fullName || "User"}
            </h2>

            {/* Email */}
            <p className="text-gray-700">
              <span className="font-bold">Email:</span> {user?.primaryEmailAddress?.emailAddress}
            </p>

            {/* Clerk User Menu (Dropdown for Settings/Sign out) */}
            <UserButton className="mb-4" />

            {/* Custom Logout Button */}
            <SignOutButton>
              <button className="mt-4 bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-700 transition-all">
                Logout
              </button>
            </SignOutButton>
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
