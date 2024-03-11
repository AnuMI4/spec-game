import React from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Link  
} from "react-router-dom";
import GameView from './components/GameView';

function LandingPage () {
  return (
  <div className="app-container">
    <div className="content">
      <h1>Welcome to the Game</h1>
      <div className="button-container">
        <button className="play-btn">Play with Computer</button>
        <Link to="/player-vs-player"><button className="play-btn">2 Player Game</button></Link>
        <button className="play-btn">3 Player Game</button>
        <button className="play-btn">4 Player Game</button>
      </div>
    </div>
  </div>
  )
}

function App() {
  return (
    <Router>
      <Routes>
        {/* <Route path="/play-with-computer" element={<GameView />} /> */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/player-vs-player" element={<GameView />} />
      </Routes>
    </Router>
  );
}

export default App;
