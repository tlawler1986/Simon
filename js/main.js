/*----- constants -----*/
const TOTAL_ROUNDS = 5;

/*----- state variables -----*/

let sequence = []; 
let playerSequence = []; 
let flash; 
let turn; 
let good; 
let compTurn = false; 
let intervalId; 
let noise = true; 
let on = false; 
let win; 

/*----- cached elements  -----*/

const onButton = document.querySelector("#on");
const startButton = document.querySelector("#start");
const turnCounter = document.querySelector("#turn");

const sound1 = document.querySelector("#sound1");
const sound2 = document.querySelector("#sound2");
const sound3 = document.querySelector("#sound3");
const sound4 = document.querySelector("#sound4");
const sound5 = document.querySelector("#sound5");
const sound6 = document.querySelector("#sound6");

const topLeft = document.querySelector("#topLeft");
const topRight = document.querySelector("#topRight");
const bottomLeft = document.querySelector("#bottomLeft");
const bottomRight = document.querySelector("#bottomRight");

const outerCircle = document.querySelector("#outerCircle");

/*----- event listeners -----*/

onButton.addEventListener('click', (event) => {
    if (onButton.checked == true) {
        on = true;
        turnCounter.innerHTML = "-"; 
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
    noise = true; 
    turn = 1; 
    turnCounter.innerHTML = 1; 
    good = true; 
    for (var i = 0; i < TOTAL_ROUNDS; i++) {     
        sequence.push(Math.floor(Math.random() * 4) +1); 
    }
    compTurn = true; 
    intervalId = setInterval(gameTurn, 800); 
}

function gameTurn() {
    on = false; 
    if (flash == turn) { 
        clearInterval(intervalId);
        compTurn = false; 
        clearColor(); 
        on = true; 
     }
     if (compTurn) { 
        clearColor(); 
        setTimeout(() => {
            if (sequence[flash] == 1) one();  
            if (sequence[flash] == 2) two(); 
            if (sequence[flash] == 3) three();
            if (sequence[flash] == 4) four();
            flash++; 
            setTimeout(() => { 
                clearColor();
            }, 400); 
        }, 200); 
    }; 
}

function one() {
    if (noise) { 
        let audio = document.getElementById("sound1"); 
        audio.play(); 
    }
    noise = true; 
    topLeft.style.backgroundColor = "lightyellow"; 
}

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
    let audio = document.getElementById("sound5"); 
    audio.play();
}

function playWinSound() {
    let audio = document.getElementById("sound6"); 
    audio.play(); 
}

function clearColor () {
    topLeft.style.backgroundColor = "yellow"; 
    topRight.style.backgroundColor = "green"; 
    bottomLeft.style.backgroundColor = "blue"; 
    bottomRight.style.backgroundColor = "red"; 
}

function flashColor () {
    topLeft.style.backgroundColor = "lightyellow"; 
    topRight.style.backgroundColor = "lightgreen"; 
    bottomLeft.style.backgroundColor = "lightblue"; 
    bottomRight.style.backgroundColor = "pink"; 
}

function check() {
    if (playerSequence[playerSequence.length - 1] !== sequence[playerSequence.length - 1]) { 
        good = false;
    }
    if (playerSequence.length == TOTAL_ROUNDS && good) { 
        winGame();
    }
    if (good == false) { 
        loseGame();
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

function shootConfetti() {
    confetti({
        particleCount: 250,
        angle: 60,
        spread: 100,
        origin: { x: 0 }, 
    });
    confetti({
        particleCount: 250,
        angle: 120,
        spread: 100,
        origin: { x: 1 }, 
    });
}

function winGame() {
    turnCounter.innerHTML = "WINNER"; 
    playWinSound();
    shootConfetti();
    flashWinSequence();
    on = false; 
    win = true; 
}

function loseGame() {
    turnCounter.innerHTML = "LOSER"; 
    triggerExplosion();
    playWrongSound();
    flashColor(); 
    setTimeout(() => { 
        turnCounter.innerHTML = turn; 
        clearColor(); 
    }, 5000);
    noise = false; 
}

function triggerExplosion() {
    if (outerCircle) {
        outerCircle.classList.add("explosion");
        setTimeout(() => { 
            outerCircle.classList.remove("explosion");
        }, 1000);      
    }
}

function flashWinSequence(times = 7, interval = 500) {
    let count = 0; 
        flashInterval = setInterval(() => {
        flashColor();
        setTimeout(clearColor, interval / 2);
        count++;
        if (count >= times) {
            clearInterval(flashInterval);
        }
    }, interval);
}


  
  