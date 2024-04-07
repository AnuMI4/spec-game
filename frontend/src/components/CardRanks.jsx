import "../index.css";

const CardRanks = ({ selectedRank, setSelectedRank }) => {
  const ranks = ["King", "Queen", "Jack", "Ten", "A", "Joker"];

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
