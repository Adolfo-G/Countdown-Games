const params = new URLSearchParams(window.location.search);
var score = params.get("score");
var olEl = document.getElementById("highscores");
var localData=[]
function printHighscores() {
  // either get scores from localstorage or set to empty array
  var highscores = JSON.parse(localStorage.getItem("terms"));
  if(highscores!=null){
    localData=highscores
  }
  localData.push(score)
  localStorage.setItem("terms",JSON.stringify(localData))
  // sort highscores by score property in descending order
  localData.sort(function(a, b) {
    return b - a;
  });
  var highscoreIndex;
  for(var i=0;i<localData.length;i++){
    // create li tag for each high score
    var liTag = document.createElement("li");
    liTag.classList.add("scoreboard-li")
    highscoreIndex= localData[i]
    liTag.textContent = highscoreIndex
    // display on page
    olEl.appendChild(liTag);
  };
}
function clearHighscores() {
  window.localStorage.clear()
  score=null
  if(olEl.hasChildNodes()){
    while (olEl.firstChild) {
        olEl.removeChild(olEl.lastChild)
    }
  }
}
document.getElementById("clear").onclick = clearHighscores;
// run function when page loads
printHighscores();
