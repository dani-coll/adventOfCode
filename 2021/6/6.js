const readline = require("readline")

var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: false
});
  
rl.on('line', (input) => {
    const cycles = input.split(",").map(c => Number(c))

    for(let i = 0; i < 80; ++i) {
        let fishCount = cycles.length;
        let j = 0;
        while(j < fishCount) {
            if(cycles[j] === 0) {
                cycles[j] = 6;
                cycles.push(8);
            } else {
                --cycles[j];
            }
            ++j;
        }
    }
    console.log(cycles.length)
});

rl.on('close', () => {
});
