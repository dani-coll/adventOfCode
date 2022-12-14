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
    packets.push([[2]]);
    packets.push([[6]]);

    packets.sort((a, b) => {
        return compare(b, a);
    });

    // console.log(packets);
    const firstSeparator = packets.findIndex((p) => p.length === 1 && p[0] && p[0].length === 1 && p[0][0] === 2) + 1;
    const secondSeparator = packets.findIndex((p) => p.length === 1 && p[0] && p[0].length === 1 && p[0][0] === 6) + 1;

    console.log(firstSeparator * secondSeparator);
});

const packets = [];
let i = 0;

function processLine(input) {
    if (input !== '') {
        packets.push(parseArray(input));
    } else {
        ++i;
    }
}

function parseArray(input) {
    let parentArray;
    let currentArray = [];
    let result = currentArray;

    for (let i = 1; i < input.length; ++i) {
        if (input[i] === '[') {
            parentArray = currentArray;
            currentArray = [];
            parentArray.push(currentArray);
        } else if (input[i] === ']') {
            currentArray = parentArray;
        } else if (input[i] !== ',') {
            let number = input[i];
            while (input[i + 1] !== ',' && input[i + 1] !== ']') {
                ++i;
                number += input[i];
            }
            currentArray.push(number);
        }
    }
    return result;
}

function compare(left, right) {
    // console.log('Comparing: ', left, ' to ', right);

    if (left === undefined && right !== undefined) {
        return 1;
    }

    if (left !== undefined && right === undefined) {
        return -1;
    }

    if (typeof left !== 'object' && typeof right !== 'object') {
        return Number(right) - Number(left);
    }

    if (typeof left === 'object') {
        if (typeof right !== 'object') {
            right = [right];
        }
    }

    if (typeof right === 'object') {
        if (typeof left !== 'object') {
            left = [left];
        }
    }
    let biggestSize = Math.max(left.length, right.length);
    for (let i = 0; i < biggestSize; ++i) {
        let comparison = compare(left[i], right[i]);
        if (comparison !== 0) {
            return comparison;
        }
    }

    return 0;
}
