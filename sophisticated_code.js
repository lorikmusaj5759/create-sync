/* sophisticated_code.js */

// This code demonstrates a complex simulation of a virtual ecosystem with different types of organisms, including plants, herbivores, and carnivores.

// Global variables
const ecosystemSize = 50; // Size of the ecosystem (total number of cells)
const plantDensity = 0.3; // Probability of a cell being populated by a plant
const herbivoreDensity = 0.1; // Probability of a cell being populated by a herbivore
const carnivoreDensity = 0.05; // Probability of a cell being populated by a carnivore

// Define the ecosystem grid
let ecosystem = [];

// Generate the initial state of the ecosystem
function initializeEcosystem() {
  for (let i = 0; i < ecosystemSize; i++) {
    let row = [];
    for (let j = 0; j < ecosystemSize; j++) {
      const randomNumber = Math.random();
      if (randomNumber < plantDensity) {
        row.push('P'); // P represents a plant
      } else if (randomNumber < plantDensity + herbivoreDensity) {
        row.push('H'); // H represents a herbivore
      } else if (randomNumber < plantDensity + herbivoreDensity + carnivoreDensity) {
        row.push('C'); // C represents a carnivore
      } else {
        row.push(' '); // Empty cell
      }
    }
    ecosystem.push(row);
  }
}

// Simulate the ecosystem for a given number of steps
function simulate(steps) {
  for (let step = 1; step <= steps; step++) {
    console.log(`Step ${step}:`);
    updateEcosystem();
    displayEcosystem();
  }
}

// Update the state of the ecosystem
function updateEcosystem() {
  for (let i = 0; i < ecosystemSize; i++) {
    for (let j = 0; j < ecosystemSize; j++) {
      const organism = ecosystem[i][j];
      switch (organism) {
        case 'H': // Herbivore
          moveHerbivore(i, j);
          break;
        case 'C': // Carnivore
          moveCarnivore(i, j);
          break;
        default:
          // Do nothing for plants or empty cells
          break;
      }
    }
  }
}

// Move a herbivore to a nearby empty cell
function moveHerbivore(i, j) {
  const options = getEmptyAdjacentCells(i, j);
  if (options.length > 0) {
    const randomIndex = Math.floor(Math.random() * options.length);
    const [newI, newJ] = options[randomIndex];
    ecosystem[newI][newJ] = 'H';
    ecosystem[i][j] = ' ';
  }
}

// Move a carnivore to a nearby empty cell if there is a herbivore nearby, otherwise move randomly
function moveCarnivore(i, j) {
  const herbivoreOptions = getAdjacentCells(i, j, 'H');
  if (herbivoreOptions.length > 0) {
    const randomIndex = Math.floor(Math.random() * herbivoreOptions.length);
    const [herbivoreI, herbivoreJ] = herbivoreOptions[randomIndex];
    ecosystem[herbivoreI][herbivoreJ] = 'C';
    ecosystem[i][j] = ' ';
  } else {
    const emptyOptions = getEmptyAdjacentCells(i, j);
    if (emptyOptions.length > 0) {
      const randomIndex = Math.floor(Math.random() * emptyOptions.length);
      const [newI, newJ] = emptyOptions[randomIndex];
      ecosystem[newI][newJ] = 'C';
      ecosystem[i][j] = ' ';
    }
  }
}

// Get the list of adjacent cells with a specific organism type
function getAdjacentCells(i, j, organismType) {
  const adjacentCells = [];
  for (let x = -1; x <= 1; x++) {
    for (let y = -1; y <= 1; y++) {
      const newRow = i + x;
      const newCol = j + y;
      if (newRow >= 0 && newRow < ecosystemSize && newCol >= 0 && newCol < ecosystemSize) {
        if (ecosystem[newRow][newCol] === organismType) {
          adjacentCells.push([newRow, newCol]);
        }
      }
    }
  }
  return adjacentCells;
}

// Get the list of adjacent cells that are empty
function getEmptyAdjacentCells(i, j) {
  return getAdjacentCells(i, j, ' ');
}

// Display the current state of the ecosystem
function displayEcosystem() {
  for (let i = 0; i < ecosystemSize; i++) {
    let rowString = '';
    for (let j = 0; j < ecosystemSize; j++) {
      rowString += ecosystem[i][j] + ' ';
    }
    console.log(rowString);
  }
  console.log('');
}

// Main execution
initializeEcosystem();
simulate(10); // Simulate 10 steps