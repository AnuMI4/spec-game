import { useGame } from "@/context/useGame";
import { useMemo } from "react";
import cardImages from "@/components/images";

const WinnerAnnouncementModal = () => {
  const {
    isGameOver,
    winner,
    lastDeckCard,
    lastGuessedCards,
    restartGame,
    prepareNextRound,
    currentRound,
    totalPlayers,
  } = useGame();

  const isLastRound = useMemo(
    () => currentRound === totalPlayers,
    [currentRound, totalPlayers]
  );

  const lastDeckCardKey = `card_${lastDeckCard?.value.charAt(
    0
  )}${lastDeckCard?.suit.charAt(0)}`;
  const lastDeckCardImage = cardImages[lastDeckCardKey];

  if (!isGameOver) return null;

  return (
    <div className="modal-backdrop">
      <div className="modal-content">
        <h2 className="modal-title">
          {isLastRound ? "Game Over" : "Round Over"}
        </h2>

        <p className="modal-message">
          Congratulations, {winner ? `Player ${winner}` : "it's a tie!"}
        </p>

        {lastDeckCardImage && (
          <div className="card-display">
            <h3>Last Card in Deck</h3>
            <img
              className="card-image"
              src={lastDeckCardImage}
              alt={`Card ${lastDeckCard?.value} of ${lastDeckCard?.suit}`}
            />
          </div>
        )}

        <div className="guesses-display">
          <h3>Last Guessed Cards</h3>
          {lastGuessedCards.map((card, index) => {
            const cardKey = `card_${card.value.charAt(0)}${card.suit.charAt(
              0
            )}`;
            const cardImage = cardImages[cardKey];
            return (
              <div key={index} className="player-guess">
                <p>Player {index + 1}&apos;s Guess:</p>
                <img
                  className="card-image"
                  src={cardImage}
                  alt={`Card ${card.value} of ${card.suit}`}
                />
              </div>
            );
          })}
        </div>

        {!isLastRound ? (
          <button className="modal-button" onClick={prepareNextRound}>
            Next Round
          </button>
        ) : (
          <button className="modal-button" onClick={restartGame}>
            Restart Game
          </button>
        )}
      </div>
    </div>
  );
};

export default WinnerAnnouncementModal;
