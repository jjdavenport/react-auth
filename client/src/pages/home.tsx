import { useNavigate, useOutletContext } from "react-router";
import { useEffect } from "react";

type OutletType = {
  authenticated: boolean;
  logout: () => void;
};

export const Home = () => {
  const { authenticated, logout } = useOutletContext<OutletType>();
  const navigate = useNavigate();

  useEffect(() => {
    if (authenticated === false) {
      navigate("/login/");
    }
  }, [authenticated, navigate]);

  return (
    <>
      <h1>Logged in!</h1>
      <button className="cursor-pointer" onClick={logout}>
        Log out
      </button>
    </>
  );
};
