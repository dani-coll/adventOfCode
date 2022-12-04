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
    console.log(overlapCount);
});

let overlapCount = 0;

function processLine(input) {
    const cleanups = input.split(',');

    const firstCleanup = cleanups[0].split('-');
    const secondCleanup = cleanups[1].split('-');

    const firstStart = Number(firstCleanup[0]);
    const firstEnd = Number(firstCleanup[1]);

    const secondStart = Number(secondCleanup[0]);
    const secondEnd = Number(secondCleanup[1]);

    if (
        (firstStart >= secondStart && firstStart <= secondEnd) ||
        (firstEnd >= secondStart && firstEnd <= secondEnd) ||
        (secondStart >= firstStart && secondStart <= firstEnd) ||
        (secondEnd >= firstStart && secondEnd <= firstEnd)
    ) {
        ++overlapCount;
    }
}
