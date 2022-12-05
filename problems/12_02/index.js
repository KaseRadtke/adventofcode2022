//Import File System Node module for reading of file
const fs = require('fs');

let inputFile = "input.txt"
let game = {
    DRAW: {value: 'Y', score: 3},
    WIN: {value: 'Z', score: 6},
    LOSE:{value: 'X', score: 0}
}
let map = new Map();
map.set('rock', { value: 'rock', keys:['A','X'], score : 1, beats: 'scissor'})
map.set('paper', { value: 'paper', keys: ['B','Y'], score: 2, beats: 'rock'})
map.set('scissor', { value: 'scissor', keys: ['C','Z'], score: 3, beats: 'paper'})



fs.readFile(inputFile, (err, input) =>{
    if(err) throw err;

    let inputToString = input.toString();
    let gameRounds = inputToString.split(/\r?\n/)
    let gameRoundsSplit = []
    let score = 0;

    for(let i = 0; i < gameRounds.length; i++){
        gameRoundsSplit.push(gameRounds[i].split(" "))
    }

    for(let gameRound of gameRoundsSplit){
        let gameOutcome = getGameOutcome(convertGame(gameRound))
        score += getScore(gameOutcome)
    }
    console.log('total score:' + score)
})

function convertGame(gameRound){
    for(let i = 0; i < gameRound.length; i++){
        if(map.get('rock').keys.includes(gameRound[0])){
            gameRound[0] = map.get('rock')
        }
        if(map.get('paper').keys.includes(gameRound[0])){
            gameRound[0] = map.get('paper')
        }
        if(map.get('scissor').keys.includes(gameRound[0])){
            gameRound[0] = map.get('scissor')
        }
    }
    return gameRound
}

function getGameOutcome(convertedGameRound){
    let opponentsHand = convertedGameRound[0]
    let myHand = convertedGameRound[1]

    // Part 2
    if(myHand === game.DRAW.value) {
        myHand = opponentsHand;
        console.log(opponentsHand)
    }

    if(myHand === game.WIN.value) {
        if(opponentsHand.value === 'rock'){
            myHand = map.get('paper')
        }
        if(opponentsHand.value === 'paper'){
            myHand = map.get('scissor')
        }
        if(opponentsHand.value === 'scissor'){
            myHand = myHand = map.get('rock')
        }
    }
    if(myHand === game.LOSE.value) {
        if(opponentsHand.value === 'rock'){
            myHand = map.get('scissor')
        }
        if(opponentsHand.value === 'paper'){
            myHand = map.get('rock')
        }
        if(opponentsHand.value === 'scissor'){
            myHand = myHand = map.get('paper')
        }
    }

    if(opponentsHand.value === myHand.value){
        return {status: game.DRAW, handScore: myHand.score}
    }
    if(opponentsHand.beats === myHand.value){
        return {status: game.LOSE, handScore: myHand.score}
    }
    if(myHand.beats === opponentsHand.value){
        return {status: game.WIN, handScore: myHand.score}
    }
}

function getScore(gameOutcome){
    return gameOutcome.status.score + gameOutcome.handScore
}