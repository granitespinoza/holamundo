import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Robot } from "@/components/Robot";

const Index = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // For the beta version, always redirect to login page
    navigate('/login');
  }, [navigate]);

  // Show the original robot while redirecting
  return <Robot />;
};

export default Index;
