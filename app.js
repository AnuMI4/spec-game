const readline = require('readline');

// Function to generate a grid of specified size with numbers from 1 to size*size
function generateGrid(size) {
    let grid = [];
    let counter = 1;

    for (let i = 0; i < size; i++) {
        let row = [];
        for (let j = 0; j < size; j++) {
            row.push(counter++);
        }
        grid.push(row);
    }

    return grid;
}

// Function to display the grid
function displayGrid(grid) {
    for (let i = 0; i < grid.length; i++) {
        console.log(grid[i].join("\t"));
    }
}

// Function to take user input for a number from 1 to 25
function getUserInput(callback) {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    rl.question("Enter a number from 1 to 25 to select a number from the grid: ", (input) => {
        rl.close();
        const number = parseInt(input);
        if (isNaN(number) || number < 1 || number > 25) {
            console.log("Invalid input. Please enter a valid number from 1 to 25.");
            return;
        }
        callback(number);
    });
}

// Main function to execute the program
function main() {
    // Generate the grid
    const grid = generateGrid(5);

    // Display the grid
    console.log("5x5 Grid with Numbers 1-25:");
    displayGrid(grid);

    // Take user input for a number from 1 to 25
    getUserInput((selectedNumber) => {
        console.log(`Selected number from the grid: ${selectedNumber}`);
    });
}

// Call the main function to start the program
main();
