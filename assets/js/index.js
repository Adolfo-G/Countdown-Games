var imgEl = document.querySelector("img")
var ansBtn1 = document.querySelector("#ans-1")
var ansBtn2 = document.querySelector("#ans-2")
var ansBtn3 = document.querySelector("#ans-3")
var ansBtn4 = document.querySelector("#ans-4")
var scoreEl = document.querySelector("#score")
var timerEl=document.querySelector("#timer")
var apiData = ""
var answer = ""
var score = 0
var quizAnswer = ""
var questionNumber = 0
var quizAnswerLetterCount = 0
var seconds=5
var pokeId=""

function getQuizAnswer() {
    assignBtnListeners()
    fetch(`https://pokeapi.co/api/v2/pokemon?limit=151`)
        .then(function (response) {
            return response.json()
        })
        .then(function (data) {
            var randNum = Math.floor(Math.random() * 151)
            pokeId=randNum+1
            quizAnswer = data.results[randNum].name
            console.log(quizAnswer)
            quizAnswerLetterCount = quizAnswer.length
        })
    question()
}

function question() {
    fetch(`https://pokeapi.co/api/v2/pokemon?limit=151`)
        .then(function (response) {
            return response.json()
        })
        .then(function (data) {
            apiData = data
            pick4names()
        })
}
function pick4names() {
    var answerChoices=[]
    for (var i = 0; i < 4; i++) {
    var randNum = Math.floor(Math.random() * 151)
    var pokeName = apiData.results[randNum].name
    answerChoices.push(pokeName)
    }
    getImg(answerChoices)
    assignButtonNames(answerChoices)
}

function assignButtonNames(arr) {
    ansBtn1.innerHTML = arr[0]
    ansBtn2.innerHTML = arr[1]
    ansBtn3.innerHTML = arr[2]
    ansBtn4.innerHTML = arr[3]
}

function getImg(arr) {
    answer = arr[Math.floor(Math.random() * 4)]
    var url = `https://pokeapi.co/api/v2/pokemon/${answer}`
    fetch(url)
        .then(function (response) {
            return response.json()
        })
        .then(function (data) {
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
        score ++
        scoreEl.textContent = score
    }
    questionNumber++
    seconds=5
    nextQ()
}
function nextQ(){
    console.log(questionNumber, quizAnswerLetterCount)
    if(questionNumber<quizAnswerLetterCount){
        return question()
    }else{
        console.log("score:"+score, "id:"+pokeId)
        var newPage=`hangman.html?score=${score}&index=${pokeId}`
        document.location.replace(newPage)
    }
}
function timer(){
    var countdown=setInterval(time,1000)
    function time(){
        timerEl.textContent=seconds
        seconds--
        if(seconds<0){
            seconds=5
            questionNumber++
            if(questionNumber<quizAnswerLetterCount){
                question()
            }else{
                clearInterval(countdown)
                var newPage=`hangman.html?score=${score}&index=${pokeId}`
                document.location.replace(newPage)
            }
        }
    }
        
}

 
getQuizAnswer()
timer()
