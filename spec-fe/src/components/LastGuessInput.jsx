import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { patternGuess } from "../utils";
import { useGame } from "../context/useGame";

const LastGuessInput = () => {
  const { saveLastGuesses } = useGame();
  const [playerGuesses, setPlayerGuesses] = useState({
    player1: "",
    player2: "",
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleChange = (player, value) => {
    setPlayerGuesses((prev) => ({ ...prev, [player]: value.toUpperCase() }));
    setErrors((prev) => ({
      ...prev,
      [player]: !patternGuess.test(value.toUpperCase()),
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      Object.values(errors).every((v) => !v) &&
      Object.values(playerGuesses).every((v) => patternGuess.test(v))
    ) {
      saveLastGuesses(playerGuesses);
      navigate("/game-board");
    } else {
      alert("Please enter valid guesses for both players.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Inputs for player 1 and player 2 guesses with error handling */}
      {Object.entries(playerGuesses).map(([player, guess], index) => (
        <div key={player}>
          <label>Player {index + 1} Guess:</label>
          <input
            type="text"
            value={guess}
            onChange={(e) => handleChange(player, e.target.value)}
            className={errors[player] ? "error" : ""}
          />
          {errors[player] && <p className="error">Invalid guess</p>}
        </div>
      ))}
      <button type="submit">Submit Guesses</button>
    </form>
  );
};

export default LastGuessInput;
