import { Outlet } from "react-router";
import { Wrapper, Container } from "./components/index";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router";

function App() {
  const [authenticated, setAuthenticated] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
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
    authenticate();
  }, []);

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
        navigate("login");
      } else {
        console.log("failed");
      }
    } catch {
      console.log("error");
    }
  };

  return (
    <>
      <Wrapper>
        <Container>
          <Outlet context={{ authenticated, setAuthenticated, logout }} />
        </Container>
      </Wrapper>
    </>
  );
}

export default App;
