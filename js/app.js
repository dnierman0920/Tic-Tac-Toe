
// Declaring global variables connected to html elements
const body = document.querySelector("body")
const allBoxes = document.querySelectorAll(".box")
const message = document.querySelector("#message")
const reset = document.querySelector('#reset')

//******************************** GLOBAL GAMEBOARD VARIABLES, LISTS AND WINNING COMBINATIONS  ********************************
let winner = false; 

const gameboard = ['a1','b1','c1','a2','b2','c2','a3','b3','c3'] // have these act as keys that can be iterated through to reference each of the gameboard squares

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
    changeSquare (square){
        //console.log(`Box ${boxId} has been selected by ${this.playerName} and is now ${this.sign}`)
        //gameboard[square] = this.sign;
        document.querySelector('#'+square).innerText = this.sign;
        this.turnCounter++;
    }
}

// ******************************** CREATE INSTANCES OF PLAYER OBJECT PLAYER 1 & PLAYER 2 ******************************

//create instances of player objects & set symbols
const player1 = Object.create(playerObject) //create player 1
player1.playerName = 'player1'
player1.sign = 'X'
player1.turn = true // allow player 1 to go first

const player2 = Object.create(playerObject) //create player 2
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
        if(playerSign === document.getElementById([winningCombinations[combo][0]]).innerText &&
           playerSign === document.getElementById([winningCombinations[combo][1]]).innerText &&
           playerSign === document.getElementById([winningCombinations[combo][2]]).innerText
        )
           {
                freezeGameboard()
                winner = playerSign
                return true
            }
    }
    return false
}

// create a function that will prevent a user from selecting any squares after that has been a winner
const freezeGameboard = () => {
        gameboard.forEach( square => {
            if (document.querySelector('#'+square).innerText === ""){
                document.querySelector('#'+square).innerText = "-" // set the square to "-" if its blank to indicate the game is over to users
            } 
        })
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
    player1.turn ? player1.changeSquare(square) : player2.changeSquare(square)
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

// create a function to reset the gameboard    
const resetGameboard = () => {
    gameboard.forEach( square => {  
        document.querySelector('#'+square).innerText = "" // reset the board by setting all the values to empty for a new game
        winner = false;
    })
}


// **********************************************  CREATE EVENT LISTENERS ****************************************************

document.addEventListener('DOMContentLoaded', () => {
    for (let i = 0; i < allBoxes.length; i++) {
        allBoxes[i].addEventListener("click", function() {
        selectBox(this.id)
        })
    }

    reset.addEventListener('click', function()  {
        resetGameboard()
    })
})

