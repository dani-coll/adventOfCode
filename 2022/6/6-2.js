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
    for(let i = 13; i < input.length; ++i) {
        let foundLetters = {};
        foundLetters[input[i]] = true;

        let j = i - 1;
        while(i - 13 <= j) {
            if(foundLetters[input[j]]) break;
            foundLetters[input[j]] = true;
            --j;
        }

        if(j < i - 13) {
            console.log(i + 1);
            return;
        }


    }
}
