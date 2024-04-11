import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useGame } from "@/context/useGame";
import ExitConfirmationModal from "@/components/modals/ExitConfirmationModal";
import HowToPlayModal from "@/components/modals/HowToPlayModal";

const Navbar = () => {
  const [showExitModal, setShowExitModal] = useState(false);
  const [isHowToPlayOpen, setIsHowToPlayOpen] = useState(false);
  const { restartGame } = useGame();
  const navigate = useNavigate();

  const handleExitClick = (e) => {
    e.preventDefault();
    setShowExitModal(true);
  };

  const handleConfirmExit = () => {
    restartGame();
    setShowExitModal(false);
    navigate("/");
  };

  const toggleHowToPlay = () => setIsHowToPlayOpen(!isHowToPlayOpen);

  return (
    <>
      <nav>
        <ul>
          <li>
            <Link to="/" onClick={handleExitClick}>
              Home
            </Link>
          </li>
          <li><button onClick={toggleHowToPlay} className="how-to-play-btn">How to Play</button></li>
        </ul>
      </nav>
      <ExitConfirmationModal
        isOpen={showExitModal}
        onConfirm={handleConfirmExit}
        onCancel={() => setShowExitModal(false)}
      />
      <HowToPlayModal
          isOpen={isHowToPlayOpen}
          onClose={toggleHowToPlay}
      />
    </>
  );
};

export default Navbar;
