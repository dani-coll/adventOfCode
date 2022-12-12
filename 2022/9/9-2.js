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
    console.log(tailPlaces);
    console.log(tailPlaces.size);
});

const knots = [
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0]
];

const tailPlaces = new Set();
tailPlaces.add('0,0');

function processLine(input) {
    const data = input.split(' ');
    let move = data[0];
    let places = Number(data[1]);
    let dim;
    let value;

    switch (move) {
        case 'R':
            value = 1;
            dim = 1;

            break;
        case 'L':
            value = -1;
            dim = 1;

            break;
        case 'U':
            value = -1;
            dim = 0;

            break;
        case 'D':
            value = 1;
            dim = 0;

            break;
    }

    updateKnots(places, dim, value);
}

function isTouching(prev, curr) {
    const ti = knots[curr][0];
    const tj = knots[curr][1];
    const hi = knots[prev][0];
    const hj = knots[prev][1];
    return (ti === hi || ti + 1 === hi || ti - 1 === hi) && (tj === hj || tj + 1 === hj || tj - 1 === hj);
}

function updateKnots(places, dim, value) {
    while (places > 0) {
        knots[0][dim] += value; // move the head
        updateTails();
        --places;
    }
}

function updateTails() {
    for (let i = 1; i < knots.length; ++i) {
        if (!isTouching(i - 1, i)) {
            knots[i][0] += getUpdate(i - 1, i, 0);
            knots[i][1] += getUpdate(i - 1, i, 1);
        }
    }

    tailPlaces.add(knots[9][0] + ',' + knots[9][1]);
}

function getUpdate(prev, curr, dim) {
    if (knots[prev][dim] > knots[curr][dim]) {
        return 1;
    }
    if (knots[prev][dim] < knots[curr][dim]) {
        return -1;
    }
    return 0;
}
