import { useEffect, useState } from "react";
import GuessModal from "../components/modals/GuessModal";
import {iconHeart, iconClub, iconDiamond, iconSpade} from "../components/icons";

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

function generateRank() {
  const ranks = ["King", "Queen", "Jack", "Ten", "A", "Joker"];
  const randomRankIndex = Math.floor(Math.random() * ranks.length);
  return ranks[randomRankIndex];
}

function generateSuit() {
  const suits = [
    { name: "Hearts", icon: iconHeart },
    { name: "Diamonds", icon: iconDiamond },
    { name: "Clubs", icon: iconClub },
    { name: "Spades", icon: iconSpade },
  ];
  const randomSuitIndex = Math.floor(Math.random() * suits.length);
  return suits[randomSuitIndex];
}

const ComputerPlayer = ({ deck, onCardClick, onGuessSubmit, onClose }) => {
  const [cardIndex, setCardIndex] = useState(null);
  const [generatedRank, setGeneratedRank] = useState(null); // New state for generated rank
  const [generatedSuit, setGeneratedSuit] = useState(null); // New state for generated suit

  useEffect(() => {
    const index = getCardIndex(deck);
    setCardIndex(index);
    onCardClick(index);

    // Generate the rank and suit when the component mounts or when the deck changes
    const rank = generateRank();
    const suit = generateSuit();
    setGeneratedRank(rank);
    setGeneratedSuit(suit);
  }, [deck, onCardClick]);

  return (
    <div>
      <h2>Computer's Turn</h2>
      <GuessModal isOpen={true} onClose={onClose} onGuessSubmit={onGuessSubmit} generatedRank={generatedRank} generatedSuit={generatedSuit} />
      <p>{cardIndex}</p>
    </div>
  );
};

export default ComputerPlayer;
