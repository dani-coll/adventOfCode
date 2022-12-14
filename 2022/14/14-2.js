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
    maxRockDepth = Math.min(Object.keys(map));

    maxRockDepth = Object.keys(map)[Object.keys(map).length - 1];

    console.log(maxRockDepth);

    map[Number(maxRockDepth) + 2] = [];
    for (let i = 0; i < 1000; ++i) {
        map[Number(maxRockDepth) + 2][i] = '#';
    }
    console.log('Sand Count ', getSandCount());
});

let map = [];
let maxRockDepth;
function processLine(input) {
    const coordinates = input.split(' -> ');

    for (let i = 1; i < coordinates.length; ++i) {
        let [y, x] = coordinates[i].split(',').map((c) => Number(c));
        if (!map[x]) {
            map[x] = [];
        }

        let [y2, x2] = coordinates[i - 1].split(',').map((c) => Number(c));
        drawLine(x, y, x2, y2);
    }
}

function drawLine(x1, y1, x2, y2) {
    if (x1 !== x2) {
        let currentX = Math.min(x1, x2);
        const endX = Math.max(x1, x2);

        while (currentX !== endX) {
            if (!map[currentX]) {
                map[currentX] = [];
            }
            map[currentX][y1] = '#';

            ++currentX;
        }
        if (!map[endX]) {
            map[endX] = [];
        }
        map[endX][y1] = '#';
    } else if (y1 !== y2) {
        let currentY = Math.min(y1, y2);
        const endY = Math.max(y1, y2);

        while (currentY !== endY) {
            if (!map[x1]) {
                map[x1] = [];
            }
            map[x1][currentY] = '#';

            ++currentY;
        }
        if (!map[x1]) {
            map[x1] = [];
        }
        map[x1][endY] = '#';
    }
}

function getSandCount() {
    let sandCount = 0;
    let sandX;
    let sandY;
    while (!(sandX === 0 && sandY === 500 && sandIsBlocked(sandX, sandY))) {
        sandX = 0;
        sandY = 500;
        while (!sandIsBlocked(sandX, sandY)) {
            if (!isBottomBlocked(sandX, sandY)) {
                ++sandX;
            } else if (!isBottomLeftBlocked(sandX, sandY)) {
                ++sandX;
                --sandY;
            } else if (!isBottomRightBlocked(sandX, sandY)) {
                ++sandX;
                ++sandY;
            }
        }
        if (!map[sandX]) {
            map[sandX] = [];
        }
        map[sandX][sandY] = '+';
        // console.log('setting sand to', sandX, sandY);
        ++sandCount;
    }

    return sandCount;
}

function sandIsBlocked(sandX, sandY) {
    return isBottomBlocked(sandX, sandY) && isBottomLeftBlocked(sandX, sandY) && isBottomRightBlocked(sandX, sandY);
}

function isBottomLeftBlocked(sandX, sandY) {
    return '#' === map[sandX + 1]?.[sandY - 1] || '+' === map[sandX + 1]?.[sandY - 1];
}

function isBottomRightBlocked(sandX, sandY) {
    return '#' === map[sandX + 1]?.[sandY + 1] || '+' === map[sandX + 1]?.[sandY + 1];
}

function isBottomBlocked(sandX, sandY) {
    return '#' === map[sandX + 1]?.[sandY] || '+' === map[sandX + 1]?.[sandY];
}
