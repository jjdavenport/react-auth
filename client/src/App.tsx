import { Outlet, useLocation } from "react-router";
import { Wrapper, Container } from "./components/index";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router";

function App() {
  const [authenticated, setAuthenticated] = useState<boolean>(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const authenticate = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          "https://react-auth-hlgr.onrender.com/api/login/status/",
          { credentials: "include" },
        );
        const result = await response.json();
        setAuthenticated(result.loggedIn);
        if (!result.loggedIn && location.pathname !== "/login/") {
          navigate("/login/");
        }
      } catch {
        setAuthenticated(false);
        if (location.pathname !== "/login/") {
          navigate("/login/");
        }
      } finally {
        setLoading(false);
      }
    };
    authenticate();
  }, [location.pathname, navigate]);

  const logout = async () => {
    try {
      const response = await fetch(
        "https://react-auth-hlgr.onrender.com/api/authenticated/logout/",
        {
          method: "POST",
          credentials: "include",
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

  if (loading) return <span>Waiting for Server...</span>;

  return (
    <>
      <Wrapper>
        <Container>
          <Outlet context={{ authenticated, logout }} />
        </Container>
      </Wrapper>
    </>
  );
}

export default App;
