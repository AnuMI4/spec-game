import React, { useState } from 'react';
import images from './images';
import '../App.css';
import cardImage from '../assets/red2.svg';

function GameView() {
  const [clickedCards, setClickedCards] = useState([]);

  const handleCardClick = (index) => {
    if (!clickedCards.includes(index)) {
      setClickedCards([...clickedCards, index]);
    }
  };
  
  const renderGridItems = () => {
    const gridItems = [];
    for (let i = 0; i < 25; i++) {
      gridItems.push(
        <div key={i} className="grid-item" onClick={() => handleCardClick(i)}>
          {clickedCards.includes(i) ? <img src={images.image4} alt="Card Image" /> : <img src={cardImage} alt="Card Image" /> }
        </div>
      );
    }
    return gridItems;
  };


  return (
    <div className="grid-container">
      {renderGridItems()}
    </div>
  );
}

export default GameView;
