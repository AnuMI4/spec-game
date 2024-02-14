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
        gridObj.displayStartingGrid(deck);
        guessObj.recordLastCardPredictions();

        let scores = [0, 0]; // Initialize scores for both players
        let currentPlayer = 0;
        let lastPlayerToScore = null;
        const winningScore = 173; // Define a winning score if you wish to have one
        while (scores[0] < winningScore && scores[1] < winningScore && deck.length > 1) {
            console.log(deck.filter(card => card.revealed).length);
            // console.log(guessObj.predictions);
            gridObj.displayStartingGrid(deck);
            gridObj.displayGrid(deck); // Display the current state of the deck

            let guess = guessObj.getPlayerInput(currentPlayer); // Get the current player's guess
            let revealedCard = cardObj.revealCardFromGuess(deck, guess, currentPlayer); // Attempt to reveal a card

            if (revealedCard) {
                // If a card was successfully revealed, calculate the points
                let predictedSuit = guess.cardIdentifier.slice(-1); // Last character for suit
                let predictedValue = guess.cardIdentifier.slice(0, -1); // All except last character for value
                // Adjust prediction formatting if necessary, depending on how cardIdentifier is structured
                let suitExtracted = cardObj.suits.find(s => s[0] === predictedSuit) || "None";
                let valueExtracted = suitExtracted === "None" && predictedValue == "J" ? "Joker" : cardObj.values.find(v => v.startsWith(predictedValue));
                let retreivedCard = { suit: suitExtracted, value: valueExtracted };
                let points = pointsObj.calculatePoints(retreivedCard, revealedCard);

                if (points > 0 && scorecardsDeck.length) {
                    playersObj.playerHands[currentPlayer].push(...cardObj.drawScorecards(scorecardsDeck, points)); // Draw scorecards based on points earned
                    scores[currentPlayer] += points; // Update the score for the current player
                    console.log(`Player ${currentPlayer + 1} earned ${points} scorecards. \nPlayer ${currentPlayer + 1} total cards: ${playersObj.playerHands[currentPlayer].length}`);
                    lastPlayerToScore = currentPlayer;
                } else {
                    console.log("No points earned.");
                }
            } else {
                console.log("No card revealed. Try again.");
                continue; // Skip the turn change if the guess was incorrect or the card was already revealed
            }

            // Check if last card is remaining
            if (deck.filter(card => card.revealed).length === 24) {
                console.log('Revealing last card');
                let revealedCard = cardObj.revealLastCard(deck);

                let predictedSuit =  null;
                let predictedValue =  null; 
                let suitExtracted =  null;
                let valueExtracted = null;
                let retreivedCard = null;

                // checking if any of the predictions matched the last card
                for (let i=0; i<=playersObj.playerHands.length; i++) {
                    predictedSuit = guessObj.predictions[i].slice(-1); // Last character for suit
                    predictedValue = guessObj.predictions[i].slice(0, -1); // All except last character for value
                    suitExtracted = cardObj.suits.find(s => s[0] === predictedSuit) || "None";
                    valueExtracted = suitExtracted === "None" && predictedValue == "J" ? "Joker" : cardObj.values.find(v => v.startsWith(predictedValue));
                    retreivedCard = { suit: suitExtracted, value: valueExtracted };

                    if (retreivedCard.suit === revealedCard.suit && retreivedCard.value === revealedCard.value) {
                        let points = scorecardsDeck.length;
                        playersObj.playerHands[i].push(...cardObj.drawScorecards(scorecardsDeck, points));
                        scores[i] += points;
                        console.log(playersObj.playerHands[i]);
                        console.log(`Bonus is awarded to Player ${i + 1} predicting correct card`);
                        break;
                    }

                    else if (!(retreivedCard.suit === revealedCard.suit) && retreivedCard.value === revealedCard.value) {
                        let points = scorecardsDeck.length;
                        playersObj.playerHands[i].push(...cardObj.drawScorecards(scorecardsDeck, points));
                        scores[i] += points;
                        console.log(playersObj.playerHands[i]);
                        console.log(`Bonus is awarded to Player ${i + 1} predicting correct rank`);
                        break;
                    }

                    else if (retreivedCard.suit === revealedCard.suit && !(retreivedCard.value === revealedCard.value)) {
                        let points = scorecardsDeck.length;
                        playersObj.playerHands[i].push(...cardObj.drawScorecards(scorecardsDeck, points));
                        scores[i] += points;
                        console.log(playersObj.playerHands[i]);
                        console.log(`Bonus is awarded to Player ${i + 1} predicting correct suit`);
                        break;
                    }

                    else if (lastPlayerToScore === i) {
                        let points = scorecardsDeck.length;
                        playersObj.playerHands[i].push(...cardObj.drawScorecards(scorecardsDeck, points));
                        scores[i] += points;
                        console.log(playersObj.playerHands[i]);
                        console.log(`Bonus is awarded to Player ${i + 1} as this player won the last scorecard`);
                        break;
                    }
                }
            }

            if (deck.every(card => card.revealed)) {
                console.log("All cards have been revealed. Ending game.");
                break; // End the game if all cards are revealed
            }
            // console.log(playersObj.playerHands[currentPlayer]);
            console.log(`\n***** Remaining scorecards on deck: ${scorecardsDeck.length}. *****`);
            currentPlayer = (currentPlayer + 1) % 2; // Change turns
        }

        // Calculate final scores and determine the winner
        let player1Points = pointsObj.calculateTotalPoints(playersObj.playerHands[0]);
        let player2Points = pointsObj.calculateTotalPoints(playersObj.playerHands[1]);
        console.log(`Final scores - Player 1: ${player1Points}, Player 2: ${player2Points}`);

        let winner = player1Points > player2Points ? 1 : (player2Points > player1Points ? 2 : 'Tie');
        console.log(`Game over. ${winner === 'Tie' ? 'It is a tie.' : 'Player ' + winner + ' wins!'}`);
    }
}