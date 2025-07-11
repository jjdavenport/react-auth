import { useEffect } from "react";
import { useNavigate } from "react-router";

const useAuth = (authenticated: boolean) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (authenticated === false) {
      navigate("/login/");
    }
  }, [authenticated, navigate]);

  return {
    authenticated,
  };
};

export default useAuth;
