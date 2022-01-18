var queryString = document.location.search;
var repoName = queryString.split('=')[1];
score=repoName.split("%20")[0]
pokeId=repoName.split("%20")[1] 


// Variables 

//accepted alphabet letters
var alphabet = ['a','A','b','B','c','C','d','D','e','E','f','F','g','G','h','H','i','I','j','J','k','K','l','L','m','M','n','N','o','O','p','P','q','Q','r','R','s','S','t','T','u','U','v','V','w','W','x','X','y','Y','z','Z'];

//guesses left
var guesses = 10;

//number of wins
var wins = 0;

//number of losses
var losses = 0;

//Pick a random pokemon from a list as the word to guess
var answer = pokemon[Math.floor(Math.random()*pokemon.length)];


//create '_' placeholders in HTML document with the same number of characters as the pokemon
var answerLength = answer.length;



// Fetching Pokemon ID name from Guess Who Game 
function getQuizAnswer() {
    assignBtnListeners()
    fetch(`https://pokeapi.co/api/v2/pokemon/pokeID`)
        .then(function (response) {
            return response.json()
        })
        .then(function (data) {
            var randNum = Math.floor(Math.random() * 150)
            pokeId=randNum+1
            quizAnswer = data.name
            console.log(quizAnswer)
            quizAnswerLetterCount = quizAnswer.length
        })
    question()
}


//function runs when user presses a key
document.onkeyup = function(event) {
    if (guesses === 0 || underscore.join('') === answer){
    //    prevents guessing after game end
    }
    else {
        //userGuess is recorded based on key pressed
        var userGuess = event.key;

        //limits guesses to alphabet letters
        if (alphabet.indexOf(userGuess) > -1) {

      
    //announces a loss with the answer
        document.getElementById("whosthatpokemon").innerHTML = "You lose! It's " + answer.toUpperCase()+"!";


    //game reset
        gameOver()
    }
}