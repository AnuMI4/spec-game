import { useEffect, useState } from "react";
import cardBackImage from "cardsJS/cards/Red_Back.svg";
import { useGame } from "@/context/useGame";
import cardImages from "@/components/images";
import GuessModal from "@/components/GuessModal";
import WinnerAnnouncementModal from "@/components/WinnerAnnouncementModal";
import { validateGuessFormat } from "@/utils";

const GameBoard = () => {
  const {
    deck,
    revealCard,
    switchPlayer,
    currentPlayer,
    calculateScore,
    updateScore,
    scores,
    checkEndGame,
    restartGame,
    isGameOver,
    winner,
    totalPlayers,
    scoreCards
  } = useGame();
  const [isGuessModalOpen, setIsGuessModalOpen] = useState(false);
  const [currentGuessIndex, setCurrentGuessIndex] = useState(null);
  const [clickedCards, setClickedCards] = useState([]);
  const [feedback, setFeedback] = useState("");
  const [lastGuessedCard, setLastGuessedCard] = useState(null);

  const handleCardClick = (index) => {
    if (deck[index].revealed) return; // Prevent action on revealed cards

    setIsGuessModalOpen(true);
    setCurrentGuessIndex(index);
  };

  const handleGuessSubmit = (guess) => {
    setIsGuessModalOpen(false);

    if (!validateGuessFormat(guess)) {
      setFeedback("Invalid guess format.");
      switchPlayer(); // Move to the next player
      return;
    }
    setLastGuessedCard(guess);

    const card = deck[currentGuessIndex];
    const score = calculateScore(guess, card);

    revealCard(currentGuessIndex); // Always reveal the card after a guess

    const nextPlayer = (currentPlayer % totalPlayers) + 1;
    if (score > 0) {
      updateScore(currentPlayer, score); // Add score to the current player
      setFeedback(
        `Good guess! Score: ${score}. Now it's Player ${nextPlayer}'s turn.`
      );
    } else {
      setFeedback(`Incorrect guess. Now it's Player ${nextPlayer}'s turn.`);
    }

    switchPlayer(); // Move to the next player

    if (!clickedCards.includes(currentGuessIndex)) {
      setClickedCards([...clickedCards, currentGuessIndex]);
    }
  };

  const renderScoreCards = () => {
    if (!scoreCards.length) return <div>Loading...</div>;
    
    return (
      <div className="score-cards-container">
        {scoreCards.map((card, index) => {
          const cardKey = `card_${card.value.charAt(0)}${card.suit.charAt(0)}`;
          const cardImage = cardBackImage;
          const style = {
            left: `${index * 5}px`, // This offsets each card horizontally. Adjust as necessary.
            zIndex: index, // Ensures that cards overlap correctly.
          };
  
          return (
            <img
              key={index}
              className="score-card"
              src={cardImage}
              alt={`Card ${card.value} of ${card.suit}`}
              style={style}
            />
          );
        })}
        <div className="score-cards-count">Score Cards: {scoreCards.length}</div>
      </div>
    );
  };

  const renderGridItems = () => {
    if (!deck.length) return <div>Loading...</div>;
    console.log("deck:", deck);
    return deck.slice(0, 25).map((card, index) => {
      const cardKey = `card_${card.value.charAt(0)}${card.suit.charAt(0)}`;
      const cardImage = cardImages[cardKey] || cardBackImage;
      return (
        <div
          key={index}
          className="grid-item"
          onClick={() => handleCardClick(index)}
        >
          {clickedCards.includes(index) ? (
            <img src={cardImage} alt={`Card ${card.value} of ${card.suit}`} />
          ) : (
            <img src={cardBackImage} alt="Card Back" />
          )}
        </div>
      );
    });
  };

  const handleRestart = () => {
    restartGame();
  };

  useEffect(() => {
    checkEndGame();
  }, [deck, checkEndGame]);

  return (
    <>
      {feedback && <div className="feedback">{feedback}</div>}
      <div className="scoreboard">
        {Object.entries(scores).map(([playerId, score]) => (
          <p key={playerId}>
            {playerId} Score: {score}
          </p>
        ))}
      </div>
      <div className="grid-container">
        <div className="game-board">{renderGridItems()}</div>
        <div className="score-cards-container">{renderScoreCards()}</div>
      </div>
      <GuessModal
        isOpen={isGuessModalOpen}
        onClose={() => setIsGuessModalOpen(false)}
        onGuessSubmit={handleGuessSubmit}
        lastGuessedCard={lastGuessedCard}
      />
      <WinnerAnnouncementModal
        isShown={isGameOver}
        winner={winner}
        onRestart={handleRestart}
      />
    </>
  );
};

export default GameBoard;
