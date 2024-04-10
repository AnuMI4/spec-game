function GameGuide ({ isOpen, onClose }) {
    if (!isOpen) return null;
    
    return (
        <div className="modal-backdrop game-guide-modal">
          <div className="modal-content">
            <h2>Game Guide</h2>
            <p>
                <b>Game Sequence</b>
                <ul>
                    <li>The game begins with each player making a prediction about the final card.</li>
                    <li>After predictions are recorded, the gameplay begins where each player selects a card and makes a guess about its suit and rank.</li>
                </ul>
            <b>Scoring during gameplay</b>
            <p>Players are awarded scorecards based on the accuracy of their predictions during their turn: -</p>
            <ul>
                <li>1 scorecard, if the guessed suit is correct, but not the rank</li>
	            <li>2 scorecards, if the guessed rank is correct but not the suit</li>
	            <li>4 scorecards, if both the rank and the suit guessed are correct</li>
	            <li>2 scorecards, if a joker is correctly guessed</li>
	            <li>4 scorecards, if it is an actual joker</li>
            </ul>
            <p>When the last card is remaining, Player must reveal card and bonus scorecards must be awarded to the player according to the correctness of their initial predictions</p>
            <b>Winning Bonus Scorecards on revealing the Last Card:</b>
            <p>Bonus should be awarded to: -</p>
            <ul>
                <li>The player whose prediction matches the last card</li>
                <li>If none of the predictions were correct, then the player who correctly predicted the rank of the last card</li>
                <li>if none of the rank predictions were correct either, then the player who correctly predicted the suit of the last card</li>
                <li>if none of the suit predictions were correct either, then the player won the last scorecard</li>
            </ul>
            </p>
            <button onClick={onClose}>Close</button>
          </div>
        </div>
      );
}

export default GameGuide;