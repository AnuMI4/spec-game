import { useEffect, useState } from "react";
import { useGame } from "@/context/useGame";
import { convertGuessToCard } from "@/utils";
import CardRanks from "../CardRanks";
import CardSuits from "../CardSuits";

const LastGuessInputModal = ({ isOpen, onClose }) => {
  const { totalPlayers, saveLastGuesses, setLastGuessedCards, gameMode } = useGame();
  const [playerGuesses, setPlayerGuesses] = useState({});
  const [errors, setErrors] = useState({});

  // Dynamically initialize states based on totalPlayers
  useEffect(() => {
    const initialGuesses = {};
    const initialErrors = {};
    for (let i = 1; i <= totalPlayers; i++) {
      initialGuesses[`player${i}`] = { rank: null, suit: null };
      initialErrors[`player${i}`] = { rank: false, suit: false };
    }
    setPlayerGuesses(initialGuesses);
    setErrors(initialErrors);
  }, [totalPlayers, isOpen]);

  const handleRankChange = (player, selectedRank) => {
    setPlayerGuesses((prev) => ({
      ...prev,
      [player]: { ...prev[player], rank: selectedRank }
    }));
  };

  const handleSuitChange = (player, selectedSuit) => {
    // Since selectedSuit is an object, we're directly setting it here
    setPlayerGuesses(prev => ({
      ...prev,
      [player]: { ...prev[player], suit: selectedSuit },
    }));
  };
  

  const validateGuesses = () => {
    let allValid = true;
    const newErrors = { ...errors };

    Object.entries(playerGuesses).forEach(([player, { rank, suit }]) => {
      const isValidRank = rank !== null;
      const isValidSuit = rank === 'Joker' || suit !== null; // Suit is not required if rank is Joker
      newErrors[player] = { rank: !isValidRank, suit: !isValidSuit };

      if (!isValidRank || !isValidSuit) allValid = false;
    });

    setErrors(newErrors);
    return allValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  
    // Assuming validation logic checks if every player has made necessary selections
    const allValid = Object.entries(playerGuesses).every(([player, { rank, suit }]) => {
      // Ensure a rank is selected for every player. Adjust logic if necessary for suits.
      return rank !== null && (rank === 'Joker' || suit !== null);
    });

    if (!allValid) {
      alert("Please make valid selections for all players.");
      return; // Stop the form submission if not all selections are valid.
    }
  
    const guessValues = {};
    Object.entries(playerGuesses).forEach(([player, { rank, suit }]) => {
      const guessValue = rank === 'Joker' ? 'JR' : `${rank.charAt(0)}${suit.name.charAt(0)}`;
      guessValues[player] = guessValue;
    });
  
    saveLastGuesses(guessValues);
    setLastGuessedCards(Object.values(guessValues).map(convertGuessToCard));
    onClose();
    setPlayerGuesses({});
  };
  

  if (!isOpen) return null;

  return (
    <div className="modal-backdrop">
      <div className="modal-content">
        <form onSubmit={handleSubmit}>
          <h3>Last Card Predictions</h3>
          {Object.entries(playerGuesses).map(([player, guess], index) => (
            <div key={player}>
              {gameMode != 'PvC' && <h3>Player {index + 1} Prediction:</h3>}
              {gameMode === 'PvC' && index == 0 && <h3>Player 1 Prediction:</h3>}
              {gameMode === 'PvC' && index == 1 && <h3>Computer's Prediction:</h3>}
              <CardRanks selectedRank={guess.rank} setSelectedRank={(rank) => handleRankChange(player, rank)} playerGuesses={playerGuesses} gameMode={gameMode}/>
              {guess.rank !== 'Joker' && <CardSuits selectedSuit={guess.suit} setSelectedSuit={(suit) => handleSuitChange(player, suit)} playerGuesses={playerGuesses} gameMode={gameMode} />}
              {errors[player]?.rank && <p className="error">Please select a rank</p>}
              {errors[player]?.suit && <p className="error">Please select a suit</p>}
            </div>
          ))}
          <button type="submit">Submit Guesses</button>
          {/* <button type="button" onClick={onClose}>Cancel</button> */}
        </form>
      </div>
    </div>
  );
};

export default LastGuessInputModal;
