import { Routes, Route, useLocation } from "react-router-dom";
import Navbar from "@/components/Navbar";
import GameModeSelection from "@/components/GameModeSelection";
import LastGuessInput from "@/components/LastGuessInput";
import GameBoard from "@/components/GameBoard";

const Layout = () => {
  const location = useLocation();

  return (
    <>
      {location.pathname !== "/" && <Navbar />}
      <h1>Welcome to the Game</h1>

      <Routes>
        <Route path="/" element={<GameModeSelection />} />
        <Route path="/last-guess" element={<LastGuessInput />} />
        <Route path="/game-board" element={<GameBoard />} />
      </Routes>
    </>
  );
};

export default Layout;
