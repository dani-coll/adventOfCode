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
    console.log(top1Elf + top2Elf + top3Elf);
});

let top1Elf = 0;
let top2Elf = 0;
let top3Elf = 0;
let currentElf = 0;

function processLine(input) {
    if (input === '') {
        currentElf = 0;
    }

    currentElf += Number(input);

    if (currentElf > top3Elf) {
        top3Elf = currentElf;
    }
    if (top3Elf > top2Elf) {
        let tmp = top3Elf;
        top3Elf = top2Elf;
        top2Elf = tmp;
    }
    if (top2Elf > top1Elf) {
        let tmp = top2Elf;
        top2Elf = top1Elf;
        top1Elf = tmp;
    }
}
