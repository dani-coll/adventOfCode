const readline = require('readline');

var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: false
});

rl.on('line', (input) => {
    processLine(input);
});

rl.on('close', () => {
    let smallDirsSum = Object.values(directories).reduce((prev, curr) => {
        if(curr.size <= 100000) {
            return prev + curr.size
        }
        return prev;
    }, 0)

    const remainingSpace = 70000000 - directories['/'].size;

    const directoriesKeys = Object.keys(directories)
    directoriesKeys.sort((a,b) => {
     return directories[a].size - directories[b].size
    })

    for(let i = 0; i < directoriesKeys.length; ++i) {
      if(remainingSpace + directories[directoriesKeys[i]].size >= 30000000) {
        console.log(directories[directoriesKeys[i]].size)
        return;
      }
    }
        
});

let listing = false;
const directories = {};
let currentDir;

function processLine(input) {
    // Commands
    if(input.includes('$ ')) {
        listing = false;
        listing = input === '$ ls'

        // cd
        if(!listing) {
            const previousDir = currentDir;
            currentDir = input.replace('$ cd ', '')

            if(currentDir === '..') {
                currentDir = directories[previousDir].parent;
            } else if(currentDir === '/') {
                currentDir = '/'
                directories[currentDir] = { size: 0, directories: {}, parent: undefined}
            } else {
                // Avoid overriding in case 2 dirs are called the same
                while(directories[currentDir]) {
                    currentDir += '*'
                }
                directories[currentDir] = { size: 0, directories: {}, parent: previousDir}
            }
        }
        // ls output
    } else if(listing) {
        if(input.includes('dir ')) {
            const dir = input.replace('dir ', '')
            directories[currentDir].directories[dir] = { size: 0, directories: {}, parent: currentDir}
        } else {
            // file
            const fileSize = Number(input.split(' ')[0])
            directories[currentDir].size += fileSize;

            // update parent's size
            let parent = directories[currentDir].parent
            while(parent) {
                directories[parent].size += fileSize;
                parent = directories[parent].parent
            }
        }
    }
}
