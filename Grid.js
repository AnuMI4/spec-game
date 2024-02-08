export default class Grid {
    // Function to display the starting grid of showcards
    displayStartingGrid(deck) {
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
    displayGrid(deck) {
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

}