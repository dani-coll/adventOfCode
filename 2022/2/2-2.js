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
    console.log(score);
});

let score = 0;

function processLine(input) {
    let values = input.split(' ');
    if (values[1] === 'X') {
        if (values[0] === 'A') {
            score += 3;
        }

        if (values[0] === 'B') {
            score += 1;
        }
        if (values[0] === 'C') {
            score += 2;
        }
    }
    if (values[1] === 'Y') {
        score += 3;
        if (values[0] === 'A') {
            score += 1;
        }

        if (values[0] === 'B') {
            score += 2;
        }
        if (values[0] === 'C') {
            score += 3;
        }
    }
    if (values[1] === 'Z') {
        score += 6;

        if (values[0] === 'A') {
            score += 2;
        }

        if (values[0] === 'B') {
            score += 3;
        }
        if (values[0] === 'C') {
            score += 1;
        }
    }
}
