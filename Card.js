export default class Card {
    constructor() {
        this.suits = ["Hearts", "Diamonds", "Clubs", "Spades"];
        this.values = ["2", "3", "4", "5", "6", "7", "8", "9", "Ten", "Jack", "Queen", "King", "Ace"];
        this.revealedCards = new Set(); // Set to track revealed cards to prevent repeat guesses
    }

    // Function to create a basic deck of cards
    createDeck() {
        let deck = [];
        this.suits.forEach(suit => {
            values.forEach(value => {
                deck.push({ suit, value });
            });
        });
        return deck;
    }

    // Function to create a deck of scorecards
    createScorecardsDeck() {
        let deck = [];
        // Add numerals from Three to Nine for each suit
        ["Three", "Four", "Five", "Six", "Seven", "Eight", "Nine"].forEach(value => {
            this.suits.forEach(suit => {
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
    drawScorecards(deck, points) {
        let drawnCards = [];
        for (let i = 0; i < points && deck.length > 0; i++) {
            drawnCards.push(deck.pop()); // Draw from the top of the deck
        }
        return drawnCards;
    }

    // Function to create a specialized deck for the showcards, including a Joker and other special values
    createShowcardsDeck() {
        const specialValues = ["2", "Ten", "Jack", "Queen", "King", "Ace"];
        let deck = [{ suit: "None", value: "Joker", revealed: false }]; // Start with a Joker card

        this.suits.forEach(suit => {
            specialValues.forEach(value => {
                deck.push({ suit, value, revealed: false }); // Add special cards with reveal status
            });
        });
        return deck;
    }

    // Function to shuffle the deck of cards
    shuffleDeck(deck) {
        for (let i = deck.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [deck[i], deck[j]] = [deck[j], deck[i]]; // Swap the ith and jth cards
        }
    }

    // Function to mark a card as revealed based on its position and identifier
    markCardAsRevealed(position, cardIdentifier) {
        this.revealedCards.add(position + cardIdentifier);
    }

    // Function to reveal a card based on the player's guess and update the game state accordingly
    revealCardFromGuess(deck, guess, player) {
        const columnLabels = ['A', 'B', 'C', 'D', 'E'];
        const row = parseInt(guess.position[1]) - 1; // Convert '1' to 0 index
        const column = columnLabels.indexOf(guess.position[0]); // Convert 'A' to 0
        const index = row * 5 + column; // Calculate the card's index in the deck

        if (deck[index] && !deck[index].revealed) {
            deck[index].revealed = true; // Reveal the card
            console.log(`Player ${player + 1} guesses: Position ${guess.position}, Card ${guess.cardIdentifier}`);
            console.log(`Revealed card at ${guess.position}: ${deck[index].value} of ${deck[index].suit}`);
            this.markCardAsRevealed(guess.position, deck[index].value[0] + deck[index].suit[0]);
            return deck[index]; // Return the revealed card
        } else {
            return null; // No new card was revealed
        }
    }
}