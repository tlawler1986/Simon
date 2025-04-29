/*----- constants -----*/
const TOTAL_ROUNDS = 10; // total rounds to win


/*----- state variables -----*/

let sequence = []; //sequence of game
let playerSequence = []; //sequence player clicks
let flash; //number of flashes
let turn; //turn number
let good; //is the player correct
let compTurn = false; //is it the computer's turn
let intervalId;
let noise = true; //is the sound on
let on = false; //are the buttons on
let win; //did the player win



/*----- cached elements  -----*/

const onButton = document.querySelector("#on");
const startButton = document.querySelector("#start");
const turnCounter = document.querySelector("#turn");

const sound1 = document.querySelector("#sound1");
const sound2 = document.querySelector("#sound2");
const sound3 = document.querySelector("#sound3");
const sound4 = document.querySelector("#sound4");

const topLeft = document.querySelector("#topLeft");
const topRight = document.querySelector("#topRight");
const bottomLeft = document.querySelector("#bottomLeft");
const bottomRight = document.querySelector("#bottomRight");







/*----- event listeners -----*/

onButton.addEventListener('click', (event) => {
    if (onButton.checked == true) {
        on = true; 
        turnCounter.innerHTML = "-"; //reset the turn counter
    }   else {
        on = false; 
        turnCounter.innerHTML = ""; 
        clearColor(); 
        clearInterval(intervalId); 
    }
});

startButton.addEventListener('click', (event) => {
    if (on || win) {
        play ();        
    }
});

topLeft.addEventListener('click', (event) => {
    if (on) {
        playerSequence.push(1);
        check();
        one();
        if(!win) {
            setTimeout(() => {
                clearColor();
            }, 300);
        }
    }
})

topRight.addEventListener('click', (event) => {
    if (on) {
        playerSequence.push(2);
        check();
        two();
        if(!win) {
            setTimeout(() => {
                clearColor();
            }, 300);
        }
    }
})

bottomLeft.addEventListener('click', (event) => {
    if (on) {
        playerSequence.push(3);
        check();
        three();
        if(!win) {
            setTimeout(() => {
                clearColor();
            }, 300);
        }
    }
})

bottomRight.addEventListener('click', (event) => {
    if (on) {
        playerSequence.push(4);
        check();
        four();
        if(!win) {
            setTimeout(() => {
                clearColor();
            }, 300);
        }
    }
})
      



/*----- functions -----*/

function play() {
    win = false;
    sequence = [];
    playerSequence = [];
    flash = 0;
    intervalId = 0;
    turn = 1;
    turnCounter.innerHTML = 1;
    good = true; //player hasn't hit any wrong buttons
    for (var i = 0; i < TOTAL_ROUNDS; i++) {     //go through loop 10 times to win **********
        sequence.push(Math.floor(Math.random() * 4) +1); //push a random number between 1 and 4 into the sequence array
    }
    compTurn = true; 
    intervalId = setInterval(gameTurn, 800); //set interval for the game turn
 }
// Function Play is the main game initializer, what's set up to begin the game, resets, creates a new sequence

function gameTurn() {
    on = false; 
    if (flash == turn) { //if the flash is equal to the turn
        clearInterval(intervalId); 
        compTurn = false; //computer's turn is over
        clearColor();
        on = true; 
     }
     if (compTurn) { 
        clearColor(); 
        setTimeout(() => {
            if (sequence[flash] == 1) one();  //if the sequence is 1, call the one function
            if (sequence[flash] == 2) two();
            if (sequence[flash] == 3) three();
            if (sequence[flash] == 4) four();
            flash++; 
            setTimeout(() => {
                clearColor(); //clear the color after the flash
            }, 400);
        }, 200); // how long the flash is m/s
    }; 
}
// Function gameTurn is the function that runs the game, it flashes the colors in the sequence and checks if the player has clicked the right buttons

function one() {
    if (noise) {
        let audio = document.getElementById("sound1");
        audio.play();
    }
    noise = true;
    topLeft.style.backgroundColor = "lightyellow"; 
}
// function one,two,three, four are the functions that play the sounds and change the colors of the buttons when clicked

function two() {
    if (noise) {
        let audio = document.getElementById("sound2");
        audio.play();
    }
    noise = true;
    topRight.style.backgroundColor = "lightgreen"; 
}

function three() {
    if (noise) {
        let audio = document.getElementById("sound3");
        audio.play();
    }
    noise = true;
    bottomLeft.style.backgroundColor = "lightblue"; 
}

function four() {
    if (noise) {
        let audio = document.getElementById("sound4");
        audio.play();
    }
    noise = true;
    bottomRight.style.backgroundColor = "pink"; 
}

function clearColor () {
    topLeft.style.backgroundColor = "yellow"; 
    topRight.style.backgroundColor = "green"; 
    bottomLeft.style.backgroundColor = "blue"; 
    bottomRight.style.backgroundColor = "red"; 
}
//function clearColor is the function that clears the colors of the buttons after they are clicked or flashed

function flashColor () {
    topLeft.style.backgroundColor = "lightyellow"; 
    topRight.style.backgroundColor = "lightgreen"; 
    bottomLeft.style.backgroundColor = "lightblue"; 
    bottomRight.style.backgroundColor = "pink"; 
}
//function flashColor is the function that flashes the colors of the buttons when the player loses or wins

function check() {
    if (playerSequence[playerSequence.length - 1] !== sequence[playerSequence.length - 1]) {
        good = false; 
    }
    if (playerSequence.length == TOTAL_ROUNDS && good) { //******* winner change
        winGame(); 
    }
        if (good == false) {
            flashColor();
            turnCounter.innerHTML = "LOSER";
            setTimeout(() => {
                turnCounter.innerHTML = turn;
                clearColor();
        }, 800);
        noise = false;
    }
    if (turn == playerSequence.length && good && !win) {
        turn++;
        playerSequence = [];
        compTurn = true;
        flash = 0;
        turnCounter.innerHTML = turn;
        intervalId = setInterval(gameTurn, 800);
    }
}
//function check is the function that checks if the player has clicked the right buttons, if they have won or lost, and if they are on the right turn

function winGame() {
    flashColor();
    turnCounter.innerHTML = "WINNER";
    on = false;
    win = true;
}