export default class Grid {
  // Function to display the starting grid of showcards
  displayStartingGrid(deck) {
    // Create a 2D array to represent the rows and columns of the grid
    const grid = [];
    for (let row = 0; row < deck.length / 5; row++) {
      grid[row] = { A: "", B: "", C: "", D: "", E: "" }; // Initialize columns for the row
      for (let col = 0; col < 5; col++) {
        const card = deck[row * 5 + col];
        const displayValue = `${card.value} of ${card.suit}`;
        const columnName = String.fromCharCode("A".charCodeAt(0) + col); // Convert 0-4 to A-E
        grid[row][columnName] = displayValue; // Assign the card display value to the correct column
      }
    }
    console.table(grid);
  }

  // Function to display the current state of the grid, showing revealed cards and hiding unrevealed ones
  displayGrid(deck) {
    // Similar approach to displayStartingGrid but with condition for revealed cards
    const grid = [];
    for (let row = 0; row < deck.length / 5; row++) {
      grid[row] = { A: "", B: "", C: "", D: "", E: "" }; // Initialize columns for the row
      for (let col = 0; col < 5; col++) {
        const card = deck[row * 5 + col];
        const displayValue = card.revealed
          ? `${card.value[0]}${card.suit[0]}`
          : "[*]";
        const columnName = String.fromCharCode("A".charCodeAt(0) + col); // Convert 0-4 to A-E
        grid[row][columnName] = displayValue; // Assign the card display value or hidden indicator to the correct column
      }
    }
    console.table(grid);
  }
}

// export default class Grid {
//     // Function to display the starting grid of showcards
//     displayStartingGrid(deck) {
//         console.table()
//         const columnLabels = '    A\t  B\t  C\t  D\t  E\n';
//         let grid = columnLabels;
//         for (let i = 0; i < deck.length; i++) {
//             if (i % 5 === 0) grid += (i / 5 + 1) + "  ";
//             let card = deck[i];
//             let displayValue =  `[${card.value}${card.suit}]`;
//             grid += `${displayValue}\t`;
//             if ((i + 1) % 5 === 0) grid += "\n";
//         }
//         console.log(grid);
//     }

//     // Function to display the current state of the grid, showing revealed cards and hiding unrevealed ones
//     displayGrid(deck) {
//         const columnLabels = '    A\t  B\t  C\t  D\t  E\n';
//         let grid = columnLabels;
//         for (let i = 0; i < deck.length; i++) {
//             if (i % 5 === 0) grid += (i / 5 + 1) + "  ";
//             let card = deck[i];
//             let displayValue = card.revealed ? `[${card.value[0]}${card.suit[0]}]` : "[*]";
//             grid += `${displayValue}\t`;
//             if ((i + 1) % 5 === 0) grid += "\n";
//         }
//         console.log(grid);
//     }

// }
