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
    let inputCutIndex = 0

    for(let i = 0; i < inputSplit.length; i+=3){
        let cutArray = []
        cutArray.push(inputSplit[i], inputSplit[i + 1], inputSplit[i + 2])
        inputCut[inputCutIndex] = cutArray
        inputCutIndex++
    }

    for(let i = 0; i < inputCut.length; i++){
        let maxChar = getMaxCharFromInput(inputCut[i]);
        let priority = key.indexOf(maxChar) + 1
        prioritySum += priority;
        console.log("Maxchar for input is: " + maxChar)
    }

    console.log('Sum of priority is:' + prioritySum)
  })

function getMaxCharFromInput(input){
    let charCount = [];
    let maxChar = [];

    for(let i = 0; i < input.length; i++){
        let charMap = {};

        for(let char of input[i]){
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
    let arr3 = Object.keys(charCount[2])
    for(let x = 0; x < arr.length; x++){
        for(let y = 0; y < arr2.length; y++){
            for(let z = 0; z < arr3.length; z++){
                if((arr[x] === arr2[y]) &&(arr2[y] === arr3[z])){
                    maxChar.push(arr[x])
                }
            }
        }
    }
    if(maxChar.length > 1){
        console.log(maxChar)
    }
    return maxChar
}