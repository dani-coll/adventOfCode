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
let graph = {};
let map = [];
let visited = [];
let distances = {};

rl.on('close', () => {
    for (let i = 0; i < map.length; ++i) {
        for (let j = 0; j < map[i].length; ++j) {
            let currentNode = {
                value: map[i][j].charCodeAt(0),
                children: []
            };
            if (map[i][j] === 'S') {
                currentNode.value = 'a'.charCodeAt(0);
            }

            if (map[i][j] === 'E') {
                currentNode.value = 'z'.charCodeAt(0);
                startNodeIndex = i + ',' + j;
            }

            //Add Children
            if (j - 1 >= 0 && (map[i][j - 1].charCodeAt(0) === currentNode.value - 1 || map[i][j - 1].charCodeAt(0) === currentNode.value)) {
                currentNode.children.push(i + ',' + (j - 1));
            }

            if (j + 1 < map[i].length && (map[i][j + 1].charCodeAt(0) === currentNode.value - 1 || map[i][j + 1].charCodeAt(0) === currentNode.value)) {
                currentNode.children.push(i + ',' + (j + 1));
            }

            if (i - 1 >= 0 && (map[i - 1][j].charCodeAt(0) === currentNode.value - 1 || map[i - 1][j].charCodeAt(0) === currentNode.value)) {
                currentNode.children.push(i - 1 + ',' + j);
            }
            if (i + 1 < map.length && (map[i + 1][j].charCodeAt(0) === currentNode.value - 1 || map[i + 1][j].charCodeAt(0) === currentNode.value)) {
                currentNode.children.push(i + 1 + ',' + j);
            }

            graph[i + ',' + j] = currentNode;
        }
    }
    console.log(graph);
    findShortestPath(startNodeIndex);
});

function processLine(input) {
    map.push(input);
}

let findShortestPath = (startNodeIndex) => {
    Object.keys(graph).forEach((index) => {
        if (graph[index].value === 'a'.charCodeAt(0)) {
            distances[index] = 'Infinity';
        }
    });
    distances[startNodeIndex] = 0;
    console.log(distances);

    let previousNode = startNodeIndex;
    let nextNode = graph[startNodeIndex].children[0];
    visited.push(previousNode);
    while (nextNode) {
        let distance = distances[previousNode] + 1;
        distances[nextNode] = !distances[nextNode] || distances[nextNode] > distance ? distance : distances[nextNode];
        for (let i = 0; i < graph[nextNode].children.length; ++i) {
            if (graph[nextNode].children[i] === previousNode) continue;
            let childDistance = distances[nextNode] + 1;
            distances[graph[nextNode].children[i]] =
                !distances[graph[nextNode].children[i]] || distances[graph[nextNode].children[i]] > childDistance
                    ? childDistance
                    : distances[graph[nextNode].children[i]];
        }

        visited.push(nextNode);
        previousNode = nextNode;
        nextNode = shortestDistanceNode();
    }

    console.log('Distances', distances);

    const distancesToAs = Object.entries(distances).filter(([i]) => graph[i].value === 'a'.charCodeAt(0));

    distancesToAs.sort((a, b) => a[1] - b[1]);
    console.log(distancesToAs);
    console.log('shortestDistance: ' + distancesToAs[0]);
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
