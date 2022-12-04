const readline = require("readline")

var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: false
});

var lines = []
  
rl.on('line', (input) => {
    processLine(Number(input))
});
rl.on('close', () => {
    processLines()
});

var increases = 0;

function processLine(depth) {
    lines.push(depth)
}

function processLines() {
    let combinedDepths = []
    for(let i = 0; i < lines.length; ++i) {
        if(lines[i + 2] !== undefined) {
            combinedDepths.push(lines[i] + lines[i + 1] + lines[i + 2])
        }
    }

    let previousDepth = undefined;
    for(let i = 0; i < combinedDepths.length; ++i) {
        if(previousDepth !== undefined && combinedDepths[i] > previousDepth) {
            ++increases;
        }
        previousDepth = combinedDepths[i];
    }
}