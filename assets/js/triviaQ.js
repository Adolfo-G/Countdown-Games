var quizQuestionEl = document.querySelector("#quiz-question")
var ansBtn1 = document.querySelector("#ans-1")
var ansBtn2 = document.querySelector("#ans-2")
var ansBtn3 = document.querySelector("#ans-3")
var ansBtn4 = document.querySelector("#ans-4")
var scoreEl = document.querySelector("#score")
var timerEl=document.querySelector("#timer")
var apiDataResults = ""
var apiData=""
var quizQuestion = ""
var answer = ""
var score = 0
var questionNumber = 0
var totalQuestions = 5
var seconds=20
function getDifficulty(){
    var queryString = document.location.search;
    var difficulty = queryString.split('=')[1];
    var mode=""
    if(difficulty==="Easy"){mode="easy"}
    else if(difficulty==="Normal"){mode="medium"}
    else if(difficulty==="Hard"){mode="hard"}
    fetch(`https://opentdb.com/api.php?amount=5&difficulty=${mode}&type=multiple`)
        .then(function (response) {
            return response.json()
        })
        .then(function (data) {
                apiData=data
                pick4(data)
        })   
}
function pick4(data) {
    apiDataResults=data.results[questionNumber]
    var answerChoices=[]
    var correctAnswers= apiDataResults.correct_answer
    answer=correctAnswers
    
    answerChoices.push(correctAnswers)
    for (var i = 0; i < 3; i++) {
        var incorrectAnswers = apiDataResults.incorrect_answers[i]
        answerChoices.push(incorrectAnswers)          
    }
    
    question(apiDataResults)
    assignButtonNames(mix(answerChoices))
    assignBtnListeners()
}
function mix(answerChoices){
    var choices=answerChoices
    var mixedChoices=[]
    for (var j = 0; j < 4; j++) {
        var answerChoice=choices[Math.floor(Math.random()*choices.length)]
        const index = choices.indexOf(answerChoice);
        if (index > -1) {
            choices.splice(index, 1);
        }
        mixedChoices.push(answerChoice)
    }
    return mixedChoices
}
function question(data) {
    quizQuestion=data.question
    quizQuestionEl.innerHTML=quizQuestion
}
function assignButtonNames(arr) {
    ansBtn1.innerHTML = arr[0]
    ansBtn2.innerHTML = arr[1]
    ansBtn3.innerHTML = arr[2]
    ansBtn4.innerHTML = arr[3]
}
function assignBtnListeners() {
    ansBtn1.addEventListener("click", checkIfCorrect)
    ansBtn2.addEventListener("click", checkIfCorrect)
    ansBtn3.addEventListener("click", checkIfCorrect)
    ansBtn4.addEventListener("click", checkIfCorrect)
}
function checkIfCorrect() {
    if (this.innerHTML == answer) {
        score ++
        scoreEl.textContent = score
    }
    questionNumber++
    seconds=20
    nextQ()
}
function nextQ(){
    if(questionNumber<totalQuestions){
        return pick4(apiData)
    }else{
        var newPage=`hangman.html?score=${score}`
        document.location.replace(newPage)
    }
}
function timer(){
    var countdown=setInterval(time,1000)
    function time(){
        timerEl.textContent=seconds
        seconds--
        if(seconds<0){
            seconds=20
            questionNumber++
            if(questionNumber<totalQuestions){
                pick4(apiData)
            }else{
                clearInterval(countdown)
                var newPage=`hangman.html?score=${score}`
                document.location.replace(newPage)
            }
        }
    }
}
getDifficulty()
timer()
