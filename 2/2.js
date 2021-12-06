const { Console } = require("console");
const readline = require("readline")

var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: false
});
  
rl.on('line', (input) => {
    processLine(input)
});

var forward = 0;
var depth = 0;

function processLine(input) {
    var parts = input.split(" ")

    if(parts[0] === 'forward') {
        forward += Number(parts[1])
    }
    if(parts[0] === 'up') {
        depth -= Number(parts[1])
    }
    if(parts[0] === 'down') {
        depth += Number(parts[1])
    }
    console.log(forward * depth)
}
