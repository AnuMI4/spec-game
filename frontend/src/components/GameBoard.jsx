import { useEffect, useState } from "react";
import cardBackImage from "cardsJS/cards/Red_Back.svg";
import { useGame } from "@/context/useGame";
import cardImages from "@/components/images";
import GuessModal from "@/components/modals/GuessModal";
import WinnerAnnouncementModal from "@/components/modals/WinnerAnnouncementModal";
import LastGuessInputModal from "@/components/modals/LastGuessInputModal";
import RevealLastCardModal from "@/components/modals/RevealLastCardModal";
import GuessResultModal from "./modals/GuessResultModal";
import { validateGuessFormat } from "@/utils";
import ComputerPlayer from "./ComputerPlayer";
import InvalidMoveModal from "./modals/InvalidMoveModal";

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
    gameMode
  } = useGame();

  console.log("lastGuessedCards: ", lastGuessedCards);
  console.log("deck:", deck);

  const [isGuessModalOpen, setIsGuessModalOpen] = useState(false);
  const [currentGuessIndex, setCurrentGuessIndex] = useState(null);
  const [clickedCards, setClickedCards] = useState([]);
  const [feedback, setFeedback] = useState("");
  const [lastGuessedCard, setLastGuessedCard] = useState(null);
  const [isLastGuessModalOpen, setIsLastGuessModalOpen] = useState(false);
  const [isRevealLastCardModalOpen, setIsRevealLastCardModalOpen] = useState(false);
  const [isGuessResultModalOpen, setIsGuessResultModalOpen] = useState(false);
  const [correctGuess, setCorrectGuess] = useState(false);
  const [scorePoints, setScorePoints] = useState(0);
  const [lastCard, setLastCard] = useState(null);
  const [cardIndex, setCardIndex] = useState(null);
  const [isInvalidMoveModalOpen, setIsInvalidMoveModalOpen] = useState(false);
  const [lastGuessesArray, setLastGuessesArray] = useState([]);

  console.log(lastGuessesArray)

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
    setLastGuessesArray(prev => [...prev, guess])

    const card = deck[currentGuessIndex];
    const score = calculateScore(guess, card);

    revealCard(currentGuessIndex); // Always reveal the card after a guess

    const nextPlayer = (currentPlayer % totalPlayers) + 1;
    if (score > 0) {
      updateScore(currentPlayer, score); // Add score to the current player
      setIsGuessResultModalOpen(true);
      setCorrectGuess(true);
      setScorePoints(score);
      setFeedback(
        `Good guess! Score: ${score}. Now it's Player ${nextPlayer}'s turn.`
      );
    } else {
      setIsGuessResultModalOpen(true);
      setCorrectGuess(false);
      setScorePoints(0);
      setFeedback(`Incorrect guess. Now it's Player ${nextPlayer}'s turn.`);
    }

    // console.log("switching player");
    // switchPlayer(); // Move to the next player
    // handleGuessResultModalConfirm();
  };

  const handleGuessResultModalConfirm = () => {
    calculateWinner();

    if (!clickedCards.includes(currentGuessIndex)) {
      setClickedCards([...clickedCards, currentGuessIndex]);
    }
    setIsGuessResultModalOpen(false);
    setCorrectGuess(false);
    setScorePoints(0);
    switchPlayer();
  };

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

  const handleCall = () => {
    const lastValue = lastGuessesArray.slice(-1)[0];
    const secondLastValue = lastGuessesArray.slice(-2, -1)[0];
    const isSuitSame = lastValue.slice(-1) === secondLastValue.slice(-1);
    const isRankSame = lastValue.charAt(0) === secondLastValue.charAt(0);
    setIsInvalidMoveModalOpen(true);
    if (isSuitSame || isRankSame) {
      const score = 1;
      updateScore(currentPlayer, score);
      setScorePoints(score);
    }
  }

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
      <div className="container-grid">
        {feedback && <div className="feedback">{feedback}</div>}
        <div className="scoreboard">
          <>
            {Object.entries(scores).map(([playerId, score]) => {
              // Determine the display label based on the playerId and gameMode
              let displayLabel = playerId;
              if (gameMode === 'PvC') {
                displayLabel = playerId === 'player1' ? 'Player' : 'Computer';
              }

              return (
                <p key={playerId}>
                  {displayLabel} Score: {score}
                </p>
              );
            })}
          </>
          <div>
            <p key={currentRound}>
              Round: {currentRound}
            </p>
          </div>
        </div>
        <div className="container-turn">
          <div className="turn">Player {currentPlayer}'s turn</div>
          <button className="call-invalid" onClick={handleCall}>Call invalid move</button>
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
        <LastGuessInputModal
        isOpen={isLastGuessModalOpen}
        onClose={() => setIsLastGuessModalOpen(false)}
        />
        <RevealLastCardModal
          isOpen={isRevealLastCardModalOpen}
          onClose={() => setIsRevealLastCardModalOpen(false)}
          onReveal={handleLastCardReveal}
        />
        <GuessResultModal 
        isOpen={isGuessResultModalOpen} 
        onConfirm={() => handleGuessResultModalConfirm()}
        correctGuess={correctGuess}
        points={scorePoints}
        />
        <InvalidMoveModal
        isOpen={isInvalidMoveModalOpen}
        onClose={() => setIsInvalidMoveModalOpen(false)}
        lastGuessesArray={lastGuessesArray}
        />
      </div>
      {currentPlayer === 2 && gameMode === 'PvC' && !isGuessResultModalOpen && (
          <ComputerPlayer
            deck={deck}
            onCardClick={handleCardClick}
            onGuessSubmit={(guess) => handleGuessSubmit(guess)}
            onClose={() => setIsGuessModalOpen(false)}
          />
      )}
    </div>
  );
};

export default GameBoard;
