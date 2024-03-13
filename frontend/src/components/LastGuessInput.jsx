import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGame } from "@/context/useGame";
import { patternGuess } from "@/utils";

const LastGuessInput = () => {
  const { totalPlayers, saveLastGuesses } = useGame();
  const [playerGuesses, setPlayerGuesses] = useState({});
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  // Dynamically initialize states based on totalPlayers
  useEffect(() => {
    const initialGuesses = {};
    const initialErrors = {};
    for (let i = 1; i <= totalPlayers; i++) {
      initialGuesses[`player${i}`] = "";
      initialErrors[`player${i}`] = false;
    }
    setPlayerGuesses(initialGuesses);
    setErrors(initialErrors);
  }, [totalPlayers]);

  const handleChange = (player, value) => {
    const isValid = patternGuess.test(value.toUpperCase());
    setPlayerGuesses((prev) => ({ ...prev, [player]: value.toUpperCase() }));
    setErrors((prev) => ({ ...prev, [player]: !isValid }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const allValid =
      Object.values(errors).every((error) => !error) &&
      Object.values(playerGuesses).every((guess) => patternGuess.test(guess)) &&
      Object.values(playerGuesses).every(
        (element, index) =>
          Object.values(playerGuesses).indexOf(element) === index
      );

    if (allValid) {
      saveLastGuesses(playerGuesses);
      navigate("/game-board");
    } else {
      alert("Please enter valid guesses for all players.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {Object.entries(playerGuesses).map(([player, guess], index) => (
        <div key={player}>
          <label htmlFor={`guess-${index}`}>
            Player {index + 1} Prediction:
          </label>
          <input
            id={`guess-${index}`}
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
