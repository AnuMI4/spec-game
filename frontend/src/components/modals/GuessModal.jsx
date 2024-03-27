import React, { useState } from "react";
import { patternGuess } from "@/utils";
import CardRanks from "../CardRanks";
import CardSuits from "../CardSuits";

const GuessModal = ({ isOpen, onClose, onGuessSubmit, lastGuessedCard }) => {
  const [guess, setGuess] = useState("");
  const [error, setError] = useState("");
  const [selectedRank, setSelectedRank] = useState(null);

  const handleSubmit = () => {
    console.log("HI");
    console.log(selectedRank);
    // onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="modal-backdrop">
      <div className="modal-content">
        <h3>Enter Your Guess</h3>
        <CardRanks />
        <CardSuits />
        <button type="submit" onClick={handleSubmit}>Submit</button>
        <button type="button" onClick={onClose}>Cancel</button>
      </div>
    </div>
  );
};

export default GuessModal;
