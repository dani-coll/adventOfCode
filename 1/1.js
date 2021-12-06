const readline = require("readline")

var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: false
});
  
rl.on('line', (input) => {
    processLine(Number(input))
});


var increases = 0;
var previousDepth = undefined;

function processLine(depth) {
    console.log(depth)
    if(previousDepth !== undefined && depth > previousDepth) {
        ++increases;
    }
    previousDepth = depth;
    console.log(increases)
}
