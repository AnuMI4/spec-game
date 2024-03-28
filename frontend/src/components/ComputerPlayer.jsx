import React, { useEffect, useState } from "react";

function getCardIndex(deck) {
  const indexesWithRevealedFalse = deck
    .map((card, index) => ({ ...card, index })) // Add index to each object
    .filter((card) => !card.revealed)
    .map((card) => card.index);

  // Generate a random index within the range of the array
  const randomIndex = Math.floor(Math.random() * indexesWithRevealedFalse.length);

  // Retrieve the random number using the random index
  return indexesWithRevealedFalse[randomIndex];
}

function generatePrediction() {
  const ranks = ['King', 'Queen', 'Jack', 'Ten', 'A', 'Joker'];
  const suits = ['Hearts', 'Diamonds', 'Clubs', 'Spades'];

  const randomRankIndex = Math.floor(Math.random() * ranks.length);
  const randomSuitIndex = Math.floor(Math.random() * suits.length);

  const randomRank = ranks[randomRankIndex];
  const randomSuit = suits[randomSuitIndex];

  return {
    rank: randomRank,
    suit: randomSuit
  };
}

const ComputerPlayer = ({ deck, onCardClick, onGuess }) => {
  const [cardIndex, setCardIndex] = useState(null); // Declare cardIndex as a state variable

  useEffect(() => {
    // Logic to select a card index from the deck
    const index = getCardIndex(deck); // Update the cardIndex state variable
    setCardIndex(index);
    onCardClick(index); // Call the function passed from the parent component

    // Generate the prediction for the guess
    const prediction = generatePrediction();
    // Pass the prediction to the parent component
    onGuess(prediction.suit, prediction.rank);
  }, [deck, onCardClick, onGuess]);

  return (
    <div>
      <h2>Computer's Turn</h2>
      <p>{cardIndex}</p>
    </div>
  );
};

export default ComputerPlayer;
