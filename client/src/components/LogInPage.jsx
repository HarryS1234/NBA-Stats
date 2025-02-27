import { SignIn } from "@clerk/clerk-react";
import { useAuth } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const LoginPage = () => {
  const { isSignedIn } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isSignedIn) {
      navigate("/myprofile"); // Redirect to profile after login
    }
  }, [isSignedIn, navigate]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <SignIn path="/login" />
    </div>
  );
};

export default LoginPage;
