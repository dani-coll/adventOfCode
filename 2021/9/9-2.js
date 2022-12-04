const readline = require('readline');

var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: false
});

const map = [];
let visitedMap;

rl.on('line', (input) => {
    map.push(input.split('').map((s) => Number(s)));
    visitedMap = Array(map.length)
        .fill(false)
        .map(() => Array(map[0].length).fill(false));
});

rl.on('close', () => {
    let sizes = [];
    for (let i = 0; i < map.length; ++i) {
        for (let j = 0; j < map[i].length; ++j) {
            if (map[i][j] !== 9 && !visitedMap[i][j]) {
                sizes.push(calculateZoneSize(i, j));
            }
        }
    }

    sizes.sort((a, b) => b - a);
    console.log(sizes[0] * sizes[1] * sizes[2]);
});

function calculateZoneSize(i, j) {
    let size = 0;
    const queue = [];

    queue.push([i, j]);

    while (queue.length > 0) {
        const point = queue.pop();
        let i = point[0];
        let j = point[1];
        if (!visitedMap[i][j]) {
            visitedMap[i][j] = true;
            ++size;

            if (j > 0 && map[i][j - 1] !== 9) {
                queue.push([i, j - 1]);
            }

            if (j + 1 < map[i].length && map[i][j + 1] !== 9) {
                queue.push([i, j + 1]);
            }

            if (i > 0 && map[i - 1][j] !== 9) {
                queue.push([i - 1, j]);
            }

            if (i + 1 < map.length && map[i + 1][j] !== 9) {
                queue.push([i + 1, j]);
            }
        }
    }
    console.log('Zone size:', size);
    return size;
}
