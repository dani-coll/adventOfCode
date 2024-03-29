const readline = require('readline');

var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: false
});

rl.on('line', (input) => {
    processLine(input);
});

rl.on('close', () => {
    console.log(maxElf);
});

let maxElf = 0;
let currentElf = 0;

function processLine(input) {
    if (input === '') {
        currentElf = 0;
    }

    currentElf += Number(input);

    if (currentElf > maxElf) {
        maxElf = currentElf;
    }
}
