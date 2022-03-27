
//*********************************  DECLARING GLOABL VARIABLES CONNECTED HTML ELEMENTS  *********************************
const allBoxes = document.querySelectorAll(".box")
const message = document.querySelector("#message")
const reset = document.querySelector('#reset')

//******************************** GLOBAL GAMEBOARD VARIABLES, LISTS AND WINNING COMBINATIONS  ********************************
let winner = false; 

const gameboardKeys = ['a1','b1','c1','a2','b2','c2','a3','b3','c3'] // these are keys that can be iterated through to reference each of the gameboard squares

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
    changeSquare (key){
        //console.log(`Box ${boxId} has been selected by ${this.playerName} and is now ${this.sign}`)
        //gameboard[square] = this.sign;
        document.getElementById(key).innerText = this.sign;
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
    if (player2.turn){ // change it to player 1 turn
        player2.turn = false
        player1.turn = true
    }
    else if (player1.turn){ // change it to player 2 turn
        player1.turn = false
        player2.turn = true
    }
}

// create a funciton to check if there is a winner by having three in a row
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
    // Add condition if there is a tie (this will occur when all of the gameboard places have a playerSign)
    // Loop through all the keys on the gameboard and check to see if any square have not been chosen (if not it is a tie)
    gameboardKeys.forEach( key => {
        if(document.getElementById(key).innerText === ""){
            return false
        }
        else{
            message.innerText = "CAT'S GAME.. Click RESET to play a new game"
        }

    })
    
    return false
}

// create a function that will prevent a user from selecting any squares after that has been a winner
const freezeGameboard = () => {
        gameboardKeys.forEach( key => {
            if (document.getElementById(key).innerText === ""){
                document.getElementById(key).innerText = "-" // set the square to "-" if its blank to indicate the game is over to users
            } 
        })
    }

// create a function that will be the 'entry point to js' when a player selects a square
const selectBox = (key) => {
    console.log('winner boolean', winner !== false)
    // check to see if the game already has a winner
    if (winner !== false) {
        message.innerText = 'Click RESET to play a new game'
        return
    }
    // check to make sure the box is not already selected
    else if(document.getElementById(key).innerText !== ""){  //TESTING TESTING TESTING TESTING
        message.innerText = `${key} is already chosen, please select a different box`
        return 
    }
    
    // create ternary operator that checks whose turn it is and then
    // selects the box with the correct player dependent on whose turn it is
    player1.turn ? player1.changeSquare(key) : player2.changeSquare(key)
    //check if there is a winner
    let playerSign;
    player1.turn ? playerSign = player1.sign : playerSign = player2.sign

    //check for winner and if no winner switch turns
    console.log(checkWinner(playerSign))

    if('X' === winner){
        message.innerText = 'the winner is X'
    }
    else if('O'=== winner){
        message.innerText = 'the winner is, O'
    }
    switchTurns() //change turns after the box is filled in with corresponding player symbol      
}

// create a function to reset the gameboard    
const resetGameboard = () => {
    gameboardKeys.forEach( key => {  
        document.getElementById(key).innerText = "" // reset the board by setting all the values to empty for a new game
        message.innerText = "Game is reset and ready to go"
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

