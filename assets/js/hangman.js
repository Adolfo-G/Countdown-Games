var scoreboardBtnEl = document.querySelector("#scoreboard")
const params = new URLSearchParams(window.location.search);
var score = parseInt(params.get("score"));
var wordText = document.querySelector("#answer")
var timerEl = document.querySelector("#timer")
var livesEl = document.querySelector("#tries")
var finalword = ""
var answer = []
var count = 45
var lives = 9
scoreboardBtnEl.addEventListener("click", scoreboardPage)
function scoreboardPage() {
	score=score*100
	if(count>0&&!answer.includes("_ ")){
		var hmScore=score*count
		score=(score+hmScore)
	}
	var newPage = "highscores.html?score=" + score
	document.location.replace(newPage)
}
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
	.then(function (data) {
		var stop = false
		var int=1
		finalword = data[0]
		function keyup(event) {
			var key = document.querySelector("#letterGuessed")
			var keyPressed = event.key
			key.textContent = keyPressed
			function matcher() {
				if (finalword.includes(keyPressed)) {
					for (var i = 0; i < finalword.length; i++) {
						if (keyPressed == finalword[i]) {
							answer[i] = finalword[i]
						}
					}
				} else {
					lives--
					livesEl.textContent = lives
				}
				wordText.textContent = answer.join("")
			}

			function winRules() {
				if (!answer.includes("_ ") || lives === 1) {
					stop = true
					int=0
					wordText.textContent = answer.join("")
				}
			}

			winRules()
			if(stop===false){
				matcher()
			}else{
				livesEl.textContent=0
			}
		}
		function wordSelector() {
			for (var i = 0; i < finalword.length; i++) {
				answer[i] = "_ "
			}
		}
		function setTime() {
			var timerInterval = setInterval(function () {
				count-=int
				timerEl.textContent = count;
				if (count === 0 || !answer.includes("_ ")||stop===true) {
					clearInterval(timerInterval);
					wordText.textContent = finalword
				}

			}, 1000);
		}
		function run() {
			wordSelector()
			wordText.textContent = answer.join("")
			setTime()
		}
		run()
		document.addEventListener("keyup", keyup)
	})