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
let key = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"



fs.readFile(inputFile, (err, input) =>{
    if(err) throw err;

    let inputToString = input.toString();
    let inputSplit = inputToString.split(/\r?\n/)
    let inputCut = []
    let prioritySum = 0

    for(let i = 0; i < inputSplit.length; i++){
        let cutArray = []
        cutArray.push(inputSplit[i].slice(0,(inputSplit[i].length / 2)),inputSplit[i].slice((inputSplit[i].length / 2), inputSplit[i].length) )
        inputCut[i] = cutArray
    }

    for(let i = 0; i < inputCut.length; i++){
       let maxChar = getMaxCharFromInput(inputCut[i]);
       let priority = key.indexOf(maxChar) + 1
        prioritySum += priority;
    }

    console.log('Sum of priority is:' + prioritySum)
  })

function getMaxCharFromInput(input){
    let charCount = [];
    let maxChar = [];

    for(let y = 0; y < input.length; y++){
        let charMap = {};

        for(let char of input[y]){
            if(charMap[char]){
                charMap[char]++
            } else {
                charMap[char] = 1
            }
        }
        charCount.push(charMap)
    }


    let arr = Object.keys(charCount[0])
    let arr2 = Object.keys(charCount[1])
    for(let i = 0; i < arr.length; i++){
        for( let x = 0; x < arr2.length; x++){
            if(arr[i] === arr2[x]){
                maxChar.push(arr[i])
            }
        }
    }
    if(maxChar.length > 1){
        console.log(maxChar)
    }
    return maxChar
}