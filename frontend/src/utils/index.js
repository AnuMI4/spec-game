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
