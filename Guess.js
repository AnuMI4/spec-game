import promptSync from "prompt-sync";
import Players from "./Players.js";
import Helper from "./Helper.js";
const playersObj = new Players();
const patternPostion = /^[ABCDE][1-5]$/;
const patternGuess = /^([JTQKA][HDSC])|([J][R])$/
let prompt = promptSync({ sigint: true }); // Node.js prompt-sync package for synchronously getting user input

export default class Guess {
    constructor() {
        this.predictions = []; // players last card predictions
    }

    // Function to get player input for card position and guess
    getPlayerInput(deck, player) {
        let isPositionValid = false;
        let isGuessValid = false;
        let position = null;
        let cardIdentifier = null;
        while (!isPositionValid) {
            position = prompt(`Player ${player + 1}, enter a position (e.g. A1, B5): `);
            isPositionValid = patternPostion.test(position) ? true : false;
            let index = Helper.convertGuessPositionToIndex(position);
            if(deck[index] && deck[index].revealed)
                isPositionValid = false;
            if(!isPositionValid) {
                console.log('Invalid Position entered');
            }
        }
        while(!isGuessValid) {
            cardIdentifier = prompt(`Player ${player + 1}, guess the card (e.g. Ace of Spades AS, JR for Joker): `);
            isGuessValid = patternGuess.test(cardIdentifier) ? true : false;
            if(!isGuessValid) {
                console.log('Invalid Guess entered');
            }
        }
        return { position, cardIdentifier };
    }

    // Function to get player's prediction for the last card
    getPlayerLastCardPrediction(player) {
        let isPredictionValid = false;
        let cardIdentifier = null;
        while(!isPredictionValid) {
            cardIdentifier = prompt(`Player ${player + 1}, guess the last card (e.g. Ace of Spades AS, JR for Joker): `);
            isPredictionValid = patternGuess.test(cardIdentifier) ? true : false;
            if(!isPredictionValid) {
                console.log('Invalid Prediction entered');
            }
        }
        return cardIdentifier;
    }

    // Function to record last card predictions of all players
    recordLastCardPredictions() {
        let currentPlayer = 0;
        let prediction = null;
        for(let i=0; i<playersObj.playerHands.length; i++){
            prediction = this.getPlayerLastCardPrediction(currentPlayer);
            this.predictions.push(prediction);
            currentPlayer += 1;
        }
    }
}
