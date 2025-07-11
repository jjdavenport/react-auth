import { useNavigate } from "react-router";
import useAuth from "../hooks/auth-provider";
import { useEffect, useState } from "react";

export const Home = () => {
  const [authenticated, setAuthenticated] = useState<boolean | null>(null);
  const navigate = useNavigate();

  const authenticate = async () => {
    try {
      const response = await fetch(
        "https://react-auth-hlgr.onrender.com/api/login/status/",
        {
          credentials: "include",
        },
      );
      const result = await response.json();
      setAuthenticated(result.loggedIn);
    } catch {
      setAuthenticated(false);
    }
  };

  useEffect(() => {
    authenticate();
  }, []);

  useAuth(authenticated);

  const logout = async () => {
    try {
      const response = await fetch(
        "https://react-auth-hlgr.onrender.com/api/authenticated/logout/",
        {
          method: "POST",
          headers: { "content-type": "application/json" },
        },
      );
      if (response.ok) {
        navigate("/login/");
      } else {
        console.log("failed");
      }
    } catch {
      console.log("error");
    }
  };

  return (
    <>
      <h1>Logged in!</h1>
      <button className="cursor-pointer" onClick={logout}>
        Log out
      </button>
    </>
  );
};
