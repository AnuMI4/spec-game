import { useNavigate } from "react-router-dom";
import { useGame } from "../context/useGame";
import GameModeSelection from "./GameModeSelection";
import LastGuessInput from "./LastGuessInput";

const GameSetup = () => {
  const { setGameMode, gameStarted, setGameStarted, saveLastGuesses } =
    useGame();
  let navigate = useNavigate();

  const handleModeSelection = (mode) => {
    setGameMode(mode);
    setGameStarted(true);
    navigate("/last-guess");
  };

  if (!gameStarted) {
    return <GameModeSelection onModeSelected={handleModeSelection} />;
  }

  return (
    <LastGuessInput
      onGuessesSubmitted={(guesses) => {
        saveLastGuesses(guesses);
        navigate("/game");
      }}
    />
  );
};

export default GameSetup;
