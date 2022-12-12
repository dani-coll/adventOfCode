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

let hi = 0;
let hj = 0;
let ti = 0;
let tj = 0;

const tailPlaces = new Set();
tailPlaces.add('0,0');

function processLine(input) {
    const data = input.split(' ');
    let move = data[0];
    let places = Number(data[1]);

    switch (move) {
        case 'R':
            while (places > 0) {
                ++hj;
                if (!isTouching()) {
                    ++tj;
                    updateTi();
                }
                tailPlaces.add(ti + ',' + tj);

                --places;
            }

            break;
        case 'L':
            while (places > 0) {
                --hj;
                if (!isTouching()) {
                    --tj;
                    updateTi();
                }
                tailPlaces.add(ti + ',' + tj);

                --places;
            }

            break;
        case 'U':
            while (places > 0) {
                --hi;
                if (!isTouching()) {
                    --ti;
                    updateTj();
                }
                tailPlaces.add(ti + ',' + tj);

                --places;
            }

            break;
        case 'D':
            while (places > 0) {
                ++hi;
                if (!isTouching()) {
                    ++ti;
                    updateTj();
                }
                tailPlaces.add(ti + ',' + tj);

                --places;
            }
            break;
    }
}

function isTouching() {
    return (ti === hi || ti + 1 === hi || ti - 1 === hi) && (tj === hj || tj + 1 === hj || tj - 1 === hj);
}

function updateTi() {
    if (hi > ti) {
        ++ti;
    }
    if (hi < ti) {
        --ti;
    }
}

function updateTj() {
    if (hj > tj) {
        ++tj;
    }
    if (hj < tj) {
        --tj;
    }
}
