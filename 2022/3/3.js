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
    const c1 = input.slice(0, input.length / 2).split('');
    const c2 = input.slice(input.length / 2).split('');

    const repeatedChar = c2.find((v2) => c1.some((v1) => v1 === v2));

    const asciiValue = repeatedChar.charCodeAt(0);

    if (asciiValue < 91) {
        score += asciiValue - 65 + 27;
    } else {
        score += asciiValue - 97 + 1;
    }
}
