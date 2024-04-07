import { useState, useEffect } from "react";
import { patternGuess } from "@/utils";
import CardRanks from "../CardRanks";
import CardSuits from "../CardSuits";

const GuessModal = ({ isOpen, onClose, onGuessSubmit, lastGuessedCard, generatedRank, generatedSuit }) => {
  const [selectedRank, setSelectedRank] = useState(null);
  const [selectedSuit, setSelectedSuit] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    // Automatically select the generated rank when it's available
    if (generatedRank) {
      setSelectedRank(generatedRank);
    }

    // Automatically select the generated suit when it's available
    if (generatedSuit) {
      setSelectedSuit(generatedSuit);
    }
  }, [generatedRank, generatedSuit]);


  // Function to handle guess submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Check if the user has selected both a rank and a suit only except for the Joker
    if (!selectedRank || (selectedRank != 'Joker' && !selectedSuit)) {
      setError("PLEASE SELECT BOTH RAND AND A SUIT.");
      return;
    }

    // Convert the selected rank and suit to the format of the guess
    let guessValue = `${selectedRank.charAt(0)}${selectedSuit?.name?.charAt(0)}`;
    // If the selected rank is Joker, set the guess value to JR
    if(selectedRank === 'Joker') {
      guessValue = 'JR';
    }

    if (patternGuess.test(guessValue) && guessValue.toUpperCase() !== lastGuessedCard) {
      onGuessSubmit(guessValue.toUpperCase());
      setSelectedRank(null);
      setSelectedSuit(null);
      // setGuess("");
      setError("");
      onClose();
    } else {
      setError(
        "Invalid guess format. Please follow the format: ValueSuit (e.g., AS, JD, 2H)."
      );
    }
  };

  if (!isOpen) return null;

  const handleCancel = () => {
    setSelectedRank(null);
    setSelectedSuit(null);
    setError("");
    onClose();
  };

  return (
    <div className="modal-backdrop">
      <div className="modal-content">
        <h3>Enter Your Guess</h3>
        <CardRanks selectedRank={selectedRank} setSelectedRank={setSelectedRank} />
        {selectedRank != 'Joker' && <CardSuits selectedSuit={selectedSuit} setSelectedSuit={setSelectedSuit} />}
        <form onSubmit={handleSubmit}>
          <input
            type="hidden"
            value={`${selectedRank?.charAt(0) || ''}${selectedSuit?.name.charAt(0) || ''}`}
            readOnly
          />
          {error && <p className="error">{error}</p>}
          <button type="submit">Submit</button>
          <button type="button" onClick={handleCancel}>Cancel</button>
        </form>
      </div>
    </div>
  );
};

export default GuessModal;
