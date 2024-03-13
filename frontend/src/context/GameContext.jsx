import { createContext, useCallback, useEffect, useState } from "react";
import { createShowCardsDeck } from "@/utils";

export const GameContext = createContext();

export const GameProvider = ({ children }) => {
  // States related to the game setup
  const [currentPlayer, setCurrentPlayer] = useState(1);
  const [deck, setDeck] = useState([]);
  const [gameStarted, setGameStarted] = useState(false);
  const [totalPlayers, setTotalPlayers] = useState(0);

  // States related to game progress and outcome
  const [lastGuesses, setLastGuesses] = useState({});
  const [scores, setScores] = useState({});
  const [isGameOver, setIsGameOver] = useState(false);
  const [winner, setWinner] = useState(null);

  // Helper function for updating scores
  const updateScore = (player, score) => {
    const key = `player${player}`;
    setScores((prevScores) => ({
      ...prevScores,
      [key]: prevScores[key] + score,
    }));
  };

  // Helper function for calculating score based on guess and card
  const calculateScore = (guess, card) => {
    let score = 0;
    const exactMatch =
      guess === `${card.value.charAt(0)}${card.suit.charAt(0)}`.toUpperCase();
    const suitMatch = guess.slice(-1) === card.suit.charAt(0);
    const rankMatch = guess.slice(0, -1).toUpperCase() === card.value.charAt(0);

    if (exactMatch) score += 3;
    else if (suitMatch && rankMatch) score += 2;
    else if (suitMatch || rankMatch) score += 1;

    return score;
  };

  // Utility function to initialize scores based on the number of players
  const initializeScores = (totalPlayers) => {
    const initialScores = {};
    for (let i = 1; i <= totalPlayers; i++) {
      initialScores[`player${i}`] = 0;
    }
    return initialScores;
  };

  // Callback function for revealing a card
  const revealCard = useCallback(
    (index) => {
      const newDeck = [...deck];
      newDeck[index].revealed = true;
      setDeck(newDeck);
    },
    [deck]
  );

  // Callback function for restarting the game
  const restartGame = useCallback(() => {
    setDeck(createShowCardsDeck());
    setGameStarted(false);
    setIsGameOver(false);
    setWinner(null);
    setCurrentPlayer(1);
    setScores(initializeScores(totalPlayers));
    setLastGuesses({});
  }, [totalPlayers]);

  // Function to switch to the next player
  const switchPlayer = () => {
    setCurrentPlayer((prevPlayer) => (prevPlayer % totalPlayers) + 1);
  };

  // Function to check if the game has ended
  const checkEndGame = () => {
    const allCardsRevealed = deck.every((card) => card.revealed);
    if (allCardsRevealed) {
      setIsGameOver(true);
      const winningScore = Math.max(...Object.values(scores));
      const winner = Object.keys(scores).find(
        (key) => scores[key] === winningScore
      );
      setWinner(winner);
    }
  };

  // Function to save the last guesses and start the game
  const saveLastGuesses = (guesses) => {
    setLastGuesses(guesses);
    setGameStarted(true);
  };

  // Effect hook for initializing scores when totalPlayers changes
  useEffect(() => {
    const initialScores = {};
    for (let i = 1; i <= totalPlayers; i++) {
      initialScores[`player${i}`] = 0;
    }
    setScores(initialScores);
  }, [totalPlayers]);

  // Effect hook for creating the deck when totalPlayers changes
  useEffect(() => {
    if (totalPlayers !== 0) {
      setDeck(createShowCardsDeck());
    }
  }, [totalPlayers]);

  return (
    <GameContext.Provider
      value={{
        lastGuesses,
        saveLastGuesses,
        gameStarted,
        setGameStarted,
        currentPlayer,
        switchPlayer,
        deck,
        revealCard,
        calculateScore,
        updateScore,
        scores,
        isGameOver,
        winner,
        checkEndGame,
        restartGame,
        totalPlayers,
        setTotalPlayers,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};
