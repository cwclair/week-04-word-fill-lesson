var startButton = document.querySelector("button");
var timerId; 
var canGuess = false;
var wins = localStorage.getItem("wins") || 0;
var losses = localStorage.getItem("losses") || 0;
var words = ["saxophone", "guitar", "drums", "bass", "synthesizer", "piano", "vocoder", "trumpet"]


var wordToGuess = "cheeseburger";
var guessedLetters = "";
displayScore();

function displayScore () {
    document.querySelector("#wins").innerHTML = wins;
    document.querySelector("#losses").innerHTML = losses;
    
}

function displayWord() {
    var wordToDisplay = "";
    for (var i = 0; i < wordToGuess.length; i++) {
        if (guessedLetters.includes(wordToGuess[i])) {
            wordToDisplay += wordToGuess[i] + " "
        }
        else {
            wordToDisplay += "_ ";
        }
    }
    document.querySelector("#word").innerHTML = wordToDisplay;
    if (wordToGuess == wordToDisplay.replaceAll(" ", "")) {
        document.querySelector("#message").innerHTML = "YOU WON!";
        wins++;
        localStorage.setItem("wins", wins);
        displayScore();
        startButton.style.display = "inline";
        clearInterval(timerId);
    }
}
// displayWord();

document.addEventListener("keyup", function(event) {
    if (!canGuess) {
        return;
    }
    console.log(event);
    var letterGuessed = event.key;
    guessedLetters += letterGuessed;
    console.log(guessedLetters);
    displayWord()
})

startButton.addEventListener("click", function(event) {
    event.preventDefault();
    canGuess = true;
    wordToGuess = words[Math.floor(Math.random() * words.length)];
    guessedLetters = "";
    displayWord();
    startButton.style.display = "none";
    document.querySelector("#message").innerHTML = "";
    timerId = setInterval(function() {
        document.querySelector("#message").innerHTML = "YOU LOSE!";
        losses++;
        localStorage.setItem("losses", losses);
        displayScore();
        startButton.style.display = "inline";
        clearInterval(timerId);
        canGuess = false;
    }, 10000)
    
})
