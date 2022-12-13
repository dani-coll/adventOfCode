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
    console.log(sprite);
    console.log(screen.join('\n'));
});

let cycles = 0;
let sprite = 2;

let screen = ['', '', '', '', '', ''];

function processLine(input) {
    const data = input.split(' ');
    if (data[0] === 'addx') {
        ++cycles;
        paintPixel();
        ++cycles;
        paintPixel();
        sprite += Number(data[1]);
    } else {
        ++cycles;
        paintPixel();
    }
}

function paintPixel() {
    if ((cycles + 1) % 40 === sprite || cycles % 40 === sprite || (cycles - 1) % 40 === sprite) {
        screen[Math.floor((cycles - 1) / 40)] += '#';
    } else {
        screen[Math.floor((cycles - 1) / 40)] += '.';
    }
}
