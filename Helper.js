export default class Helper {
    static revealedCards = new Set(); // Set to track revealed cards to prevent repeat guesses
    static revealedJokers = new Set(); // Set to track revealed cards to prevent repeat guesses
    static revealedPositions = new Set(); // Set to track revealed cards to prevent repeat guesses
    static lastGuess = null;

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

    static showWinner(playerNumber) {
        const reset = '\x1b[0m';
        const bold = '\x1b[1m';
        const blueBackground = '\x1b[44m'; // Standard blue background
        const redBackground = '\x1b[41m'; // Standard red background
        const whiteText = '\x1b[37m';
        const star = '✨';
        const outerPadding = star.repeat(30); // More stars for outer decoration
        let message = `Player ${playerNumber} wins!`;
        let background;
    
        if (playerNumber === 1) {
            background = `${bold}${blueBackground}${whiteText}`;
        } else if (playerNumber === 2) {
            background = `${bold}${redBackground}${whiteText}`;
        } else {
            console.log('Invalid player number.');
            return;
        }
    
        // Adjusting for message centering
        const totalLength = outerPadding.length * 2; // Double the length for both sides
        const messageLength = message.length;
        const paddingLength = Math.max((totalLength - messageLength) / 2 - messageLength / 2, 0);
        const padding = ' '.repeat(paddingLength + 8);
    
        // Constructing the output lines
        console.log(`\n\n\n\n${reset}${outerPadding}${reset}`);
        // Ensuring message is centered by adjusting padding around the message
        console.log(`${reset}${padding}${background}${message}${reset}${padding}`);
        console.log(`${reset}${outerPadding}${reset}`);
    }

    static storeLastGuess(cardIdentifier){
        this.lastGuess = cardIdentifier;
    }

    static lastGuessMatch(cardIdentifier){
        return this.lastGuess === cardIdentifier;
    }
    
}