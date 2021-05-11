//a list of words to be guessed
var guessme = [
	"strawberry",
	"banana",
	"javascript",
	"blue",
	"toothbrush",
  "samsung",
  "winter",
  "books",
  "hogwarts",
  "japan",
  "indecisive",
  "giraffe"
]

let answer = ''; //answer guessed by player
let maxWrong = 6; //max number of wrongs the player can get
let mistakes = 0; //mistake count
let guessed = []; //letter choose by player
let wordStatus = null;
let getHint = document.getElementById("hint"); //to get hint id
let showClue = document.getElementById("clue"); //to get clue id

//random word chosen from the words list to be guessed by player
function randomWord() {
  answer = guessme[Math.floor(Math.random() * guessme.length)];
  console.log(answer);
}

//create alphabet buttons
function generateButtons() {
  let buttonsHTML = 'abcdefghijklmnopqrstuvwxyz'.split('').map(letter =>
    `
      <button
        class="btn btn-lg btn-light m-2"
        id='` + letter + `'
        onClick="handleGuess('` + letter + `')"
      >
        ` + letter + `
      </button>
    `).join('');

  document.getElementById('keyboard').innerHTML = buttonsHTML;
}

//use for handling the answer given by the player
function handleGuess(chosenLetter) {
  guessed.indexOf(chosenLetter) === -1 ? guessed.push(chosenLetter) : null;
  document.getElementById(chosenLetter).setAttribute('disabled', true);

  if (answer.indexOf(chosenLetter) >= 0) {
    guessedWord();
    checkIfGameWon();
  } else if (answer.indexOf(chosenLetter) === -1) {
    mistakes++;
    updateMistakes();
    checkIfGameLost();
    updatedinoPicture();
  }
}

// shows different dinosaur picture according to the number of wrong guesses
function updatedinoPicture() {
  document.getElementById('dinoPic').src = './img/' + mistakes + '.png';
}

//if the player guessed the word correctly
function checkIfGameWon() {
  if (wordStatus === answer) {
    document.getElementById('keyboard').innerHTML = 'Phew!! So close! You did it!';
  }
}

//if the player didn't get to guessed the word until they used up all the 6 wrong guesses chance
function checkIfGameLost() {
  if (mistakes === maxWrong) {
    document.getElementById('wordSpotlight').innerHTML = 'The answer was: ' + answer;
    document.getElementById('keyboard').innerHTML = "Awww you lose. It's okay you can try again.";
  }
}

// change '_' to the alphabet chosen by player
function guessedWord() {
  wordStatus = answer.split('').map(letter => (guessed.indexOf(letter) >= 0 ? letter : " _ ")).join('');

  document.getElementById('wordSpotlight').innerHTML = wordStatus;
}

//update the number of wrong guesses
function updateMistakes() {
  document.getElementById('mistakes').innerHTML = mistakes;
}

//to click on hint button and show the clue of the word
hint.onclick = function() {

  hints = [
    "fruit that is red in color", "yellow color fruit", "programming language", "what color is the sky?", 
    "use for brushing your teeth", "one of android phone brand", "cold season", "you can find these in the library",
     "harry potter school", "country where anime came from", "what do you call a person who can't' make decision?",
      "an animal with a long neck"
  ];

  let hintIndex = guessme.indexOf(answer);
  showClue.innerHTML = "Clue:  " +  hints [hintIndex];
  };

// reset the game or get new word to be guess
function reset() {
  mistakes = 0;
  guessed = [];
  showClue.innerHTML = "";
  document.getElementById('dinoPic').src = './img/0.png';

  randomWord();
  guessedWord();
  updateMistakes();
  generateButtons();
}

document.getElementById('maxWrong').innerHTML = maxWrong;

randomWord();
generateButtons();
guessedWord();


