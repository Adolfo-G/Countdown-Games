var questionEl=document.querySelector("#triviaQ")
var buttonBoxEl=document.querySelector("#trivia-buttons")

fetch("https://opentdb.com/api.php?amount=50&difficulty=easy&type=multiple&category=15")
    .then(function(response){
        return response.json()
    })
    .then(function(data){
        console.log(data)
    })