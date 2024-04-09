import React from 'react';

const GuessResultModal = ({ isOpen, onConfirm, correctGuess, points }) => {
    if (!isOpen) return null;
    
    return (
        <div className="modal-backdrop">
            <div className="modal-content">
                {correctGuess ? (
                    <h2>Correct Guess!</h2>
                ) : (
                    <h2>Wrong Guess!</h2>
                )}
                {correctGuess && <p>You earned {points} scorecards!</p>}
                {!correctGuess && <p>No scorecards earned.</p>}
                <button onClick={onConfirm}>OK</button>
            </div>
        </div>
    );
};

export default GuessResultModal;
  