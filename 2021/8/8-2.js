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
        const one = inputs[i].find((n) => n.length == 2);
        const four = inputs[i].find((n) => n.length == 4);
        const seven = inputs[i].find((n) => n.length == 3);
        const eight = inputs[i].find((n) => n.length == 7);
        const zeroSixAndNine = inputs[i].filter((n) => n.length == 6);
        const twoThreeAndFive = inputs[i].filter((n) => n.length == 5);

        const a = seven.split('').find((char) => !one.includes(char));
        const cAndF = one;

        const six = zeroSixAndNine.find((n) => !n.includes(cAndF[0]) || !n.includes(cAndF[1]));
        const f = one.split('').find((char) => six.includes(char));
        const c = one.split('').find((char) => char !== f);

        const three = twoThreeAndFive.find((n) => n.includes(a) && n.includes(c) && n.includes(f));
        const bAndD = four.split('').filter((char) => char !== f && char !== c);
        const dAndG = three.split('').filter((char) => char !== f && char !== c && char !== a);

        const d = bAndD.find((char) => char === dAndG[0] || char === dAndG[1]);
        const g = dAndG.find((char) => char !== d);
        const b = bAndD.find((char) => char !== d);

        const e = six.split('').find((char) => char !== a && char !== b && char !== d && char !== f && char !== g);

        // Read outputs
        let output = '';
        for (let j = 0; j < outputs[i].length; ++j) {
            if (outputs[i][j].length === 2) output += 1;
            else if (outputs[i][j].length === 3) output += 7;
            else if (outputs[i][j].length === 4) output += 4;
            else if (outputs[i][j].length === 7) output += 8;
            else if (outputs[i][j].length === 5) {
                if (outputs[i][j].includes(e)) output += 2;
                else if (outputs[i][j].includes(c)) output += 3;
                else output += 5;
            } else {
                if (!outputs[i][j].includes(d)) output += 0;
                else if (outputs[i][j].includes(e)) output += 6;
                else output += 9;
            }
        }
        console.log('Output:', output);
        result += Number(output);
    }

    console.log(result);
});
