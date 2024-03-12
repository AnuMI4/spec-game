import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { GameContext } from "../context/GameContext";
import ExitConfirmationModal from "./ExitConfirmationModal";

const Navbar = () => {
  const [showExitModal, setShowExitModal] = useState(false);
  const { restartGame } = useContext(GameContext);
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

  return (
    <>
      <nav>
        <ul>
          <li>
            <Link to="/" onClick={handleExitClick}>
              Home
            </Link>
          </li>
        </ul>
      </nav>
      <ExitConfirmationModal
        isOpen={showExitModal}
        onConfirm={handleConfirmExit}
        onCancel={() => setShowExitModal(false)}
      />
    </>
  );
};

export default Navbar;
