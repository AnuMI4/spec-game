function generatePrediction() {
  const ranks = ['K', 'Q', 'J', '10', 'A', 'Joker'];
  const suits = ['H', 'D', 'C', 'S']; // Hearts, Diamonds, Clubs, Spades

  const randomRankIndex = Math.floor(Math.random() * ranks.length);
  const randomSuitIndex = Math.floor(Math.random() * suits.length);

  const randomRank = ranks[randomRankIndex];
  const randomSuit = suits[randomSuitIndex];

  return randomRank + randomSuit;
}

const ComputerPlayer = () => {
  const prediction = generatePrediction();

  return (
    <div>
      <h2>Computer's Prediction</h2>
      <p>{prediction}</p>
    </div>
  );
};

export default ComputerPlayer;
