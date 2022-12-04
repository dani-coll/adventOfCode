const readline = require('readline');

var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: false
});

const inputs = [];
const outputs = [];

rl.on('line', (line) => {
    const outcome = line.split('|');
    inputs.push(outcome[0].split(' ').filter((s) => s !== ''));
    outputs.push(outcome[1].split(' ').filter((s) => s !== ''));
});

rl.on('close', () => {
    let result = 0;

    for (let i = 0; i < outputs.length; ++i) {
        for (let k = 0; k < outputs[i].length; ++k) {
            if (outputs[i][k].length === 2 || outputs[i][k].length === 3 || outputs[i][k].length === 4 || outputs[i][k].length === 7) {
                ++result;
            }
        }
    }

    console.log(result);
});
