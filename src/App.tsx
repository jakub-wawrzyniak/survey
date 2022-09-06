import { BrowserRouter } from "react-router-dom";
import { AppRoutes } from "./router";
import { PageSelector } from "./components/PageSelector";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <main id="quest">
        <PageSelector />
        <div id="questContainer">
          <AppRoutes />
        </div>
      </main>
    </BrowserRouter>
  );
}

export default App;
