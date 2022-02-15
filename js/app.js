console.log("we connected!!!")

// Declaring global variables connected to html elements
const body = document.querySelector("body")
const allBoxes = document.querySelectorAll(".box")
// const a1  = document.querySelector("a-1") 
// const b1  = document.querySelector("b-1")
// const c1  = document.querySelector("c-1")
// const a2  = document.querySelector("a-2")
// const b2  = document.querySelector("b-2")
// const c2  = document.querySelector("c-2")
// const a3  = document.querySelector("a-3")
// const b3  = document.querySelector("b-3")
// const a3  = document.querySelector("c-3")

// create a global gameboard object
const gameBoard = {
    a1: false,
    b1: false,
    c1: false,
    a2: false,
    b2: false,
    c2: false,
    a3: false,
    b3: false,
    c3: false,
}

//create player objects --> can expand on this later
const playerObject = {
    playerName: null,
    turn: false,
    sign: null,
    wins: 0,
    turnCounter: 0,

    //create method for a player to select a box
    changeBox (boxId){
        if(gameBoard[boxId]){
            alert(`Box ${box} is already selected, please select a different box`)
            return console.log(`Box ${box} is already selected, please select a different box`)
        }
        console.log(`Box ${boxId} has been selected by ${this.playerName} and is now ${this.sign}`)
        gameBoard[boxId] = this.sign;
        document.querySelector('#'+boxId).innerText = this.sign;
        this.turnCounter++;
        console.log(gameBoard)
    }
}

//create instances of player objects & set symbols
const player1 = Object.create(playerObject)
player1.playerName = 'player1'
player1.sign = 'X'
// allow player 1 to go first
player1.turn = true
const player2 = Object.create(playerObject)
player2.playerName = 'player2'
player2.sign = '0'

//create a method to change whose turn it is between player 1 & 2
const switchTurns = () => {
    console.log("switching turns")
    if (player2.turn){ // change it to player 1 turn
        player2.turn = false
        player1.turn = true
        console.log("player2's turn is over, player 1 go!")
    }
    else if (player1.turn){ // change it to player 2 turn
        player1.turn = false
        player2.turn = true
        console.log("player1's turn is over, player 2 go!")
    }
    console.log(`player1 turn: ${player1.turn}`)
    console.log(`player2 turn: ${player2.turn}`)
}


//create function to check for 3 in a row
const gameboardWinner = () =>{
    console.log("checking for a winner thru function gamboardWinner")
    if (gameBoard.a1 === gameBoard.a2 && gameBoard.a1=== gameBoard.a3){
        //column A
        return gameBoard.a1
    }
    else if(gameBoard.b1 === gameBoard.b2  && gameBoard.b1 === gameBoard.b3){
        //column B
        return gameBoard.b1
    }
    else if(gameBoard.c1 === gameBoard.c2  &&  gameBoard.c1 === gameBoard.c3){
        //column c
        return gameBoard.c1
    }
    else if(gameBoard.a1 === gameBoard.b1  && gameBoard.a1 === gameBoard.c1){
        //row 1
        return gameBoard.a1
    }
    else if(gameBoard.a2 === gameBoard.b2  && gameBoard.a2 === gameBoard.c2){
        //row 2
        return gameBoard.a2
    }
    else if(gameBoard.a3 === gameBoard.b3  && gameBoard.a3 === gameBoard.c3){
        //row 3
        return gameBoard.a3
    }
    else if (gameBoard.a1 === gameBoard.b2  && gameBoard.a1 === gameBoard.c3 ){
        // top left corner diagonal to bottom right
        return gameBoard.a1
    }
    else if (gameBoard.c1 === gameBoard.b2 && gameBoard.c1 ===  gameBoard.a3){
        // top right corner diagonal to bottom left
        return gameBoard.c1
    }
    else {
        
    }
}

// create a function that will prevent a user from selecting any squares
// after that has been a winner
const freezeGameboard = () => {
    for (let square in gameBoard){
        gameBoard[square] = true;
    }
    console.log("the Gameboard has froze!")
}

// create a function that will be the 'entry point to js' when a player
// selects a square
const selectBox = (boxId) => {
    // check to make sure the box is not already selected
    if(gameBoard[boxId]) return console.log(`${gameBoard[boxId]} is already chosen, please select a different box`)
    // create ternary operator that checks whose turn it is and then
    // selects the box with the correct player dependent on whose
    // turn it is
    player1.turn ? player1.changeBox(boxId) : player2.changeBox(boxId)
    // if either player has gone 3 or more times check to see if there
    // is a winner
    if(player1.turnCounter >= 3 || player2.turnCounter >= 3 ) {
        //check if there is a winner
        if(gameboardWinner()){
            console.log(`${gameboardWinner()} has won! please select "Reset" below to start a new game`)
            freezeGameboard()
        } 
    }

    //change turns after the box is filled in with corresponding player symbol
    switchTurns()
}

document.addEventListener('DOMContentLoaded', () => {
    for (let i = 0; i < allBoxes.length; i++) {
        allBoxes[i].addEventListener("click", function() {
        selectBox(this.id)
        })
    }
})

