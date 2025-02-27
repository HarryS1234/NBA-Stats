import { SignOutButton } from "@clerk/clerk-react";

const Logout = () => {
  return (
    <div className="flex justify-center mt-4">
      <SignOutButton>
        <button className="bg-red-500 text-white px-4 py-2 rounded">
          Logout
        </button>
      </SignOutButton>
    </div>
  );
};

export default Logout;
