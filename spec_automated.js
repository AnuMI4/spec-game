const suits = ["Hearts", "Diamonds", "Clubs", "Spades"];
const values = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "Jack", "Queen", "King", "Ace"];

function createDeck() {
  let deck = [];
  suits.forEach(suit => {
    values.forEach(value => {
      deck.push({ suit, value });
    });
  });
  return deck;
}

let revealedCards = new Set(); // Tracks revealed cards in "PositionCardIdentifier" format, e.g., "A1JN"
const prompt = require('prompt-sync')({sigint: true});

function getPlayerInput(player) {
  let position = prompt(`Player ${player + 1}, enter a position (e.g., A1): `);
  let cardIdentifier = prompt(`Player ${player + 1}, guess the card (e.g., JN for Joker): `);
  return { position, cardIdentifier };
}

function getPlayerPrediction(player) {
  const gridPositions = ['A1', 'B1', 'C1', 'D1', 'E1', 'A2', 'B2', 'C2', 'D2', 'E2', 'A3', 'B3', 'C3', 'D3', 'E3', 'A4', 'B4', 'C4', 'D4', 'E4', 'A5', 'B5', 'C5', 'D5', 'E5'];
  const cardIdentifiers = ['JN', 'AC', 'AD', 'AH', 'AS', 'KC', 'KD', 'KH', 'KS', 'QC', 'QD', 'QH', 'QS', 'JC', 'JD', 'JH', 'JS', '10C', '10D', '10H', '10S', '2C', '2D', '2H', '2S'];

  let position, cardIdentifier, guess;
  do {
    position = gridPositions[Math.floor(Math.random() * gridPositions.length)];
    cardIdentifier = cardIdentifiers[Math.floor(Math.random() * cardIdentifiers.length)];
    guess = position + cardIdentifier; // Concatenate to create a unique identifier for the guess
  } while (revealedCards.has(guess)); // Generate a new guess if the current one has already been revealed

  // console.log(`Player ${player + 1} guesses: Position ${position}, Card ${cardIdentifier}`);
  return { position, cardIdentifier };
}

// Example: After revealing a card, mark it as revealed
function markCardAsRevealed(position, cardIdentifier) {
  revealedCards.add(position + cardIdentifier);
}


function calculatePoints(prediction, card) {
  let points = 0;
  if (card.suit === prediction.suit) points += 1;
  if (card.value === prediction.value) points += 5;
  return points;
}

function createShowcardsDeck() {
  const suits = ["Hearts", "Diamonds", "Clubs", "Spades"];
  const specialValues = ["2", "10", "Jack", "Queen", "King", "Ace"];
  let deck = [{ suit: "None", value: "Joker", revealed: false }]; // Include reveal flag

  suits.forEach(suit => {
      specialValues.forEach(value => {
          deck.push({ suit, value, revealed: false });
      });
  });
  return deck;
}

function shuffleDeck(deck) {
    for (let i = deck.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [deck[i], deck[j]] = [deck[j], deck[i]];
    }
}

// Adjust the displayGrid function to show the grid of 25 showcards with labels
function displayGrid(deck) {
  const columnLabels = '    A\t  B\t  C\t  D\t  E\n';
  let grid = columnLabels;
  for (let i = 0; i < deck.length; i++) {
      if (i % 5 === 0) grid += (i / 5 + 1) + "  ";
      let card = deck[i];
      let displayValue = card.revealed ? `[${card.value[0]}${card.suit[0]}]` : "[*]";
      grid += `${displayValue}\t`;
      if ((i + 1) % 5 === 0) grid += "\n";
  }
  console.log(grid);
}

function revealCardFromGuess(deck, guess, player) {
  const columnLabels = ['A', 'B', 'C', 'D', 'E'];
  const row = parseInt(guess.position[1]) - 1; // Convert '1' to 0 index
  const column = columnLabels.indexOf(guess.position[0]); // Convert 'A' to 0
  const index = row * 5 + column; // Calculate the card's index in the deck

  if (deck[index] && !deck[index].revealed) {
      deck[index].revealed = true; // Reveal the card
      console.log(`Player ${player + 1} guesses: Position ${guess.position}, Card ${guess.cardIdentifier}`);
      console.log(`Revealed card at ${guess.position}: ${deck[index].value} of ${deck[index].suit}`);
      // Mark the card as revealed in the revealedCards set
      markCardAsRevealed(guess.position, deck[index].value[0] + deck[index].suit[0]);
      return true; // Card was successfully revealed
  } else {
      // console.log(`No card at position ${guess.position} or card already revealed.`);
      return false; // No new card was revealed
  }
}

function displayStartingGrid(deck) {
    console.log("Grid of showcards:");
    let grid = "";
    for (let i = 0; i < deck.length; i++) {
        let card = deck[i];
        grid += `[${card.value} of ${card.suit}]\t`;
        if ((i + 1) % 5 === 0) grid += "\n"; // New line after every 5 cards
    }
    console.log(grid);
}

function playGame() {
  let deck = createShowcardsDeck();
  shuffleDeck(deck);
  let scores = [0, 0];
  let currentPlayer = 0;
  const winningScore = 173;

  while (scores[0] < winningScore && scores[1] < winningScore && deck.length > 0) {
      let guess = getPlayerPrediction(currentPlayer);
      const cardRevealed = revealCardFromGuess(deck, guess, currentPlayer); // Adjust this function to return true if a card was revealed
      
      if (!cardRevealed) {
        // console.log("Wrong guess or card already revealed. Guess again.");
        continue; // Skip changing player turn
      }
      else{
        displayGrid(deck);
      }

      if (deck.every(card => card.revealed)) {
          console.log("All cards have been revealed. Ending game.");
          break;
      }

      currentPlayer = (currentPlayer + 1) % 2;
  }

  if (!deck.every(card => card.revealed)) {
      const winner = scores[0] >= winningScore ? 1 : (scores[1] >= winningScore ? 2 : 'No winner');
      console.log(`Game over. Player ${winner} wins!`);
  } else {
      console.log("Game over. All cards have been revealed.");
  }
}

playGame();