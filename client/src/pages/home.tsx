import { useNavigate } from "react-router";

export const Home = () => {
  const navigate = useNavigate();

  const logout = async () => {
    try {
      const response = await fetch("/api/logout/", {
        method: "POST",
        headers: { "content-type": "application/json" },
      });
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
