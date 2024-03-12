import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { GameContext } from "../context/GameContext";

const GameModeSelection = () => {
  const { chooseGameMode } = useContext(GameContext);
  let navigate = useNavigate();

  const handleModeSelection = (mode) => {
    chooseGameMode(mode);
    navigate(mode === "2-player" ? "/last-guess" : "/game-board");
  };

  return (
    <>
      <h2>Select Game Mode</h2>
      <div className="game-mode-selection">
        <button onClick={() => handleModeSelection("computer")}>
          Computer vs Computer
        </button>
        <button onClick={() => handleModeSelection("2-player")}>
          2 Player
        </button>
        <button onClick={() => handleModeSelection("3-player")}>
          3 Player
        </button>
        <button onClick={() => handleModeSelection("4-player")}>
          4 Player
        </button>
      </div>
    </>
  );
};

export default GameModeSelection;
