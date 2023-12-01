const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: false
});

let calibration = 0;

rl.on('line', (input) => {
    calibration += Number(getCalibration(input));
    return;
});

rl.on('close', () => {
    console.log(calibration);
});

function getCalibration(input) {
    let numbers = '';
    for (let i = 0; i < input.length; ++i) {
        if (!Number.isNaN(Number(input[i]))) {
            console.log('isNumber', input[i], Number(input[i]));
            numbers += input[i];
        } else if (input[i - 2] && input.slice(i - 2, i + 1) === 'one') {
            numbers += '1';
        } else if (input[i - 2] && input.slice(i - 2, i + 1) === 'two') {
            numbers += '2';
        } else if (input[i - 4] && input.slice(i - 4, i + 1) === 'three') {
            numbers += '3';
        } else if (input[i - 3] && input.slice(i - 3, i + 1) === 'four') {
            numbers += '4';
        } else if (input[i - 3] && input.slice(i - 3, i + 1) === 'five') {
            numbers += '5';
        } else if (input[i - 2] && input.slice(i - 2, i + 1) === 'six') {
            numbers += '6';
        } else if (input[i - 4] && input.slice(i - 4, i + 1) === 'seven') {
            numbers += '7';
        } else if (input[i - 4] && input.slice(i - 4, i + 1) === 'eight') {
            numbers += '8';
        } else if (input[i - 3] && input.slice(i - 3, i + 1) === 'nine') {
            numbers += '9';
        }
    }

    return numbers.length ? numbers[0] + numbers[numbers.length - 1] : 0;
}
