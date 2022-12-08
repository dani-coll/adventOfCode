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
    const visibilityMap = Array.from(Array(map.length), (e) => Array.from(Array(map[0].length), (e) => false));

    for (let i = 0; i < map.length; ++i) {
        let biggestTree = -1;
        for (let j = 0; j < map[i].length; ++j) {
            if (map[i][j] > biggestTree) {
                visibilityMap[i][j] = true;
                biggestTree = map[i][j];
            }
        }
    }

    for (let i = 0; i < map[0].length; ++i) {
        let biggestTree = -1;
        for (let j = 0; j < map.length; ++j) {
            if (map[j][i] > biggestTree) {
                visibilityMap[j][i] = true;
                biggestTree = map[j][i];
            }
        }
    }

    for (let i = 0; i < map.length; ++i) {
        let biggestTree = -1;
        for (let j = map[i].length - 1; j >= 0; --j) {
            if (map[i][j] > biggestTree) {
                visibilityMap[i][j] = true;
                biggestTree = map[i][j];
            }
        }
    }

    for (let i = 0; i < map[0].length; ++i) {
        let biggestTree = -1;
        for (let j = map.length - 1; j >= 0; --j) {
            if (map[j][i] > biggestTree) {
                visibilityMap[j][i] = true;
                biggestTree = map[j][i];
            }
        }
    }

    const visibleCount = visibilityMap.reduce((prev, curr) => {
        return (
            prev +
            curr.reduce((prev2, curr2) => {
                if (curr2) return prev2 + 1;
                return prev2;
            })
        );
    }, 0);

    console.log(visibleCount);
});

const map = [];

function processLine(input) {
    let row = input.split('').map((a) => Number(a));
    map.push(row);
}
