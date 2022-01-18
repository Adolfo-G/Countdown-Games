const params = new URLSearchParams(window.location.search);
const score = params.get("score");
  
console.log(score); 

// function printHighscores() {
//   // either get scores from localstorage or set to empty array
//   var highscores = JSON.parse(window.localStorage.getItem("terms")) || [];

//   // sort highscores by score property in descending order
//   highscores.sort(function(a, b) {
//     return b.score - a.score;
//   });

//   highscores.forEach(function(score) {
//     // create li tag for each high score
//     var liTag = document.createElement("li");
//     liTag.textContent = score.initials + " - " + score.score;

//     // display on page
//     var olEl = document.getElementById("terms");
//     olEl.appendChild(liTag);
//   });
// }

function printHighscores() {
  // either get scores from localstorage or set to empty array

  var liTag = document.createElement("ul");
  liTag.textContent = "Your Score: " + score;

  var olEl = document.getElementById("highscores");
  olEl.appendChild(liTag);

}

function clearHighscores() {
  window.localStorage.removeItem("highscores");
  window.location.reload();
}

document.getElementById("clear").onclick = clearHighscores;

// run function when page loads
printHighscores();


