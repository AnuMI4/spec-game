import {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { patternGuess } from "@/utils";

export const GameContext = createContext();

export const GameProvider = ({ children }) => {
  const [currentPlayer, setCurrentPlayer] = useState(1);
  const [deck, setDeck] = useState([]);
  const [lastGuesses, setLastGuesses] = useState({});
  const [gameStarted, setGameStarted] = useState(false);
  const [scores, setScores] = useState({}); // Empty object to dynamically add player scores
  const [isGameOver, setIsGameOver] = useState(false);
  const [winner, setWinner] = useState(null);
  const [totalPlayers, setTotalPlayers] = useState(0);

  // Simulated card creation logic based on your Card.js
  const suits = useMemo(() => ["Hearts", "Diamonds", "Clubs", "Spades"], []);
  const specialValues = useMemo(
    () => ["2", "Ten", "Jack", "Queen", "King", "Ace"],
    []
  );

  useEffect(() => {
    const initialScores = {};
    for (let i = 1; i <= totalPlayers; i++) {
      initialScores[`player${i}`] = 0; // Initialize scores for each player
    }
    setScores(initialScores);
  }, [totalPlayers]);

  const saveLastGuesses = (guesses) => {
    setLastGuesses(guesses);
    setGameStarted(true);
  };

  const validateGuessFormat = (guess) => {
    return patternGuess.test(guess);
  };

  const calculateScore = (guess, card) => {
    let score = 0;
    // Assuming card object has { value, suit } structure
    const exactMatch =
      guess === `${card.value.charAt(0)}${card.suit.charAt(0)}`.toUpperCase();
    const suitMatch = guess.slice(-1) === card.suit.charAt(0);
    const rankMatch = guess.slice(0, -1).toUpperCase() === card.value.charAt(0);

    if (exactMatch) score += 3; // Example scoring logic
    else if (suitMatch && rankMatch) score += 2;
    else if (suitMatch || rankMatch) score += 1;

    return score;
  };

  const updateScore = (player, score) => {
    const key = `player${player}`;
    setScores((prevScores) => ({
      ...prevScores,
      [key]: prevScores[key] + score,
    }));
  };

  const revealCard = (index) => {
    const newDeck = [...deck];
    newDeck[index].revealed = true;
    setDeck(newDeck);
  };

  // Shuffle the deck
  const shuffleDeck = useCallback((deck) => {
    for (let i = deck.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [deck[i], deck[j]] = [deck[j], deck[i]]; // ES6 array destructuring to swap elements
    }
    return deck;
  }, []);

  const createShowCardsDeck = useCallback(() => {
    let deck = [{ suit: "None", value: "Joker", revealed: false }]; // Start with a Joker
    suits.forEach((suit) => {
      specialValues.forEach((value) => {
        deck.push({ suit, value, revealed: false }); // Add special cards with reveal status
      });
    });
    return shuffleDeck(deck);
  }, [suits, specialValues, shuffleDeck]);

  useEffect(() => {
    if (totalPlayers !== 0) {
      setDeck(createShowCardsDeck());
    }
  }, [totalPlayers, createShowCardsDeck]);

  const switchPlayer = () => {
    setCurrentPlayer((prevPlayer) => (prevPlayer % totalPlayers) + 1);
  };

  const checkEndGame = () => {
    const allCardsRevealed = deck.every((card) => card.revealed);
    if (allCardsRevealed) {
      setIsGameOver(true);
      const winningScore = Math.max(scores.player1, scores.player2);
      const winner = Object.keys(scores).find(
        (key) => scores[key] === winningScore
      );
      setWinner(winner);
    }
  };

  const restartGame = useCallback(() => {
    setDeck(createShowCardsDeck()); // Initialize the deck
    setGameStarted(false); // Reset game start flag
    setIsGameOver(false); // Reset game over flag
    setWinner(null); // Clear winner
    setCurrentPlayer(1); // Start with player 1

    // Initialize scores for the current number of players
    const initialScores = {};
    for (let i = 1; i <= totalPlayers; i++) {
      initialScores[`player${i}`] = 0;
    }
    setScores(initialScores);

    // Optionally reset lastGuesses if necessary
    setLastGuesses({});
  }, [createShowCardsDeck, totalPlayers]);

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
        validateGuessFormat,
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
