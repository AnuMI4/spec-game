import React, { useState } from 'react';
import images from './images';
import '../App.css';
import cardImage from 'cardsJS/cards/Red_Back.svg';
import ShowCards from './ShowCards';

function GameView() {
  const [clickedCards, setClickedCards] = useState([]);
  const [currentPlayer, setCurrentPlayer] = useState(1);

  const handleCardClick = (index) => {
    const userInput = prompt('Guess the card (e.g. Ace of Spades AS, JR for Joker): ');
    if (!clickedCards.includes(index)) {
      setClickedCards([...clickedCards, index]);
      setCurrentPlayer(currentPlayer === 1 ? 2 : 1);
    }
  };
  
  const renderGridItems = () => {
    const showCards = ShowCards();
    if (showCards.length === 0) {
      return <div>Loading...</div>;
    } else {
      console.log(showCards);
      const showCardsArray = [];
      for (let i = 0; i < 25; i++) {
        showCardsArray.push(`card_${showCards[i].value.charAt(0)}${showCards[i].suit.charAt(0)}`)
      }
      console.log(showCardsArray);
      const gridItems = [];
      for (let i = 0; i < 25; i++) {
        gridItems.push(
          <div key={i} className="grid-item" onClick={() => handleCardClick(i)}>
            {clickedCards.includes(i) ? <img src={images[showCardsArray[i]]} alt="Card Image" /> : <img src={cardImage} alt="Card Image Back" /> }
          </div>
        );
      }
      return gridItems;
    }
  };

  return (
    <div className="game-container">
      <div className="turn-indicator">
        <h2>Player {currentPlayer}'s Turn</h2>
      </div>
      <div className="grid-container">
        {renderGridItems()}
      </div>
    </div>
  );
}

export default GameView;
