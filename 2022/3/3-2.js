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
    console.log(badges);
});

let firstElement;
let secondElement;
let badges = 0;

function processLine(input) {
    if (!firstElement) {
        firstElement = input.split('');
        return;
    }

    if (!secondElement) {
        secondElement = input.split('');
        return;
    }

    const repeatedChar = input.split('').find((v3) => firstElement.some((v1) => v1 === v3) && secondElement.some((v2) => v2 === v3));

    badges += getBadge(repeatedChar);
    firstElement = secondElement = undefined;
}

function getBadge(repeatedChar) {
    const asciiValue = repeatedChar.charCodeAt(0);

    if (asciiValue < 91) {
        return asciiValue - 65 + 27;
    }
    return asciiValue - 97 + 1;
}
