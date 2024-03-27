import React, { useState } from "react";
import { patternGuess } from "@/utils";
import CardRanks from "../CardRanks";
import CardSuits from "../CardSuits";

const GuessModal = ({ isOpen, onClose, onGuessSubmit, lastGuessedCard }) => {
  const [selectedRank, setSelectedRank] = useState(null);
  const [selectedSuit, setSelectedSuit] = useState(null);
  const [guess, setGuess] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!selectedRank || !selectedSuit) {
      setError("Please select both a rank and a suit.");
      return;
    }

    const guessValue = `${selectedRank.charAt(0)}${selectedSuit.name.charAt(0)}`;

    if (patternGuess.test(guessValue) && guessValue.toUpperCase() !== lastGuessedCard) {
      onGuessSubmit(guessValue.toUpperCase());
      setSelectedRank(null);
      setSelectedSuit(null);
      setGuess("");
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
        <CardSuits selectedSuit={selectedSuit} setSelectedSuit={setSelectedSuit} />
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
