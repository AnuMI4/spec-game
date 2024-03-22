import { useEffect, useState } from "react";
import { useGame } from "@/context/useGame";
import { convertGuessToCard, patternGuess } from "@/utils";

const LastGuessInputModal = ({ isOpen, onClose }) => {
  const { totalPlayers, saveLastGuesses, setLastGuessedCards } = useGame();
  const [playerGuesses, setPlayerGuesses] = useState({});
  const [errors, setErrors] = useState({});
  // const navigate = useNavigate();

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
  }, [totalPlayers, isOpen]);

  const handleChange = (player, value) => {
    const isValid = patternGuess.test(value.toUpperCase());
    setPlayerGuesses((prev) => ({ ...prev, [player]: value.toUpperCase() }));
    setErrors((prev) => ({ ...prev, [player]: !isValid }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const suits = Object.values(playerGuesses).map((guess) => guess[0]);
    const values = Object.values(playerGuesses).map((guess) => guess[1]);

    // Function to check if there are duplicates in an array
    const hasDuplicates = (array) => new Set(array).size !== array.length;

    const allValid =
      Object.values(errors).every((error) => !error) &&
      Object.values(playerGuesses).every((guess) => patternGuess.test(guess)) &&
      Object.values(playerGuesses).every(
        (element, index) =>
          Object.values(playerGuesses).indexOf(element) === index
      ) &&
      !hasDuplicates(suits) &&
      !hasDuplicates(values);

    if (allValid) {
      saveLastGuesses(playerGuesses);
      setLastGuessedCards(
        Object.values(playerGuesses).map((guess) => convertGuessToCard(guess))
      );
      onClose();
      setPlayerGuesses({});
    } else {
      alert("Please enter valid guesses for all players.");
    }
  };

  if (!isOpen) return null;

  console.log("playerGuesses: ", playerGuesses);

  return (
    <div className="modal-backdrop">
      <div className="modal-content">
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
      </div>
    </div>
  );
};

export default LastGuessInputModal;
