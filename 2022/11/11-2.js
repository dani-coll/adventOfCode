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
    let commonDivisor = monkeys.reduce((prev, curr) => prev * curr.divisor, 1);
    console.log('Common Divisor', commonDivisor);

    for (let i = 0; i < 10000; ++i) {
        for (let j = 0; j < monkeys.length; ++j) {
            for (let k = 0; k < monkeys[j].worries.length; ++k) {
                let worry = monkeys[j].worries[k];
                if (monkeys[j].operator === '+') {
                    if (monkeys[j].operatorValue != 'old') {
                        worry += Number(monkeys[j].operatorValue);
                    } else {
                        worry += worry;
                    }
                } else {
                    if (monkeys[j].operatorValue != 'old') {
                        worry *= Number(monkeys[j].operatorValue);
                    } else {
                        worry *= worry;
                    }
                }

                worry = Math.floor(worry % commonDivisor);

                if (worry % monkeys[j].divisor === 0) {
                    monkeys[monkeys[j].true].worries.push(worry);
                } else {
                    monkeys[monkeys[j].false].worries.push(worry);
                }
            }
            monkeys[j].inspections += monkeys[j].worries.length;
            monkeys[j].worries = [];
        }
    }

    // console.log(monkeys);

    const inspections = monkeys.map((m) => m.inspections).sort((a, b) => b - a);
    console.log(inspections);
    console.log(inspections[0] * inspections[1]);
});

const monkeys = [];

function processLine(input) {
    if (input.includes('Monkey')) {
        monkeys.push({ inspections: 0 });
    } else if (input.includes('Starting items')) {
        let worries = input
            .replace('  Starting items: ', '')
            .split(', ')
            .map((w) => Number(w));
        monkeys[monkeys.length - 1].worries = worries;
    } else if (input.includes('Operation')) {
        let operation = input.replace('  Operation: new = old ', '');
        let operator = operation[0];
        let operatorValue = operation.split(' ')[1];
        monkeys[monkeys.length - 1].operatorValue = operatorValue;
        monkeys[monkeys.length - 1].operator = operator;
    } else if (input.includes('Test')) {
        let divisor = Number(input.replace('  Test: divisible by ', ''));
        monkeys[monkeys.length - 1].divisor = divisor;
    } else if (input.includes('If true')) {
        let destinationMonkey = Number(input.replace('    If true: throw to monkey ', ''));
        monkeys[monkeys.length - 1].true = destinationMonkey;
    } else if (input.includes('If false')) {
        let destinationMonkey = Number(input.replace('    If false: throw to monkey ', ''));
        monkeys[monkeys.length - 1].false = destinationMonkey;
    }
}
