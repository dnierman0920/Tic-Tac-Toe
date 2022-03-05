// set global value for winner
let winner = false;

// Declaring global variables connected to html elements
const body = document.querySelector("body")
const allBoxes = document.querySelectorAll(".box")
const message = document.querySelector("#message")
const reset = document.querySelector('#reset')



//******************************** GLOBAL GAMEBOARD AND WINNING COMBINATIONS  ********************************
const gameboard = {
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

const winningCombinations = 
    [
        ['a1','a2','a3'],
        ['b1','b2','b3'],
        ['c1','c2','c3'],
        ['a1','b1','c1'],
        ['a2','b2','c2'],
        ['a3','b3','c3'],
        ['a1','b2','c3'],
        ['c1','b2','a3']
    ]
//********************************  CREATE PLAYER OBJECTS WITH KEY/VALUES && METHODS ********************************

//create player objects --> can expand on this later
const playerObject = {
    playerName: null,
    turn: false,
    sign: null,
    wins: 0,
    turnCounter: 0,

    //create method for a player to select a box
    changeBox (boxId){
        //console.log(`Box ${boxId} has been selected by ${this.playerName} and is now ${this.sign}`)
        gameboard[boxId] = this.sign;
        document.querySelector('#'+boxId).innerText = this.sign;
        this.turnCounter++;
        console.log(gameboard)
    }
}


// ******************************** CREATE INSTANCES OF PLAYER OBJECT PLAYER 1 & PLAYER 2 ******************************

//create instances of player objects & set symbols
//create player 1
const player1 = Object.create(playerObject)
player1.playerName = 'player1'
player1.sign = 'X'
player1.turn = true // allow player 1 to go first

//create player 2
const player2 = Object.create(playerObject)
player2.playerName = 'player2'
player2.sign = 'O'

//**********************************************  GAME PLAY FUNCITONS *****************************************************  

//create a method to change whose turn it is between player 1 & 2
const switchTurns = () => {
    //console.log("switching turns")
    if (player2.turn){ // change it to player 1 turn
        player2.turn = false
        player1.turn = true
        console.log("player2's turn is over, player 1 go!")
    }
    else if (player1.turn){ // change it to player 2 turn
        player1.turn = false
        player2.turn = true
    }
}

const checkWinner = (playerSign) => {
    for (combo in winningCombinations){
        if(playerSign === gameboard[winningCombinations[combo][0]] &&
           playerSign === gameboard[winningCombinations[combo][1]] &&
           playerSign === gameboard[winningCombinations[combo][2]])
           {
                freezeGameboard(true)
                winner = playerSign
                return true
            }
    }
    return false
}

// create a function that will prevent a user from selecting any squares after that has been a winner
const freezeGameboard = (boolean) => {
    if(boolean){
        for (square in gameboard){
            if(document.querySelector('#'+square).innerText === "") document.querySelector('#'+square).innerText = "-" // itterate through each square and set it to true, so it cannot be clicked TESTING TESTING TESTING
        }
        console.log('gameboard', gameboard)
    }
    else {
        for (square in gameboard){
            gameboard[square] = false; // itterate through each square and set it to empty, so it cannot be clicked
            document.querySelector('#'+square).innerText = ""
            winner = false;
            //console.log('erasing content from, ', square)
        }
    }
}

// create a function that will be the 'entry point to js' when a player selects a square
const selectBox = (square) => {
    console.log('winner boolean', winner !== false)
    // check to see if the game already has a winner
    if (winner !== false) {
        alert('Click RESET to play a new game')
        return
    }
    // check to make sure the box is not already selected
    else if(document.querySelector('#'+square).innerText !== ""){  //TESTING TESTING TESTING TESTING
        alert(`${square} is already chosen, please select a different box`)
        return console.log(`${square} is already chosen, please select a different box`)
    }
    
    // create ternary operator that checks whose turn it is and then
    // selects the box with the correct player dependent on whose turn it is
    player1.turn ? player1.changeBox(square) : player2.changeBox(square)
    //check if there is a winner
    let playerSign;
    player1.turn ? playerSign = player1.sign : playerSign = player2.sign

    //check for winner and if no winner switch turns
    checkWinner(playerSign)

    if('X' === winner){
        alert('the winner is X')
    }
    else if('O'=== winner){
        alert('the winner is, O')
    }
    switchTurns() //change turns after the box is filled in with corresponding player symbol      
}


// **********************************************  CREATE EVENT LISTENERS ****************************************************

document.addEventListener('DOMContentLoaded', () => {
    for (let i = 0; i < allBoxes.length; i++) {
        allBoxes[i].addEventListener("click", function() {
        selectBox(this.id)
        })
    }

    reset.addEventListener('click', function()  {
        freezeGameboard(false)
    })
})

