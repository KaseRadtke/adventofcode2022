/*
PSUEDO CODE OFF TOP OF HEAD

1: Split up elves in an array, based off of new line character \n

2: For every elf, put the amount of calories in an array.

3: Loop through each elf, and then loop through their calories and add them up

4: Compare calorie total to previous calorie total. if greater, that becomes the top caloric count. Start at 0.

5: Done??
 */

//Import File System Node module for reading of file
const fs = require('fs');

let inputFile = "input.txt"
fs.readFile(inputFile, (err, input) =>{
    if(err) throw err;

    let inputToString = input.toString();
    let elvesList = inputToString.split(/\r?\n/)
    let elves = [];
    let elfCalories = []
    let elfIndex = 0
    let topCalories = 0
    let topThreeCalories = []

    /*
    * For every elf, create an array of their calories stored
    * */

    for(let i = 0; i < elvesList.length; i++){
        if(elvesList[i] != ''){
            elfCalories.push(Number(elvesList[i]))
        } else {
            elves[elfIndex] = (elfCalories)
            elfCalories = []
            elfIndex  += 1
        }
    }

    /*
    * Get the highest calorie count by looping through every elf, and getting the sum of their calories.
    * */
    for(let i = 0; i < elves.length; i++){
        let sumOfCalories = Number(elves[i].reduce(
            (accumulator, currentValue) => accumulator + currentValue,
        ))

        if(sumOfCalories > topCalories){
            topCalories = sumOfCalories
        }

        /*
        Keep track of the top three highest calories
         */
        if(topThreeCalories.length < 3){
            topThreeCalories.push(sumOfCalories)
        } else {
            if(Math.min(...topThreeCalories) < sumOfCalories){
                topThreeCalories[topThreeCalories.indexOf(Math.min(...topThreeCalories))] = sumOfCalories
            }
        }

    }

    let sumOfTopThreeCalories = Number(topThreeCalories.reduce(
        (accumulator, currentValue) => accumulator + currentValue,
    ))
    console.log("There are " + elfIndex + " Elves!");
    console.log("The highest amount of calories an elf has is " + topCalories + "!")
    console.log(topThreeCalories)
    console.log("The total of the top three calories are: " + sumOfTopThreeCalories)
})