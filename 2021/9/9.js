const readline = require('readline');

var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: false
});

const map = [];

rl.on('line', (input) => {
    map.push(input.split('').map((s) => Number(s)));
});

rl.on('close', () => {
    let risk = 0;
    for (let i = 0; i < map.length; ++i) {
        for (let j = 0; j < map[i].length; ++j) {
            const isLowerPoint =
                (j === 0 || map[i][j - 1] > map[i][j]) &&
                (j + 1 === map[i].length || map[i][j + 1] > map[i][j]) &&
                (i + 1 === map.length || map[i + 1][j] > map[i][j]) &&
                (i === 0 || map[i - 1][j] > map[i][j]);

            if (isLowerPoint) {
                risk += map[i][j] + 1;
            }
        }
    }
    console.log(risk);
});
