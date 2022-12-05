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
    console.log(stacks);

    const topCrates = stacks.reduce((prev, curr) => {
        return prev + curr[curr.length - 1];
    }, '');
    console.log(topCrates);
});

const stacks = [];

function processLine(input) {
    if (input.includes('[')) {
        let newString = '';
        let commaCountdown = 3;
        for (let i = 0; i < input.length; ++i) {
            if (commaCountdown === 0) {
                newString += ',';
                commaCountdown = 3;
            } else {
                newString += input[i];
                --commaCountdown;
            }
        }
        const crates = newString.split(',');
        for (let i = 0; i < crates.length; ++i) {
            if (!stacks[i]) {
                stacks[i] = [];
            }
            if (crates[i].trim() !== '') {
                stacks[i].unshift(crates[i].replace('[', '').replace(']', ''));
            }
        }
    } else if (input.includes('move')) {
        const splittedByFrom = input.split(' from ');
        const count = splittedByFrom[0].replace('move ', '');
        const originStackIndex = splittedByFrom[1].split(' to ')[0] - 1;
        const targetStackIndex = splittedByFrom[1].split(' to ')[1] - 1;

        for (let i = count; i > 0; --i) {
            console.log(targetStackIndex);

            stacks[targetStackIndex].push(stacks[originStackIndex].pop());
        }
    }
}
