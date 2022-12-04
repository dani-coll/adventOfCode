const readline = require("readline")

var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: false
});
  

let numbers = undefined;
let lineCardboards = []
let columnCardboards = []
let wonCardboards = {};

let currentLineCardboards = undefined;
let currentColumnCardboard = undefined;

rl.on('line', (input) => {
    if(!numbers) {
        numbers = input.split(",").map(n => Number(n))
    } else {
        if(input === "") {
            if(currentLineCardboards) {
                lineCardboards.push(currentLineCardboards);
                columnCardboards.push(currentColumnCardboard)
            }
            currentLineCardboards = []
            currentColumnCardboard = [[],[],[],[],[]]
        }
        else {
            const line = input.split(" ").filter(s => s !== "").map(n => Number(n));
            currentLineCardboards.push(line)
        
            for(let i = 0; i < line.length; ++i) {
                currentColumnCardboard[i].push(line[i]);
            }
        }
    }
});


rl.on('close', () => {
    for(let i = 0; i < numbers.length; ++i) {
        for(let j = 0; j < lineCardboards.length; ++j) {
            for(let k = 0; k < lineCardboards[j].length; ++k) {
                if(!wonCardboards[j]) {
                    const columnIndex = lineCardboards[j][k].findIndex(n => n === numbers[i])
                    if(columnIndex !== -1) {
                        lineCardboards[j][k][columnIndex] = -1;
                        columnCardboards[j][columnIndex] = columnCardboards[j][columnIndex].filter(n => n !== numbers[i])
            
                        if(!columnCardboards[j][columnIndex].length || !lineCardboards[j][k].filter(n => n !== -1).length) {
                            wonCardboards[j] = true;
                            console.log(`Cardboard ${j} just won with score: `, getFinalScore(numbers[i], columnCardboards[j]))
                        }
                    }
                }
            }
        }
    }
})

function getFinalScore(number, cardboard) {
    const sum = cardboard.reduce((acc, line) => {
        return line.reduce((acc, value) => {
            return acc + value
        }, acc)
    }, 0)

    return number * sum;
}