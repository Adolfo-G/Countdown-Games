var scoreboardBtnEl = document.querySelector("#scoreboard")
const params = new URLSearchParams(window.location.search);
const score = params.get("score");
const pokeId = params.get("index");




scoreboardBtnEl.addEventListener("click", scoreboardPage)
function scoreboardPage(){
    var newPage = "highscores.html?score=" + score 
    document.location.replace(newPage)
}


console.log("Guessing game score: " + score);
console.log("Pokemon index: " + pokeId);