var scoreboardBtnEl = document.querySelector("#scoreboard")
const params = new URLSearchParams(window.location.search);
const score = params.get("score");
const pokeId = params.get("index");




scoreboardBtnEl.addEventListener("click", scoreboardPage)
function scoreboardPage(){
    var newPage = "highscores.html?score=" + score 
    document.location.replace(newPage)
}

function saveHighscore() {
    var highscores =
        JSON.parse(window.localStorage.getItem("highscores")) || [];
   
    var newScore = score
        highscores.push(newScore);
        window.localStorage.setItem("highscores", JSON.stringify(highscores));
}

console.log("Guessing game score: " + score);
console.log("Pokemon index: " + pokeId);