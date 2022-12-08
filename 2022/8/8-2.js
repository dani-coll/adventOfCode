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
    const scenicMap = Array.from(Array(map.length), (e) => Array.from(Array(map[0].length), (e) => 1));

    let biggestScene = 0;
    for (let i = 0; i < map.length; ++i) {
        for (let j = 0; j < map[i].length; ++j) {
            let multiplierBottom = 0;
            for (let k = i + 1; k < map.length; ++k) {
                ++multiplierBottom;
                if (map[k][j] >= map[i][j]) {
                    break;
                }
            }

            let multiplierRight = 0;
            for (let k = j + 1; k < map[i].length; ++k) {
                ++multiplierRight;
                if (map[i][k] >= map[i][j]) {
                    break;
                }
            }

            let multiplierLeft = 0;
            for (let k = j - 1; k >= 0; --k) {
                ++multiplierLeft;
                if (map[i][k] >= map[i][j]) {
                    break;
                }
            }

            let multiplierTop = 0;
            for (let k = i - 1; k >= 0; --k) {
                ++multiplierTop;
                if (map[k][j] >= map[i][j]) {
                    break;
                }
            }

            const scene = multiplierBottom * multiplierLeft * multiplierRight * multiplierTop;
            if (biggestScene < scene) {
                biggestScene = scene;
            }
        }
    }
    console.log(biggestScene);
});

const map = [];

function processLine(input) {
    let row = input.split('').map((a) => Number(a));
    map.push(row);
}
