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
    var oxygen = ""
    var co2 = ""

    let maxNumberLength = 0;

    for(let i = 0; i < lines.length; ++i) {
        if(String(lines[0]).length > maxNumberLength) {
            maxNumberLength = String(lines[0]).length;
        }
    }
    
    let oxygenLines = lines;

    for(let i = 0; i < maxNumberLength && oxygenLines.length > 1; ++i) {
        let zeros = 0;
        let ones = 0;
        for(let j = 0; j < oxygenLines.length; ++j) {

            if(oxygenLines[j][i] == 0) ++zeros;
            else ++ones;
        }

        if(zeros > ones) {
            oxygenLines = oxygenLines.filter(l => l[i] == "0")
        }
        else oxygenLines = oxygenLines.filter(l => l[i] == "1");

        console.log(oxygenLines)
    }

    let co2Lines = lines;

    for(let i = 0; i < maxNumberLength && co2Lines.length > 1; ++i) {
        let zeros = 0;
        let ones = 0;
        for(let j = 0; j < co2Lines.length; ++j) {

            if(co2Lines[j][i] == 0) ++zeros;
            else ++ones;
        }

        if(zeros > ones) {
            co2Lines = co2Lines.filter(l => l[i] == "1")
        }
        else co2Lines = co2Lines.filter(l => l[i] == "0");

        console.log(co2Lines)
    }
    console.log(parseInt(oxygenLines[0], 2))
    console.log(parseInt(co2Lines[0], 2))
    console.log(parseInt(oxygenLines[0], 2) * parseInt(co2Lines[0], 2))
}