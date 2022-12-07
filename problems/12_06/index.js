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

fs.readFile(inputFile, (err, input) => {
    if (err) throw err;

    input = input.toString();
    let part1Length = 4
    let part2Length = 14
    getMarker(input, part1Length);
    getMarker(input, part2Length)
})

function getMarker(input, markerLength){
    let firstFoundIndex = 0;
    for(let i = 0; i <= input.length - markerLength - 1; i++){
        let chars = new Set([])
        for(let x = 0; x <= markerLength - 1; x++)
        if(!chars.has(input[i+x])){
            chars.add(input[i+x])
        }

        if(chars.size === (markerLength)){
            if(firstFoundIndex === 0){
                firstFoundIndex = i + (markerLength)
            }
        }
    }
    console.log('First match found at index:' + firstFoundIndex)
}