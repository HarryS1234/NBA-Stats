import { SignUp } from "@clerk/clerk-react";

const RegisterPage = () => {
  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <SignUp path="/register" />
    </div>
  );
};

export default RegisterPage;
