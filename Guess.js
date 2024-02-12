import promptSync from "prompt-sync";
import Players from "./Players.js";
import Helper from "./Helper.js";
const playersObj = new Players();
const patternPostion = /^[ABCDE][0-4]$/;
const patternGuess = /^([JTQKA][HDSC])|([J][R])$/
let prompt = promptSync({ sigint: true }); // Node.js prompt-sync package for synchronously getting user input

export default class Guess {
    constructor() {
        this.predictions = []; // players last card predictions
    }

    // Function to get player input for card position and guess
    getPlayerInput(player) {
        let isPositionValid = false;
        let isGuessValid = false;
        let position = null;
        let cardIdentifier = null;
        while (!isPositionValid) {
            position = prompt(`Player ${player + 1}, enter a position (e.g. A0, B4, C1): `);
            position = position.toUpperCase();
            isPositionValid = patternPostion.test(position) ? true : false;
            if (!isPositionValid) {
                console.log('Invalid Position entered');
                // SKIP CHECKING THE POSITION REVEALED LOGIC
                continue;
            }
            // Returns true of position is revealed so inverse the result
            isPositionValid = !Helper.postionRevealed(position);
            if (!isPositionValid) {
                console.log('Position already revealed');
            }
        }
        while (!isGuessValid) {
            cardIdentifier = prompt(`Player ${player + 1}, guess the card (e.g. Ace of Spades AS, JR for Joker): `);
            cardIdentifier = cardIdentifier.toUpperCase();
            isGuessValid = patternGuess.test(cardIdentifier) ? true : false;
            if (!isGuessValid) {
                console.log('Invalid Guess entered');
                // SKIP CHECKING THE CARD REVEALED LOGIC
                continue;
            }
            // Returns true of card is revealed or 5 jokers are revealed so inverse the result
            isGuessValid = !Helper.cardRevealed(cardIdentifier);
            if (!isGuessValid) {
                console.log(`Invalid Guess. Try Again`);
            }
        }
        return { position, cardIdentifier };
    }

    // Function to get player's prediction for the last card
    getPlayerLastCardPrediction(player) {
        let isPredictionValid = false;
        let cardIdentifier = null;
        while (!isPredictionValid) {
            cardIdentifier = prompt(`Player ${player + 1}, predict the last card (e.g. Ace of Spades AS, JR for Joker): `);
            cardIdentifier = cardIdentifier.toUpperCase();
            isPredictionValid = patternGuess.test(cardIdentifier) ? true : false;
            if (!isPredictionValid) {
                console.log('Invalid Prediction entered');
            }
        }
        return cardIdentifier;
    }

    // Function to record last card predictions of all players
    recordLastCardPredictions() {
        let currentPlayer = 0;
        let prediction = null;
        for (let i = 0; i < playersObj.playerHands.length; i++) {
            prediction = this.getPlayerLastCardPrediction(currentPlayer);
            if (!this.predictions.includes(prediction)) {
                this.predictions.push(prediction);
                currentPlayer += 1;
            }
            else {
                console.log(`***** This card is already predicted *****`);
                // Only move forward if prediction is correct and different from other players
                i--;
            }
        }
    }
}
