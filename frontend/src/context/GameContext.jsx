import { createContext, useCallback, useEffect, useState } from "react";
import { createScorecardsDeck, createShowCardsDeck } from "@/utils";

export const GameContext = createContext();

export const GameProvider = ({ children }) => {
  // States related to the game setup
  const [currentPlayer, setCurrentPlayer] = useState(1);
  const [deck, setDeck] = useState([]);
  const [scoreCards, setScoreCards] = useState([]);
  const [gameStarted, setGameStarted] = useState(false);
  const [totalPlayers, setTotalPlayers] = useState(2);

  // States related to game progress and outcome
  const [lastGuesses, setLastGuesses] = useState({});
  const [scores, setScores] = useState({});
  const [playerScoreCards, setPlayerScoreCards] = useState({});
  const [isGameOver, setIsGameOver] = useState(false);
  const [winner, setWinner] = useState(null);
  const [currentRound, setCurrentRound] = useState(1);

  // Helper function for updating scores
  const updateScore = (player, score) => {
    const key = `player${player}`;
    setScores((prevScores) => ({
      ...prevScores,
      [key]: (prevScores[key] || 0) + score,
    }));

    if (scoreCards.length === 0) return;
    setPlayerScoreCards((prevScoreCards) => {
      // Determine the start index for slicing the last n items
      const startIndex = Math.max(0, scoreCards.length - score);
      // Get the last n items from scoreCards
      const itemsToAdd = scoreCards.slice(startIndex);

      return {
        ...prevScoreCards,
        [key]: [...prevScoreCards[key], ...itemsToAdd], // Add the items to the player's array
      };
    });

    // Update the scoreCards state to remove the last n items
    setScoreCards((prevCards) => prevCards.slice(0, prevCards.length - score));
  };

  // Helper function for calculating score based on guess and card
  const calculateScore = (guess, card) => {
    let score = 0;
    const exactMatch =
      guess === `${card.value.charAt(0)}${card.suit.charAt(0)}`.toUpperCase();
    const suitMatch = guess.slice(-1) === card.suit.charAt(0);
    const rankMatch = guess.slice(0, -1).toUpperCase() === card.value.charAt(0);

    if (exactMatch) score += 4;
    else if (
      !suitMatch &&
      rankMatch &&
      card.value !== "Joker" &&
      guess !== "JR"
    )
      score += 2;
    else if (suitMatch && !rankMatch && card.value !== "Joker") score += 1;
    else if (card.value.charAt(0) === "2" && guess === "JR") score += 2;
    else if (
      `${card.value.charAt(0)}${card.suit.charAt(0)}` === "JN" &&
      guess === "JR"
    )
      score += 4;

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

  const initializeScoreCards = (totalPlayers) => {
    const initialScores = {};
    for (let i = 1; i <= totalPlayers; i++) {
      initialScores[`player${i}`] = [];
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
    setScoreCards(createScorecardsDeck());
    setGameStarted(false);
    setIsGameOver(false);
    setWinner(null);
    setCurrentPlayer(1);
    setCurrentRound(1);
    setScores(initializeScores(totalPlayers));
    setPlayerScoreCards(initializeScoreCards(totalPlayers));
    setLastGuesses({});
  }, [totalPlayers]);

  // // Function to switch to the next player
  // const switchPlayer = () => {
  //   setCurrentPlayer((prevPlayer) => (prevPlayer % totalPlayers) + 1);
  // };

  // Function to switch to the next player
  const switchPlayer = () => {
    // Check if there's only one card left in the deck
    if (deck.every((card) => card.revealed)) {
      // Logic to determine and set the round's winner based on scores
      const maxScore = Math.max(...Object.values(scores));
      const winningPlayer = Object.keys(scores).find(
        (key) => scores[key] === maxScore
      );
      console.log("winner", winningPlayer);
      setWinner(winningPlayer);

      // Prepare for the next round
      // prepareNextRound();
      setIsGameOver(true);
    } else {
      setCurrentPlayer((prevPlayer) => (prevPlayer % totalPlayers) + 1);
    }
  };

  // Resets only necessary states for starting a new round
  const prepareNextRound = useCallback(() => {
    // Check if there are more rounds to play
    if (currentRound < totalPlayers) {
      setCurrentRound(currentRound + 1); // Move to the next round
      setDeck(createShowCardsDeck()); // Initialize the deck for the new round
      setScoreCards(createScorecardsDeck()); // Reset or initialize scoreCards for the new round if used
      setLastGuesses({}); // Clear last guesses to allow new input
      setGameStarted(false); // Requires new setup (e.g., collecting last guesses) to start the round
      setIsGameOver(false); // Ensure game over state is reset
      // Note: Scores are maintained and not reset here
    } else {
      // Handling the end of the last round, potentially determining the overall winner
      setIsGameOver(true);
      // Logic to determine and set the game's overall winner based on scores
      const maxScore = Math.max(...Object.values(scores));
      const winningPlayer = Object.keys(scores).find(
        (key) => scores[key] === maxScore
      );
      setWinner(winningPlayer);
    }
  }, [currentRound, totalPlayers, scores]);

  // Function to save the last guesses and start the game
  const saveLastGuesses = (guesses) => {
    setLastGuesses(guesses);
    setGameStarted(true);
  };

  // Effect hook for initializing scores when totalPlayers changes
  useEffect(() => {
    // const initialScores = {};
    const initialScoreCards = {};
    for (let i = 1; i <= totalPlayers; i++) {
      // initialScores[`player${i}`] = 0;
      initialScoreCards[`player${i}`] = [];
    }
    // setScores(initialScores);
    setPlayerScoreCards(initialScoreCards);
  }, [totalPlayers]);

  // Effect hook for creating the deck when totalPlayers changes
  useEffect(() => {
    if (totalPlayers !== 0) {
      setDeck(createShowCardsDeck());
      setScoreCards(createScorecardsDeck());
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
        restartGame,
        totalPlayers,
        setTotalPlayers,
        currentRound,
        prepareNextRound,
        scoreCards,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};
