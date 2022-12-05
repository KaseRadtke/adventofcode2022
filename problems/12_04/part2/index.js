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

let inputFile = "../input.txt"

fs.readFile(inputFile, (err, input) => {
    if (err) throw err;

    let inputToString = input.toString();
    let inputSplit = inputToString.split(/\r?\n/)

    let overlapCount = 0;

    for(let i = 0; i < inputSplit.length; i++){

        let overlap = getIsOverLap(inputSplit[i])

        if(overlap){
            overlapCount += 1
        }

    }

    console.log('Overlap count is:' + overlapCount)


})

function getIsOverLap(input){
    let splitIds = input.split(',')
    let firstSplitId = splitIds[0].split('-')
    let secondSplitId = splitIds[1].split('-')
    let firstStartId = Number(firstSplitId[0])
    let firstLastId = Number(firstSplitId[1])
    let secondStartId = Number(secondSplitId[0])
    let secondLastId = Number(secondSplitId[1])

    console.log('\n')

    if(firstStartId === secondStartId && firstLastId === secondLastId){
        return true
    }
    if(firstStartId <= secondStartId && firstLastId >= secondLastId){
        return true
    }
    if(secondStartId <= firstStartId && secondLastId >= firstLastId){
        return true
    }
    // 2-6,4-8
    if(firstLastId >= secondStartId && firstLastId <= secondLastId){
        return true
    }
    // 1-9, 2-8
    if(secondLastId >= firstStartId && secondLastId <= firstLastId){
        return true
    }

    return false
}