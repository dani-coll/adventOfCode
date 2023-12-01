const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: false
});

let calibration = 0;

rl.on('line', (input) => {
    calibration += Number(getCalibration(input));
});

rl.on('close', () => {
    console.log(calibration);
});

function getCalibration(input) {
    const numbers = input.replace(/[a-zA-Z]/g, '');
    return numbers.length ? numbers[0] + numbers[numbers.length - 1] : 0;
}
