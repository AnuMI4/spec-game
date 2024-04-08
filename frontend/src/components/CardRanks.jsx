import { useEffect } from "react";
import "../index.css";

const CardRanks = ({ selectedRank, setSelectedRank, gameMode, playerGuesses = [] }) => {
  // Filter out ranks that have already been selected by other players from playerGuesses
  const ranks = ["King", "Queen", "Jack", "Ten", "A", "Joker"].filter(rank => {
    return !Object.values(playerGuesses).some(guess => guess.rank === rank);
  });
  // const ranks = ["King", "Queen", "Jack", "Ten", "A", "Joker"];

  useEffect(() => {
    // Automatically select the generated rank when for computer
    if (gameMode === 'PvC' && ranks.length < 6 && selectedRank === null) {
        const randomRankIndex = Math.floor(Math.random() * ranks.length);
        setSelectedRank(ranks[randomRankIndex]);
    }
  });

  const handleClick = (rank) => {
    console.log("Button clicked for:", rank);
    setSelectedRank(rank);
  };

  return (
    <div className="card-ranks">
      <h3>Card Ranks</h3>
      <div className="button-container">
        {ranks.map((rank, index) => (
          <button
            type="button"
            key={index}
            className={selectedRank === rank ? "my-button selected" : "my-button"}
            onClick={() => handleClick(rank)}
            disabled={selectedRank !== null && selectedRank !== rank}
          >
            <strong>{rank}</strong>
          </button>
        ))}
      </div>
      <div className="selected-rank">
          <h3>{selectedRank !== null ? `Selected Rank: ${selectedRank}` : null}</h3>
      </div>
    </div>
  );
};

export default CardRanks;
