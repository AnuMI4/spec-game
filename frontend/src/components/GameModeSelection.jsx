import { useNavigate } from "react-router-dom";
import { useGame } from "@/context/useGame";
import GameGuide from "./modals/GameGuide";
import { useState } from "react";

const GameModeSelection = () => {
  const { setTotalPlayers, set, setGameMode } = useGame();
  const [showGameGuide, setShowGameGuide] = useState(false);
  let navigate = useNavigate();

  const handleModeSelection = (playerCount, isComp = false) => {
    setTotalPlayers(playerCount);
    setGameMode(isComp ? 'PvC' : 'PvP');
    navigate("/game-board");
  };

  const openGuide = () => {
    setShowGameGuide(true);
  }

  return (
    <>
      <h1>SPEC</h1>
      <h1>Welcome to the Game</h1>
      <h2>Select Game Mode</h2>
      <div className="game-mode-selection">
        <button onClick={() => handleModeSelection(2, true)}>Computer vs Player</button>
        <button onClick={() => handleModeSelection(2)}>2 Player</button>
        <button onClick={() => handleModeSelection(3)}>3 Player</button>
        <button onClick={() => handleModeSelection(4)}>4 Player</button>
      </div>
      <div className="game-guide">
        <b>To view the Game Guide</b><button onClick={openGuide}>Click here</button>
      </div>
      <GameGuide 
        isOpen={showGameGuide}
        onClose={() => setShowGameGuide(false)}
      />
    </>
  );
};

export default GameModeSelection;
