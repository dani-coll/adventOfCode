const { Console } = require('console');
const readline = require('readline');

var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: false
});

rl.on('line', (input) => {
    processLine(input);
});

let startNodeIndex;
let endNodeIndex;
rl.on('close', () => {
    for (let i = 0; i < map.length; ++i) {
        for (let j = 0; j < map[i].length; ++j) {
            let currentNode = {
                value: map[i][j].charCodeAt(0),
                children: []
            };
            if (map[i][j] === 'S') {
                currentNode.value = 'a'.charCodeAt(0);
                startNodeIndex = i + ',' + j;
            }

            if (map[i][j] === 'E') {
                currentNode.value = 'E';
                endNodeIndex = i + ',' + j;
            }

            //Add Children
            if (j - 1 >= 0 && (map[i][j - 1] === 'E' || map[i][j - 1].charCodeAt(0) <= currentNode.value + 1)) {
                currentNode.children.push(i + ',' + (j - 1));
            }

            if (j + 1 < map[i].length && (map[i][j + 1] === 'E' || map[i][j + 1].charCodeAt(0) <= currentNode.value + 1)) {
                currentNode.children.push(i + ',' + (j + 1));
            }

            if (i - 1 >= 0 && (map[i - 1][j] === 'E' || map[i - 1][j].charCodeAt(0) <= currentNode.value + 1)) {
                currentNode.children.push(i - 1 + ',' + j);
            }
            if (i + 1 < map.length && (map[i + 1][j] === 'E' || map[i + 1][j].charCodeAt(0) <= currentNode.value + 1)) {
                currentNode.children.push(i + 1 + ',' + j);
            }

            graph[i + ',' + j] = currentNode;
        }
    }

    findShortestPath(startNodeIndex, endNodeIndex);
});

let graph = {};

let map = [];
let visited = [];
let distances = {};

function processLine(input) {
    map.push(input);
}

let findShortestPath = (startNodeIndex, endNodeIndex) => {
    distances[endNodeIndex] = 'Infinity';
    distances[startNodeIndex] = 0;

    let previousNode = startNodeIndex;
    let nextNode = graph[startNodeIndex].children[0];
    visited.push(previousNode);
    while (nextNode) {
        let distance = distances[previousNode] + 1;
        distances[nextNode] = !distances[nextNode] || distances[nextNode] > distance ? distance : distances[nextNode];
        for (let i = 0; i < graph[nextNode].children.length; ++i) {
            if (graph[nextNode].children[i] === previousNode) continue;
            distances[graph[nextNode].children[i]] = distances[nextNode] + 1;
        }

        visited.push(nextNode);
        previousNode = nextNode;
        nextNode = shortestDistanceNode();
    }
    console.log('Distance to endNode ' + distances[endNodeIndex]);
};

let shortestDistanceNode = () => {
    let shortest = null;
    for (let node in distances) {
        let currentIsShortest = shortest === null || distances[node] < distances[shortest];
        if (currentIsShortest && !visited.includes(node)) {
            shortest = node;
        }
    }
    return shortest;
};
