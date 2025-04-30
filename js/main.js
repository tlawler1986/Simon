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
const sound5 = document.querySelector("#sound5");

const topLeft = document.querySelector("#topLeft");
const topRight = document.querySelector("#topRight");
const bottomLeft = document.querySelector("#bottomLeft");
const bottomRight = document.querySelector("#bottomRight");







/*----- event listeners -----*/

onButton.addEventListener('click', (event) => {
    if (onButton.checked == true) {
        on = true; 
        turnCounter.innerHTML = "0"; //reset the turn counter
    }   else {
        on = false; 
        turnCounter.innerHTML = ""; 
        clearColor(); 
        clearInterval(intervalId); 
    }
});
// onButton is the what that turns the game on and off, and resets the turn counter

startButton.addEventListener('click', (event) => {
    if (on || win) {
        play ();        
    }
});
// startButton is what starts the game, and resets the game if the player has won

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
// topLeft is what checks if the player has clicked the top left button, and plays the sound and changes the color of the button

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
// topRight is what checks if the player has clicked the top right button, and plays the sound and changes the color of the button

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
// bottomLeft is what checks if the player has clicked the bottom left button, and plays the sound and changes the color of the button

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
// bottomRight is what checks if the player has clicked the bottom right button, and plays the sound and changes the color of the button
      



/*----- functions -----*/

function play() {
    win = false; //reset the win
    sequence = []; //reset the sequence
    playerSequence = []; //reset the player sequence
    flash = 0; // reset the flash
    intervalId = 0; // reset the intervalId
    noise = true; //reset the noise
    turn = 1; //reset the turn
    turnCounter.innerHTML = 1; //reset the turn counter
    good = true; //player hasn't hit any wrong buttons
    for (var i = 0; i < TOTAL_ROUNDS; i++) {     //go through TOTAL_ROUNDS times to win
        sequence.push(Math.floor(Math.random() * 4) +1); //push a random number between 1 and 4 into the sequence array
    }
    compTurn = true; 
    intervalId = setInterval(gameTurn, 800); //set interval for the game turn
 }
// Function Play is the main game initializer, what's set up to begin the game, resets, creates a new sequence

function gameTurn() {
    on = false; //turn off the buttons
    if (flash == turn) { //if the flash is equal to the turn
        clearInterval(intervalId); //stop the interval
        compTurn = false; //computer's turn is over
        clearColor(); 
        on = true; //turn the buttons back on
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
            }, 400); // in milliseconds
        }, 200); // how long the flash is m/s
    }; 
}
// Function gameTurn is the function that runs the game, it flashes the colors in the sequence and checks if the player has clicked the right buttons

/*function resetGame() { // Reset the game state
    sequence = [];
    playerSequence = []; 
    turn = 1; 
    flash = 0; 
    good = true; 
    noise = true; 
    on = true; 
    turnCounter.innerHTML = "0";
    onButton.checked = false; 
    startButton.disabled = false;
    clearColor(); 
}*/

function one() {
    if (noise) { 
        let audio = document.getElementById("sound1"); // get the sound element
        audio.play(); // play the sound
    }
    noise = true; // set noise to true
    topLeft.style.backgroundColor = "lightyellow"; // change the color of the button
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

function playWrongSound() {
    let audio = document.getElementById("sound5"); // get the sound element
    audio.play(); // play the sound
}

function clearColor () {
    topLeft.style.backgroundColor = "yellow"; // reset the color of the button
    topRight.style.backgroundColor = "green"; 
    bottomLeft.style.backgroundColor = "blue"; 
    bottomRight.style.backgroundColor = "red"; 
}
//function clearColor is the function that clears the colors of the buttons after they are clicked or flashed

function flashColor () {
    topLeft.style.backgroundColor = "lightyellow"; // change the color of the button
    topRight.style.backgroundColor = "lightgreen"; 
    bottomLeft.style.backgroundColor = "lightblue"; 
    bottomRight.style.backgroundColor = "pink"; 
}
//function flashColor is the function that flashes the colors of the buttons when the player loses or wins

function check() {
    if (playerSequence[playerSequence.length - 1] !== sequence[playerSequence.length - 1]) {
        good = false; // if the player clicks the wrong button, good is false
        playWrongSound();
    }
    if (playerSequence.length == TOTAL_ROUNDS && good) { 
        winGame();
        return; // if the player has clicked all the buttons in the right order, they win
    }
        if (good == false) { // if the player has clicked the wrong button
            flashColor(); // flash the colors
            turnCounter.innerHTML = "LOSER"; // set the turn counter to loser
            setTimeout(() => { 
                turnCounter.innerHTML = turn; // reset the turn counter
                clearColor(); // reset the colors
        }, 3000); // reset the colors after 3 seconds
        noise = false; 
    }
    if (turn == playerSequence.length && good && !win) { // if the player has clicked all the buttons in the right order, and they are on the right turn
        turn++; // increment the turn
        playerSequence = []; // reset the player sequence
        compTurn = true; // set the computer's turn to true
        flash = 0; // reset the flash
        turnCounter.innerHTML = turn; // update the turn counter
        intervalId = setInterval(gameTurn, 800); 
    }
}
//function check is the function that checks if the player has clicked the right buttons, if they have won or lost, and if they are on the right turn

function winGame() {
    flashColor();
    turnCounter.innerHTML = "WINNER"; // set the turn counter to winner
    on = false; // turn off the buttons
    win = true; // set win to true
}
//function winGame is the function that plays the winning sound and changes the color of the buttons when the player wins