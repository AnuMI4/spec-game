import { useEffect, useState } from "react";
import cardBackImage from "cardsJS/cards/Red_Back.svg";
import { useGame } from "@/context/useGame";
import cardImages from "@/components/images";
import GuessModal from "@/components/modals/GuessModal";
import WinnerAnnouncementModal from "@/components/modals/WinnerAnnouncementModal";
import LastGuessInputModal from "@/components/modals/LastGuessInputModal";
import RevealLastCardModal from "@/components/modals/RevealLastCardModal";
import { validateGuessFormat } from "@/utils";
import CardSuits from "./CardSuits";
import CardRanks from "./CardRanks";
import ComputerPlayer from "./ComputerPlayer";

const GameBoard = () => {
  const {
    deck,
    revealCard,
    switchPlayer,
    currentPlayer,
    calculateScore,
    updateScore,
    scores,
    restartGame,
    isGameOver,
    winner,
    totalPlayers,
    scoreCards,
    currentRound,
    lastGuesses,
    calculateWinner,
    lastGuessedCards,
  } = useGame();

  console.log("lastGuessedCards: ", lastGuessedCards);
  console.log("deck:", deck);

  const [isGuessModalOpen, setIsGuessModalOpen] = useState(false);
  const [currentGuessIndex, setCurrentGuessIndex] = useState(null);
  const [clickedCards, setClickedCards] = useState([]);
  const [feedback, setFeedback] = useState("");
  const [lastGuessedCard, setLastGuessedCard] = useState(null);
  const [isLastGuessModalOpen, setIsLastGuessModalOpen] = useState(false);
  const [isRevealLastCardModalOpen, setIsRevealLastCardModalOpen] =
    useState(false);
  const [lastCard, setLastCard] = useState(null);

  const handleCardClick = (index) => {
    if (deck[index].revealed) return; // Prevent action on revealed cards

    const unrevealedCards = deck.filter((card) => !card.revealed);

    if (unrevealedCards.length === 1) {
      setIsRevealLastCardModalOpen(true); // Show the modal to reveal the last card
      return null; // Return null if the last card is the only card left to be revealed
    }

    setIsGuessModalOpen(true);
    setCurrentGuessIndex(index);
  };

  const handleLastCardReveal = () => {
    // Find the index of the last unrevealed card
    const lastCardIndex = deck.findIndex((card) => !card.revealed);
    const lastCard = deck[lastCardIndex];
    setLastCard(lastCard);

    if (lastCardIndex !== -1) {
      revealCard(lastCardIndex); // Reveal the last card

      setIsRevealLastCardModalOpen(false); // Close the modal

      if (!clickedCards.includes(lastCardIndex)) {
        setClickedCards([...clickedCards, lastCardIndex]);
      }

      calculateWinner();
    }
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

    console.log("switching player");
    switchPlayer(); // Move to the next player
    calculateWinner();

    if (!clickedCards.includes(currentGuessIndex)) {
      setClickedCards([...clickedCards, currentGuessIndex]);
    }
  };

  // const renderScoreCards = () => {
  //   if (!scoreCards.length) return <div>Loading...</div>;

  //   return (
  //     <div className="score-cards-container">
  //       {scoreCards.map((card, index) => {
  //         const cardKey = `card_${card.value.charAt(0)}${card.suit.charAt(0)}`;
  //         const cardImage = cardBackImage;
  //         const style = {
  //           left: `${index * 5}px`, // This offsets each card horizontally. Adjust as necessary.
  //           zIndex: index, // Ensures that cards overlap correctly.
  //         };

  //         return (
  //           <img
  //             key={index}
  //             className="score-card"
  //             src={cardImage}
  //             alt={`Card ${card.value} of ${card.suit}`}
  //             style={style}
  //           />
  //         );
  //       })}
  //       <div className="score-cards-count">
  //         Score Cards: {scoreCards.length}
  //       </div>
  //     </div>
  //   );
  // };

  const renderScoreCards = () => {
    if (!scoreCards.length) return <div>Loading...</div>;

    return (
      <>
        {scoreCards.map((card, index) => {
          const cardKey = `card_${card.value.charAt(0)}${card.suit.charAt(0)}`;
          const cardImage = cardBackImage; // Default to back image
          const hoverImage = cardImages[cardKey]; // Image when hovered

          return (
            <div
              key={index}
              className="score-card"
              style={{ left: `${index * 10}px`, zIndex: index }}
            >
              <img
                src={cardImage}
                alt={`Card ${card.value} of ${card.suit}`}
                onMouseOver={(e) => (e.currentTarget.src = hoverImage)} // Change to the actual card image on hover
                onMouseOut={(e) => (e.currentTarget.src = cardImage)} // Revert to the back image when not hovered
                style={{ height: "100%", width: "60px" }}
              />
            </div>
          );
        })}
        <div className="score-cards-count">
          Score Cards: {scoreCards.length}
        </div>
      </>
    );
  };

  const renderGridItems = () => {
    if (!deck.length) return <div>Loading...</div>;
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

  // Reset clicked cards and feedback when a new round starts
  useEffect(() => {
    setClickedCards([]);
    setFeedback("");
  }, [currentRound]);

  // Show the last guess input modal when the round or game starts
  useEffect(() => {
    if (Object.keys(lastGuesses).length === 0) {
      setIsLastGuessModalOpen(true);
    }
  }, [lastGuesses]);

  return (
    <div className="container">
    {/* <div className="container-suit">
      <div className="game-controls">
          <CardSuits />
        </div>
    </div>
    <div className="container-rank">
      <div className="section-card-ranks">
          <CardRanks />
        </div>
    </div> */}
    <div className="container-grid">
    {feedback && <div className="feedback">{feedback}</div>}
      <div className="scoreboard">
        {Object.entries(scores).map(([playerId, score]) => (
          <p key={playerId}>
            {playerId} Score: {score}
          </p>
        ))}
        <div>
          <p key={currentRound}>
            Round: {currentRound}
          </p>
        </div>
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
      {/* <LastGuessInputModal
        isOpen={isLastGuessModalOpen}
        onClose={() => setIsLastGuessModalOpen(false)}
      /> */}
      <RevealLastCardModal
        isOpen={isRevealLastCardModalOpen}
        onClose={() => setIsRevealLastCardModalOpen(false)}
        onReveal={handleLastCardReveal}
      />
    </div>
    {/* <ComputerPlayer /> */}
    </div>
  );
};

export default GameBoard;
