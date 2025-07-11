import { useEffect } from "react";
import { useNavigate } from "react-router";

type Prop = {
  authenticated: () => void;
};

const useAuth = ({ authenticated }: Prop) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!authenticated) {
      navigate("/login/");
    }
  }, [authenticated, navigate]);

  return {
    authenticated,
  };
};

export default useAuth;
