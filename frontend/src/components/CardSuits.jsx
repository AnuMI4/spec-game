import "../index.css";
import {iconHeart, iconClub, iconDiamond, iconSpade} from "../components/icons";
import { useEffect } from "react";

const CardSuits = ({ selectedSuit, setSelectedSuit, gameMode, playerGuesses=[] }) => {
  //Filter out suits that have already been selected by other players from playerGuesses
  const suits = [
    { name: "Hearts", icon: iconHeart },
    { name: "Diamonds", icon: iconDiamond },
    { name: "Clubs", icon: iconClub },
    { name: "Spades", icon: iconSpade },
  ].filter(suit => {
    return !Object.values(playerGuesses).some(guess => guess.suit?.name === suit?.name);
  });
  // const suits = [
  //   { name: "Hearts", icon: iconHeart },
  //   { name: "Diamonds", icon: iconDiamond },
  //   { name: "Clubs", icon: iconClub },
  //   { name: "Spades", icon: iconSpade },
  // ];

  useEffect(() => {
    // Automatically select the generated suit for computer
    if (gameMode === 'PvC' && suits.length < 4 && selectedSuit === null) {
        const randomSuitIndex = Math.floor(Math.random() * suits.length);
        setSelectedSuit(suits[randomSuitIndex]);
    }
  });

  const handleClick = (suit) => {
    console.log("Button clicked for:", suit.name);
    setSelectedSuit(suit);
  };

  return (
    <div className="card-suits">
      <h3>Card Suits</h3>
      <div className="button-container">
        {suits.map((suit, index) => (
          <button
            type="button"
            key={index}
            className={selectedSuit?.name === suit.name ? "my-button selected" : "my-button"}
            onClick={() => handleClick(suit)}
            disabled={selectedSuit !== null && selectedSuit?.name !== suit.name}
          >
            <img src={suit.icon} alt="Suit Icon" className="icon" />
            {suit.name}
          </button>
        ))}
      </div>
      <div className="selected-suit">
          <h3>{selectedSuit !== null ? `Selected Suit: ${selectedSuit.name}` : null}</h3>
      </div>
    </div>
  );
};

export default CardSuits;
