var scoreboardBtnEl = document.querySelector("#scoreboard")
const params = new URLSearchParams(window.location.search);
const score = params.get("score");


scoreboardBtnEl.addEventListener("click", scoreboardPage)
function scoreboardPage(){
    var newPage = "highscores.html?score=" + score 
    document.location.replace(newPage)
}


console.log("Guessing game score: " + score);

fetch("https://random-words5.p.rapidapi.com/getMultipleRandom?count=5", {
	"method": "GET",
	"headers": {
		"x-rapidapi-host": "random-words5.p.rapidapi.com",
		"x-rapidapi-key": "aaeb0aee48msh1c1b9566e7c4d04p18d20bjsn0f12c9d4dee0"
	}
})
.then(response => {
	return response.json()
})
.catch(err => {
	console.error(err);
})
.then(function(data){
    console.log(data)
})