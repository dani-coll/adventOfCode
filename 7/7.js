const readline = require('readline');

var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: false
});

rl.on('line', (input) => {
    processLine(input);
});

rl.on('close', () => {});

function processLine(input) {
    const positions = input.split(',').map((s) => Number(s));

    positions.sort((a, b) => a - b);

    let mid = positions[positions.length - 1] / 2;

    let fuelCost = calculateFuelCost(positions, mid, 0, positions[positions.length - 1]);

    console.log(fuelCost);
}

function calculateFuelCost(positions, position, min, max) {
    let currentFuelCost = getFuelCostToPosition(positions, position);
    let nextFuelCost = getFuelCostToPosition(positions, position + 1);
    let previousFuelCost = getFuelCostToPosition(positions, position - 1);
    if (nextFuelCost < currentFuelCost) {
        const newPosition = Math.floor((max + position) / 2);
        return calculateFuelCost(positions, newPosition, position, max);
    }
    if (previousFuelCost < currentFuelCost) {
        return calculateFuelCost(positions, Math.floor((position + min) / 2), min, position);
    }
    return currentFuelCost;
}

function getFuelCostToPosition(positions, position) {
    let fuelCost = 0;
    for (let i = 0; i < positions.length; ++i) {
        fuelCost += Math.abs(position - positions[i]);
    }
    return fuelCost;
}
