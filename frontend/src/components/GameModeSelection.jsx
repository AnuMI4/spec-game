import { useNavigate } from "react-router-dom";
import { useGame } from "@/context/useGame";

const GameModeSelection = () => {
  const { setTotalPlayers } = useGame();
  let navigate = useNavigate();

  const handleModeSelection = (playerCount, isComp = false) => {
    setTotalPlayers(playerCount);
    navigate("/game-board");
  };

  return (
    <>
      <h1>Welcome to the Game</h1>
      <h2>Select Game Mode</h2>
      <div className="game-mode-selection">
        <button onClick={() => handleModeSelection(2, true)}>Computer vs Player</button>
        <button onClick={() => handleModeSelection(2)}>2 Player</button>
        <button onClick={() => handleModeSelection(3)}>3 Player</button>
        <button onClick={() => handleModeSelection(4)}>4 Player</button>
      </div>
    </>
  );
};

export default GameModeSelection;
