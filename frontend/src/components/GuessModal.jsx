import { useState } from "react";
import { patternGuess } from "@/utils";

const GuessModal = ({ isOpen, onClose, onGuessSubmit }) => {
  const [guess, setGuess] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (patternGuess.test(guess)) {
      onGuessSubmit(guess.toUpperCase());
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

  return (
    <div className="modal-backdrop">
      <div className="modal-content">
        <h3>Enter Your Guess</h3>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={guess}
            onChange={(e) => setGuess(e.target.value)}
            placeholder="e.g., AS, JD, QH"
          />
          {error && <p className="error">{error}</p>}
          <button type="submit">Submit</button>
          <button type="button" onClick={onClose}>
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
};

export default GuessModal;
