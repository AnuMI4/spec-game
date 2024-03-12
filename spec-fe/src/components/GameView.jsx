import { useEffect, useState } from "react";
import images from "./images";
import "../App.css";
import cardImage from "cardsJS/cards/Red_Back.svg";
import ShowCards from "./ShowCards";
import Helper from "../../../Helper";

function GameView() {
  const playerCount = 2;
  const patternGuess = /^([JTQKA][HDSC])|([J][R])$/;

  const [clickedCards, setClickedCards] = useState([]);
  const [currentPlayer, setCurrentPlayer] = useState(1);
  const [predictions, setPredictions] = useState([]);

  // Function to check if suit has already been predicted by other players
  function checkSuitOfOtherPredicitons(prediction) {
    return !predictions.filter((x) => x[1] == prediction[1]).length;
  }

  // Function to get player's prediction for the last card
  function getPlayerLastCardPrediction(player) {
    let isPredictionValid = false;
    let cardIdentifier = null;
    while (!isPredictionValid) {
      cardIdentifier = prompt(
        `Player ${
          player + 1
        }, predict the last card (e.g. Ace of Spades AS, JR for Joker): `
      );
      cardIdentifier = cardIdentifier.toUpperCase();
      console.log(`Player ${player + 1} prediction: ${cardIdentifier}`);
      isPredictionValid = patternGuess.test(cardIdentifier) ? true : false;
      if (!isPredictionValid) {
        console.log("Invalid Prediction entered");
      }
    }
    return cardIdentifier;
  }

  function recordLastCardPredictions() {
    let currentPlayer = 0;
    let prediction = null;
    let _predictions = [];
    for (let i = 0; i < playerCount; i++) {
      prediction = getPlayerLastCardPrediction(currentPlayer);
      console.log("Prediction: ", prediction);
      console.log("Predictions: ", predictions);
      // Exact prediction is not allowed, same suit is not allowed
      if (
        !predictions.includes(prediction) &&
        checkSuitOfOtherPredicitons(prediction)
      ) {
        _predictions.push(prediction);
        currentPlayer += 1;
      } else {
        alert(`This card is already predicted, or try a different Suit`);
        // Only move forward if prediction is correct and different from other players
        i--;
      }
    }
    setPredictions(_predictions);
  }

  const handleCardClick = (index) => {
    recordLastCardPredictions();
    // let cardIdentifier = prompt(
    //   "Guess the card (e.g. Ace of Spades AS, JR for Joker): "
    // );
    // cardIdentifier = cardIdentifier.toUpperCase();
    // let isGuessValid = patternGuess.test(cardIdentifier) ? true : false;

    // if (!isGuessValid) {
    //   alert("INVALID GUESS ENTERED");
    //   // SKIP CHECKING THE CARD REVEALED LOGIC
    //   return;
    // }

    // // Returns true of card is revealed or 5 jokers are revealed so inverse the result
    // isGuessValid = !Helper.cardRevealed(cardIdentifier);
    // if (!isGuessValid) {
    //   alert(`THIS CARD IS ALREADY REVEALED. TRY AGAIN`);
    //   return;
    // }

    // // Check for previous user call, can't call same guess as previous user
    // isGuessValid = !Helper.lastGuessMatch(cardIdentifier);
    // if (!isGuessValid) {
    //   alert("YOU CAN NOT GUESS SAME CARD AS PREVIOUS PLAYER");
    // }
    // Helper.storeLastGuess(cardIdentifier);

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
      // console.log(showCards);
      const showCardsArray = [];
      for (let i = 0; i < 25; i++) {
        showCardsArray.push(
          `card_${showCards[i].value.charAt(0)}${showCards[i].suit.charAt(0)}`
        );
      }
      console.log(showCardsArray);
      const gridItems = [];
      for (let i = 0; i < 25; i++) {
        gridItems.push(
          <div key={i} className="grid-item" onClick={() => handleCardClick(i)}>
            {clickedCards.includes(i) ? (
              <img src={images[showCardsArray[i]]} alt="Card Image" />
            ) : (
              <img src={cardImage} alt="Card Image Back" />
            )}
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
      <div className="grid-container">{renderGridItems()}</div>
    </div>
  );
}

export default GameView;
