export default class Helper {
    constructor(){
        this.revealedCards = new Set(); // Set to track revealed cards to prevent repeat guesses
    }

    // Function to mark a card as revealed based on its position and identifier
    markCardAsRevealed(position, cardIdentifier) {
        this.revealedCards.add(position + cardIdentifier);
        console.log(Array.from(this.revealedCards));
    }
    
    static convertGuessPositionToIndex(position){
        const columnLabels = ['A', 'B', 'C', 'D', 'E'];
        const row = parseInt(position[1]) - 1; // Convert '1' to 0 index
        const column = columnLabels.indexOf(position[0]); // Convert 'A' to 0
        const index = row * 5 + column; // Calculate the card's index in the deck
        return index;
    }
}