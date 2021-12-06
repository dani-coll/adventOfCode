const readline = require("readline")

var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: false
});

let fishesOnCycle = new Array(10).fill(0);
  
rl.on('line', (input) => {
    const cycles = input.split(",").map(c => Number(c))

    for(let i = 0; i < cycles.length; ++i) {
        fishesOnCycle[cycles[i]]++;
    }
    for(let i = 0; i < 256; ++i)  {
        fishesOnCycle[7] += fishesOnCycle[0]
        fishesOnCycle[9] += fishesOnCycle[0]
        fishesOnCycle[0] = 0;

        for(let j = 1; j < fishesOnCycle.length; ++j) {
            fishesOnCycle[j - 1] = fishesOnCycle[j]
            fishesOnCycle[j] = 0;
        }
    }
    console.log(fishesOnCycle.reduce((acc, curr) => acc += curr, 0))
});

rl.on('close', () => {
});
