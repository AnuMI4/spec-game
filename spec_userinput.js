// Constant arrays defining the suits and values used in the game
const suits = ["Hearts", "Diamonds", "Clubs", "Spades"];
const values = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "Jack", "Queen", "King", "Ace"];
let playerHands = [[], []]; // For two players
let predictions = []; // players last card predictions

// Function to create a basic deck of cards
function createDeck() {
    let deck = [];
    suits.forEach(suit => {
        values.forEach(value => {
            deck.push({ suit, value });
        });
    });
    return deck;
}

// Function to create a deck of scorecards
function createScorecardsDeck() {
    let deck = [];
    // Add numerals from Three to Nine for each suit
    ["Three", "Four", "Five", "Six", "Seven", "Eight", "Nine"].forEach(value => {
        suits.forEach(suit => {
            deck.push({ suit, value });
        });
    });
    // Add two Jokers at the top
    deck.push({ suit: "None", value: "Joker" });
    deck.push({ suit: "None", value: "Joker" });

    // The deck is arranged with Threes at the bottom and Jokers at the top
    return deck;
}

// Function to draw scorecards from the deck
function drawScorecards(deck, points) {
    let drawnCards = [];
    for (let i = 0; i < points && deck.length > 0; i++) {
        drawnCards.push(deck.pop()); // Draw from the top of the deck
    }
    return drawnCards;
}


// Function to create a specialized deck for the showcards, including a Joker and other special values
function createShowcardsDeck() {
    const specialValues = ["2", "10", "Jack", "Queen", "King", "Ace"];
    let deck = [{ suit: "None", value: "Joker", revealed: false }]; // Start with a Joker card

    suits.forEach(suit => {
        specialValues.forEach(value => {
            deck.push({ suit, value, revealed: false }); // Add special cards with reveal status
        });
    });
    return deck;
}

// Function to shuffle the deck of cards
function shuffleDeck(deck) {
    for (let i = deck.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [deck[i], deck[j]] = [deck[j], deck[i]]; // Swap the ith and jth cards
    }
}

// Function to display the starting grid of showcards
function displayStartingGrid(deck) {
    const columnLabels = '    A\t  B\t  C\t  D\t  E\n';
    let grid = columnLabels;
    for (let i = 0; i < deck.length; i++) {
        if (i % 5 === 0) grid += (i / 5 + 1) + "  ";
        let card = deck[i];
        let displayValue =  `[${card.value}${card.suit}]`;
        grid += `${displayValue}\t`;
        if ((i + 1) % 5 === 0) grid += "\n";
    }
    console.log(grid);
}

// Function to display the current state of the grid, showing revealed cards and hiding unrevealed ones
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

// Set to track revealed cards to prevent repeat guesses
let revealedCards = new Set();

// Function to mark a card as revealed based on its position and identifier
function markCardAsRevealed(position, cardIdentifier) {
    revealedCards.add(position + cardIdentifier);
}

// Function to reveal a card based on the player's guess and update the game state accordingly
function revealCardFromGuess(deck, guess, player) {
    const columnLabels = ['A', 'B', 'C', 'D', 'E'];
    const row = parseInt(guess.position[1]) - 1; // Convert '1' to 0 index
    const column = columnLabels.indexOf(guess.position[0]); // Convert 'A' to 0
    const index = row * 5 + column; // Calculate the card's index in the deck

    if (deck[index] && !deck[index].revealed) {
        deck[index].revealed = true; // Reveal the card
        console.log(`Player ${player + 1} guesses: Position ${guess.position}, Card ${guess.cardIdentifier}`);
        console.log(`Revealed card at ${guess.position}: ${deck[index].value} of ${deck[index].suit}`);
        markCardAsRevealed(guess.position, deck[index].value[0] + deck[index].suit[0]);
        return deck[index]; // Return the revealed card
    } else {
        return null; // No new card was revealed
    }
}


// Utility function to calculate points based on the prediction and the actual card
function calculatePoints(prediction, card) {
    let points = 0;
    const suitMatch = card.suit === prediction.suit;
    const valueMatch = card.value === prediction.value;
    if (suitMatch && !valueMatch) points += 1;
    if (valueMatch && !suitMatch) points += 2;
    if (suitMatch && valueMatch) points += 4;
    return points;
}

// Function to calculate total points from scorecards
function calculateTotalPoints(hand) {
    let totalPoints = 0;
    hand.forEach(card => {
        totalPoints += card.value === "Joker" ? 10 : parseInt(card.value);
    });
    return totalPoints;
}

// Node.js prompt-sync package for synchronously getting user input
const prompt = require('prompt-sync')({sigint: true});

// Function to get player input for card position and guess
function getPlayerInput(player) {
    let patternPostion = /^[ABCDE][1-5]$/;
    let patternGuess = /^([2JQKA][HDSC])|([J][N])$/
    let isPositionValid = false;
    let isGuessValid = false;
    let position = null;
    let cardIdentifier = null;
    while (!isPositionValid) {
        position = prompt(`Player ${player + 1}, enter a position (e.g., A1): `);
        isPositionValid = patternPostion.test(position) ? true : false;
        if(!isPositionValid) {
            console.log('Invalid Position entered');
        }
    }
    while(!isGuessValid) {
        cardIdentifier = prompt(`Player ${player + 1}, guess the card (e.g., JN for Joker): `);
        isGuessValid = patternGuess.test(cardIdentifier) ? true : false;
        if(!isGuessValid) {
            console.log('Invalid Guess entered');
        }
    }
    return { position, cardIdentifier };
}

// Function to get player's prediction for the last card
function getPlayerLastCardPrediction(player) {
    let cardIdentifier = prompt(`Player ${player + 1}, Please predict the last card: (e.g., JN for Joker): `);
    return cardIdentifier;
}

// Function to record last card predictions of all players
function recordLastCardPredictions() {
    let currentPlayer = 0;

    for(let i=0; i<playerHands.length; i++){
        prediction = getPlayerLastCardPrediction(currentPlayer);
        predictions.push(prediction);
        currentPlayer += 1;
    }
}

// Function to award bonus to the player whose last card prediction is correct
function awardBonus() {
    let points = 0;
    const suitMatch = card.suit === prediction.suit;
    const valueMatch = card.value === prediction.value;
    isBonus = suitMatch && valueMatch || suitMatch && !valueMatch || !suitMatch && valueMatch;
}

// Main game function to initialize the game, handle player turns, and determine the game outcome
function playGame() {
    let deck = createShowcardsDeck();
    let scorecardsDeck = createScorecardsDeck();
    shuffleDeck(deck); // Ensure the deck is shuffled before playing
    shuffleDeck(scorecardsDeck); // Ensure scorecards deck is also shuffled
    displayStartingGrid(deck);

    recordLastCardPredictions();

    let scores = [0, 0]; // Initialize scores for both players
    let currentPlayer = 0;
    const winningScore = 173; // Define a winning score if you wish to have one

    while (scores[0] < winningScore && scores[1] < winningScore && deck.length > 1) {
        console.log(predictions);
        displayGrid(deck); // Display the current state of the deck
        let guess = getPlayerInput(currentPlayer); // Get the current player's guess
        let revealedCard = revealCardFromGuess(deck, guess, currentPlayer); // Attempt to reveal a card
        
        if (revealedCard) {
            // If a card was successfully revealed, calculate the points
            let predictedSuit = guess.cardIdentifier.slice(-1); // Last character for suit
            let predictedValue = guess.cardIdentifier.slice(0, -1); // All except last character for value
            // Adjust prediction formatting if necessary, depending on how cardIdentifier is structured
            let points = calculatePoints({suit: suits.find(s => s[0] === predictedSuit), value: values.find(v => v.startsWith(predictedValue))}, revealedCard);
            
            if (points > 0) {
                console.log(`Player ${currentPlayer + 1} earned ${points} scorecards.`);
                playerHands[currentPlayer].push(...drawScorecards(scorecardsDeck, points)); // Draw scorecards based on points earned
                scores[currentPlayer] += points; // Update the score for the current player
            } else {
                console.log("No points earned. Try again.");
            }
        } else {
            console.log("No card revealed. Try again.");
            continue; // Skip the turn change if the guess was incorrect or the card was already revealed
        }

        if (deck.every(card => card.revealed)) {
            console.log("All cards have been revealed. Ending game.");
            break; // End the game if all cards are revealed
        }

        currentPlayer = (currentPlayer + 1) % 2; // Change turns
    }

    if(deck.length == 1) {
        console.log('Revealing last card');
        awardBonus();
    }

    // Calculate final scores and determine the winner
    let player1Points = calculateTotalPoints(playerHands[0]);
    let player2Points = calculateTotalPoints(playerHands[1]);
    console.log(`Final scores - Player 1: ${player1Points}, Player 2: ${player2Points}`);

    let winner = player1Points > player2Points ? 1 : (player2Points > player1Points ? 2 : 'Tie');
    console.log(`Game over. ${winner === 'Tie' ? 'It is a tie.' : 'Player ' + winner + ' wins!'}`);
}

// Start the game
playGame();