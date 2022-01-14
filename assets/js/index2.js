var imgEl = document.querySelector("img")
var apiData = "";
var ansBtn1 = document.querySelector("#ans-1")
var ansBtn2 = document.querySelector("#ans-2")
var ansBtn3 = document.querySelector("#ans-3")
var ansBtn4 = document.querySelector("#ans-4")
var scoreEl = document.querySelector("#score")
var answerChoices = []
var answer = ""
var randNum = Math.floor(Math.random() * 150)
var score = 0
var quizAnswer = ""
var questionNumber = 0
var quizAnswerLetterCount = 0;

function getQuizAnswer() {
    fetch(`https://pokeapi.co/api/v2/pokemon?limit=151`)
        .then(function (response) {
            return response.json()
        })
        .then(function (data) {
            randNum = Math.floor(Math.random() * 150)
            quizAnswer = data.results[randNum].name
            console.log(quizAnswer)
            quizAnswerLetterCount = quizAnswer.length
            run()
        })
}

function question() {
    fetch(`https://pokeapi.co/api/v2/pokemon?limit=151`)
        .then(function (response) {
            return response.json()
        })
        .then(function (data) {
            apiData = data
            for (var i = 0; i < 4; i++) { pick4names() }
            //console.log(answerChoices)
            assignButtonNames()
            getImg()
            assignBtnListeners()
        })

    function pick4names() {
        randNum = Math.floor(Math.random() * 150)
        var pokeName = apiData.results[randNum].name
        return answerChoices.push(pokeName)
    }

    function assignButtonNames() {
        ansBtn1.innerHTML = answerChoices[0]
        ansBtn2.innerHTML = answerChoices[1]
        ansBtn3.innerHTML = answerChoices[2]
        ansBtn4.innerHTML = answerChoices[3]
    }

    function getImg() {
        answer = answerChoices[Math.floor(Math.random() * 4)]
        var url = `https://pokeapi.co/api/v2/pokemon/${answer}`
        fetch(url)
            .then(function (response) {
                return response.json()
            })
            .then(function (data) {
                //console.log(data)
                var pokeImg = data.sprites.front_default
                imgEl.setAttribute("src", `${pokeImg}`)
            })
    }

    function assignBtnListeners() {
        ansBtn1.addEventListener("click", checkIfCorrect)
        ansBtn2.addEventListener("click", checkIfCorrect)
        ansBtn3.addEventListener("click", checkIfCorrect)
        ansBtn4.addEventListener("click", checkIfCorrect)
    }
    function checkIfCorrect() {
        if (this.innerHTML === answer) {
            score += 1
            scoreEl.textContent = score
        }
        questionNumber++
        run()
    }
}

getQuizAnswer()
function run() {
    console.log(questionNumber, quizAnswerLetterCount)
    if(questionNumber<quizAnswerLetterCount){
        question()
    }
}