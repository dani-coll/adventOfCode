const readline = require('readline');

var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: false
});

rl.on('line', (input) => {
    processLine(input);
});

rl.on('close', () => {});

function processLine(input) {
    for(let i = 3; i < input.length; ++i) {
        if(input[i] !== input[i-1] && input[i] !== input[i-2] && input[i] !== input[i-3] &&
            input[i - 1] !== input[i-2] && input[i-1] !== input[i-3] && input[i-2] !== input[i-3]) {
                console.log(i+1)
                return;
            }
    }
}
