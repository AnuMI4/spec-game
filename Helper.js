export default class Helper {
    static revealedCards = new Set(); // Set to track revealed cards to prevent repeat guesses
    static revealedJokers = new Set(); // Set to track revealed cards to prevent repeat guesses
    static revealedPositions = new Set(); // Set to track revealed cards to prevent repeat guesses

    // Function to mark a card as revealed based on its position and identifier
    static markCardAsRevealed(position, cardIdentifier) {
        if (cardIdentifier == 'JN' || cardIdentifier.startsWith('2')) {
            this.revealedJokers.add(cardIdentifier);
        }
        else {
            this.revealedCards.add(cardIdentifier);
        }
        this.revealedPositions.add(position);
    }

    //Function to check if position is already opened
    static postionRevealed(position) {
        return Array.from(this.revealedPositions).includes(position);
    }

    //Function to check if card is already opened
    static cardRevealed(cardIdentifier) {
        if (cardIdentifier == 'JR') {
            return this.revealedJokers.size == 5;
        }
        return Array.from(this.revealedCards).includes(cardIdentifier);
    }

    static convertGuessPositionToIndex(position) {
        const columnLabels = ['A', 'B', 'C', 'D', 'E'];
        const row = parseInt(position[1]);
        const column = columnLabels.indexOf(position[0]); // Convert 'A' to 0
        const index = row * 5 + column; // Calculate the card's index in the deck
        return index;
    }

    static convertIndexToGuessPosition(index) {
        const columnLabels = ['A', 'B', 'C', 'D', 'E'];
        const row = Math.floor(index / 5); // Calculate row number
        const column = index % 5; // Calculate column index
        const position = columnLabels[column] + row; // Concatenate column label and row number
        return position;
    }
}