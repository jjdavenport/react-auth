import { Outlet } from "react-router";
import { Wrapper, Container } from "./components/index";

function App() {
  return (
    <>
      <Wrapper>
        <Container>
          <Outlet />
        </Container>
      </Wrapper>
    </>
  );
}

export default App;
