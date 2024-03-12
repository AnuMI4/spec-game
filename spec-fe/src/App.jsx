import { GameProvider } from "./context/GameContext";
import { HashRouter as Router, Route, Routes } from "react-router-dom";
import GameBoard from "./components/GameBoard";
import GameModeSelection from "./components/GameModeSelection";
import LastGuessInput from "./components/LastGuessInput";

function App() {
  return (
    <GameProvider>
      <Router>
        <div className="App">
          <h1>Welcome to the Game</h1>

          <Routes>
            <Route path="/" element={<GameModeSelection />} />
            <Route path="/last-guess" element={<LastGuessInput />} />
            <Route path="/game-board" element={<GameBoard />} />
          </Routes>
        </div>
      </Router>
    </GameProvider>
  );
}

export default App;
