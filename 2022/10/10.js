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
    console.log(register);
    console.log(strength);
});

let cycles = 0;
let register = 1;
let strength = 0;

function processLine(input) {
    const data = input.split(' ');
    if (data[0] === 'addx') {
        ++cycles;
        updateStrengthIfNeeded();
        ++cycles;
        updateStrengthIfNeeded();
        register += Number(data[1]);
    } else {
        ++cycles;
        updateStrengthIfNeeded();
    }
}

function updateStrengthIfNeeded() {
    if (cycles < 221 && (cycles - 20) % 40 === 0) {
        strength += register * cycles;
    }
}
