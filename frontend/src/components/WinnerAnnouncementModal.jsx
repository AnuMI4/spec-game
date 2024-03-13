import { useGame } from "@/context/useGame";

const WinnerAnnouncementModal = () => {
  const { isGameOver, winner, restartGame } = useGame();

  if (!isGameOver) return null;

  return (
    <div className="modal-backdrop">
      <div className="modal-content">
        <h2>Game Over</h2>
        <p>Congratulations, Player {winner}! You&apos;ve won the game!</p>
        <button onClick={restartGame}>Restart Game</button>
      </div>
    </div>
  );
};

export default WinnerAnnouncementModal;
