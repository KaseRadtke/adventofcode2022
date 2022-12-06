/*
PSEUDO CODE:
1: Read file
2: For every file, split by /r/n
3: for every input, divide it in half
4: For every section of each input, loop through all characters and keep track of count for every character.
5: Find the most used character
6: get score based
 */


//Import File System Node module for reading of file
const fs = require('fs');

let inputFile = "input.txt"
let crateStacks = [
    ['C','Z','N','B','M','W','Q','V'], // 1
    ['H','Z','R','W','C','B'],         // 2
    ['F','Q','R','J'],                 // 3
    ['Z','S','W','H','F','N','M','T'], // 4
    ['G','F','W','L','N','Q','P'],     // 5
    ['L','P','W'],                     // 6
    ['V','B','D','R','G','C','Q','J'], // 7
    ['Z','Q','N','B','W'],             // 8
    ['H','L','F','C','Q','T','J'],     // 9
]

fs.readFile(inputFile, (err, input) => {
    if (err) throw err;

    let inputToString = input.toString();
    let inputSplit = inputToString.split(/\r?\n/)

    //doPart1(inputSplit);
    doPart2(inputSplit);

})

function getCrateSequence(crateStacks){
    let sequence = ''
    for(let i = 0; i < crateStacks.length; i++){
        sequence += crateStacks[i][crateStacks[i].length - 1]
    }
    return sequence
}

function doPart1(inputSplit){
    for(let i = 0; i < inputSplit.length; i++){
        let instructionNumbers = inputSplit[i].match(/\d\d?/g)
        let range = instructionNumbers[0]
        let fromStack = Number(instructionNumbers[1]) - 1 // Subtract 1 as crate stacks starts at 1 from input
        let toStack = Number(instructionNumbers[2]) - 1
        for(let x = 0; x < range; x++){
            let movedCrate = crateStacks[fromStack].pop()
            crateStacks[toStack].push(movedCrate)
        }
    }
    console.log("Part 1: Crate sequence of top of each stack : " + getCrateSequence(crateStacks))
}

function doPart2(inputSplit){

    for(let i = 0; i < inputSplit.length; i++){
        let instructionNumbers = inputSplit[i].match(/\d\d?/g)
        let range = instructionNumbers[0]
        let fromStack = Number(instructionNumbers[1]) - 1 // Subtract 1 as crate stacks starts at 1 from input
        let toStack = Number(instructionNumbers[2]) - 1
        for(let x = 0; x < range; x++){
            let helperArray = []
            helperArray.push(crateStacks[fromStack][crateStacks[fromStack].length - 1 - (range - 1) + x])
            crateStacks[fromStack].splice(crateStacks[fromStack].length - 1 - (range - 1) + x, 1)
            crateStacks[toStack].push(helperArray[0])
        }
    }
    console.log("Part 2: Crate sequence of top of each stack : " + getCrateSequence(crateStacks))
}
