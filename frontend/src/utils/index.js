// A pattern that matches card identifiers, assuming a format like "AS" for Ace of Spades or "JR" for Joker.
// Adjust the pattern as per your card identifiers.
export const patternGuess = /^([TJQKA][HDSC]|JR)$/i;

export const suits = ["Hearts", "Diamonds", "Clubs", "Spades"];

export const specialValues = ["2", "Ten", "Jack", "Queen", "King", "Ace"];

export const validateGuessFormat = (guess) => {
  return patternGuess.test(guess);
};

export const shuffleDeck = (deck) => {
  for (let i = deck.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [deck[i], deck[j]] = [deck[j], deck[i]]; // ES6 array destructuring to swap elements
  }
  return deck;
};

export const createShowCardsDeck = () => {
  let deck = [{ suit: "None", value: "Joker", revealed: false }]; // Start with a Joker
  suits.forEach((suit) => {
    specialValues.forEach((value) => {
      deck.push({ suit, value, revealed: false }); // Add special cards with reveal status
    });
  });
  return shuffleDeck(deck);
};

// Function to create a deck of scorecards
export const createScorecardsDeck = () => {
  let scoreDeck = [];
  // Add numerals from Three to Nine for each suit
  ["3", "4", "5", "6", "7", "8", "9"].forEach(value => {
      suits.forEach(suit => {
        scoreDeck.push({ suit, value });
      });
  });
  // Add two Jokers at the top
  scoreDeck.push({ suit: "None", value: "Joker" });
  scoreDeck.push({ suit: "None", value: "Joker" });

  // The deck is arranged with Threes at the bottom and Jokers at the top
  return scoreDeck;
}
