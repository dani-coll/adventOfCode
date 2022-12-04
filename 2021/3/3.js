const readline = require("readline")

var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: false
});

var lines = []
  
rl.on('line', (input) => {
    processLine(input)
});

rl.on('close', () => {
    processLines()
});

function processLine(depth) {
    lines.push(depth)
}

function processLines() {
    var gamma = ""
    let maxNumberLength = 0;

    for(let i = 0; i < lines.length; ++i) {
        if(String(lines[0]).length > maxNumberLength) {
            maxNumberLength = String(lines[0]).length;
        }
    }
    
    for(let i = 0; i < maxNumberLength; ++i) {
        let zeros = 0;
        let ones = 0;
        for(let j = 0; j < lines.length; ++j) {
            let line = lines[j]

            if(line[i] == 0) ++zeros;
            else ++ones;
        }

        if(zeros > ones) gamma += "0"
        else gamma += "1"
    }
    console.log(gamma)

    let epsilon = ""
    for(let i = 0; i < gamma.length; ++i) {
        if(gamma[i] == "0") epsilon += "1"
        else epsilon += "0";
    }
    console.log(parseInt(gamma, 2))
    console.log(parseInt(epsilon, 2))
    console.log(parseInt(epsilon, 2) * parseInt(gamma, 2))


}