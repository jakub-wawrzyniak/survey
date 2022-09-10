import { BrowserRouter } from "react-router-dom";
import styled, { createGlobalStyle } from "styled-components";
import { AppRoutes } from "./router";
import { PageSelector } from "./components/PageSelector";
import background from "/src/assets/questionareBackground.jpg";
import "./App.css";

const GlobalStyle = createGlobalStyle`
  body {
    overflow-y: scroll;
    background-image: url(${background});
  background-position: 50% 50%;
  background-repeat: no-repeat;
  background-size: cover;
  background-attachment: fixed;
  min-height: 100vh;
  min-width: 100%;
  display: flow-root;
  }
`;

export const Wrapper = styled.div`
  margin: 0 auto;
  width: 95%;
  max-width: 700px;
`;

function App() {
  return (
    <BrowserRouter>
      <PageSelector />
      <Wrapper>
        <AppRoutes />
      </Wrapper>
      <GlobalStyle />
    </BrowserRouter>
  );
}

export default App;
