import { GameProvider } from "./context/GameContext";
import { HashRouter as Router } from "react-router-dom";
import Layout from "./components/Layout";

function App() {
  return (
    <GameProvider>
      <Router>
        <div className="App">
          <Layout />
        </div>
      </Router>
    </GameProvider>
  );
}

export default App;
