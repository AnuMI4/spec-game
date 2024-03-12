import {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { patternGuess } from "../utils";

export const GameContext = createContext();

export const GameProvider = ({ children }) => {
  const [gameMode, setGameMode] = useState("");
  const [currentPlayer, setCurrentPlayer] = useState(1);
  const [deck, setDeck] = useState([]);
  const [lastGuesses, setLastGuesses] = useState({});
  const [gameStarted, setGameStarted] = useState(false);
  const [scores, setScores] = useState({ player1: 0, player2: 0 });
  const [isGameOver, setIsGameOver] = useState(false);
  const [winner, setWinner] = useState(null);

  // Simulated card creation logic based on your Card.js
  const suits = useMemo(() => ["Hearts", "Diamonds", "Clubs", "Spades"], []);
  const specialValues = useMemo(
    () => ["2", "Ten", "Jack", "Queen", "King", "Ace"],
    []
  );

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
    if (gameMode === "2-player") {
      setDeck(createShowCardsDeck());
    }
    // Reset or initialize the deck for other game modes as needed
  }, [gameMode, createShowCardsDeck]);

  const switchPlayer = () => {
    setCurrentPlayer((prevPlayer) => (prevPlayer === 1 ? 2 : 1));
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
    setDeck(createShowCardsDeck());
    setScores({ player1: 0, player2: 0 });
    setIsGameOver(false);
    setWinner(null);
    setCurrentPlayer(1);
  }, [createShowCardsDeck]);

  useEffect(() => {
    if (gameMode === "2-player") {
      restartGame();
    }
  }, [gameMode, restartGame]);

  return (
    <GameContext.Provider
      value={{
        gameMode,
        chooseGameMode: setGameMode,
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
      }}
    >
      {children}
    </GameContext.Provider>
  );
};
