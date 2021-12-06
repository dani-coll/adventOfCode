const readline = require("readline")

var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: false
});

let maxY = 0
let maxX = 0;
let matrix = undefined;
let lines = []
  
rl.on('line', (input) => {
    processLine(input)
});

rl.on('close', () => {
    matrix = Array(maxX + 1).fill(0).map(()=>Array(maxY + 1).fill(0))

    for(let i = 0; i < lines.length; ++i) {
        if(lines[i][0] === lines[i][2] && lines[i][1] !== lines[i][3]) {
            let smallerY = lines[i][1] < lines[i][3] ? lines[i][1] : lines[i][3];
            let greaterY = lines[i][1] > lines[i][3] ? lines[i][1] : lines[i][3];
            for(let k = smallerY; k <= greaterY; ++k) {
                matrix[lines[i][0]][k]++;
            }
            
        }
        else if(lines[i][1] === lines[i][3] && lines[i][0] !== lines[i][2]) {
            let smallerX = lines[i][0] < lines[i][2] ? lines[i][0] : lines[i][2];
            let greaterX = lines[i][0] > lines[i][2] ? lines[i][0] : lines[i][2];
            for(let j = smallerX; j <= greaterX; ++j) {
                matrix[j][lines[i][1]]++;
            }
        }
        else if(lines[i][1] === lines[i][3] && lines[i][0] === lines[i][2]) { // Both on the same point
            let x = lines[i][0]
            let y = lines[i][1]
            matrix[x][y]++;
        }
        
    }


    let overlapedPoints = 0;
    for(let i = 0; i < matrix.length; ++i) {
        for(let k = 0; k < matrix[i].length; ++k) {
            if(matrix[i][k] >= 2) ++overlapedPoints;
        }
    }
    console.log(overlapedPoints)

});


function processLine(input) {
    const points = input.split(" -> ")
    const left = points[0].split(",").map(s => Number(s))
    const right = points[1].split(",").map(s => Number(s))

    if(left[0] > maxX) maxX = left[0];
    if(right[0] > maxX) maxX = right[0];
    if(left[1] > maxY) maxY = left[1];
    if(right[1] > maxY) maxY = right[1];

    lines.push([left[0], left[1], right[0], right[1]])
}
