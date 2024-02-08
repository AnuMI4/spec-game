import Card from "./Card.js";
import Grid from "./Grid.js";
import Guess from "./Guess.js";
import Points from "./Points.js"
import Players from "./Players.js";
const cardObj = new Card();
const gridObj = new Grid();
const guessObj = new Guess();
const pointsObj = new Points();
const playersObj = new Players();

export default class Game {

    // Main game function to initialize the game, handle player turns, and determine the game outcome
    playGame() {
        let deck = cardObj.createShowcardsDeck();
        let scorecardsDeck = cardObj.createScorecardsDeck();
        cardObj.shuffleDeck(deck); // Ensure the deck is shuffled before playing
        cardObj.shuffleDeck(scorecardsDeck); // Ensure scorecards deck is also shuffled
        gridObj.displayStartingGrid(deck);

        guessObj.recordLastCardPredictions();

        let scores = [0, 0]; // Initialize scores for both players
        let currentPlayer = 0;
        const winningScore = 173; // Define a winning score if you wish to have one

        while (scores[0] < winningScore && scores[1] < winningScore && deck.length > 1) {
            console.log(guessObj.predictions);
            gridObj.displayGrid(deck); // Display the current state of the deck
            let guess = guessObj.getPlayerInput(currentPlayer); // Get the current player's guess
            let revealedCard = cardObj.revealCardFromGuess(deck, guess, currentPlayer); // Attempt to reveal a card
            
            if (revealedCard) {
                // If a card was successfully revealed, calculate the points
                let predictedSuit = guess.cardIdentifier.slice(-1); // Last character for suit
                let predictedValue = guess.cardIdentifier.slice(0, -1); // All except last character for value
                // Adjust prediction formatting if necessary, depending on how cardIdentifier is structured
                let points = pointsObj.calculatePoints({suit: cardObj.suits.find(s => s[0] === predictedSuit), value: cardObj.values.find(v => v.startsWith(predictedValue))}, revealedCard);
                
                if (points > 0) {
                    console.log(`Player ${currentPlayer + 1} earned ${points} scorecards.`);
                    playersObj.playerHands[currentPlayer].push(...cardObj.drawScorecards(scorecardsDeck, points)); // Draw scorecards based on points earned
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
            pointsObj.awardBonusawardBonus();
        }

        // Calculate final scores and determine the winner
        let player1Points = pointsObj.calculateTotalPoints(playersObj.playerHands[0]);
        let player2Points = pointsObj.calculateTotalPoints(playersObj.playerHands[1]);
        console.log(`Final scores - Player 1: ${player1Points}, Player 2: ${player2Points}`);

        let winner = player1Points > player2Points ? 1 : (player2Points > player1Points ? 2 : 'Tie');
        console.log(`Game over. ${winner === 'Tie' ? 'It is a tie.' : 'Player ' + winner + ' wins!'}`);
    }
}