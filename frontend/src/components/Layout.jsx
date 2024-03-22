import { Routes, Route, useLocation } from "react-router-dom";
import Navbar from "@/components/Navbar";
import GameModeSelection from "@/components/GameModeSelection";
import GameBoard from "@/components/GameBoard";

const Layout = () => {
  const location = useLocation();

  return (
    <>
      {location.pathname !== "/" && <Navbar />}
      <h1>Welcome to the Game</h1>

      <Routes>
        <Route path="/" element={<GameModeSelection />} />
        <Route path="/game-board" element={<GameBoard />} />
      </Routes>
    </>
  );
};

export default Layout;
