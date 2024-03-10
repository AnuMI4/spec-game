import React, { useState } from 'react';
import images from './images';
import '../App.css';
import cardImage from 'cardsJS/cards/Red_Back.svg';
import ShowCards from './ShowCards';

function GameView() {
  const [clickedCards, setClickedCards] = useState([]);

  const handleCardClick = (index) => {
    if (!clickedCards.includes(index)) {
      setClickedCards([...clickedCards, index]);
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
    <div className="grid-container">
      {renderGridItems()}
    </div>
  );
}

export default GameView;
