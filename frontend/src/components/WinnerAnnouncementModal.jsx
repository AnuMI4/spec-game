import { useGame } from "@/context/useGame";
import { useMemo } from "react";

const WinnerAnnouncementModal = () => {
  const {
    isGameOver,
    winner,
    restartGame,
    prepareNextRound,
    currentRound,
    totalPlayers,
  } = useGame();

  const isLastRound = useMemo(
    () => currentRound === totalPlayers,
    [currentRound, totalPlayers]
  );

  if (!isGameOver) return null;

  return (
    <div className="modal-backdrop">
      <div className="modal-content">
        <h2>{isLastRound ? "Game Over" : "Round Over"}</h2>

        <p>
          Congratulations,{" "}
          {winner ? `Player ${winner} You've won the game!` : "it's a tie!"}
        </p>

        {!isLastRound ? (
          <button onClick={prepareNextRound}>Next Round</button>
        ) : (
          <button onClick={restartGame}>Restart Game</button>
        )}
      </div>
    </div>
  );
};

export default WinnerAnnouncementModal;
