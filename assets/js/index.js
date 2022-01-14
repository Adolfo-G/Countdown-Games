let gameData;
const main = document.querySelector('main');
const pokemonImage = document.querySelector('#pokemon-image');
const textOverlay = document.querySelector('#text-overlay');
const choices = document.querySelector('#choices');
const playBtn = document.querySelector('#play');
playBtn.addEventListener('click', fetchData);
addAnswerHandler();

//Start menu
var startBtn = document.getElementById("start");

function startQuiz() {
  // hide start menu
  var startScreenEl = document.getElementById("start-menu");
  startScreenEl.setAttribute("class", "hide");

  // un-hide questions section
  questionsEl.removeAttribute("class");

  // start timer
  timerId = setInterval(clockTick, 1000);

  // show starting time
  timerEl.textContent = time;

  getQuestion();
}


async function fetchData() {
  resetImage();
  gameData = await window.getPokeData();
  showSilhouette();
  displayChoices();
}



function resetImage() {
  pokemonImage.src = 'data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs%3D';
  main.classList.add('pokemon-guessing-game');
  main.classList.remove('revealed');
}

function showSilhouette() {
  main.classList.remove('pokemon-guessing-game');
  pokemonImage.src = gameData.correct.image;
}


function displayChoices() {
  const { pokemonChoices } = gameData;
  const choicesHTML = pokemonChoices.map(({ name }) => {
    return `<button data-name="${name}">${name}</button>`;
  }).join('');

  choices.innerHTML = choicesHTML;
}

function addAnswerHandler() {
  choices.addEventListener('click', e => {
    e.preventDefault()
    const { name } = e.target.dataset;
    console.log("name", name)
    const resultClass = (name === gameData.correct.name) ?
      'correct' : 'incorrect';

    e.target.classList.add(resultClass);
    revealPokemon();
  });
}

function revealPokemon() {
  main.classList.add('revealed');
  textOverlay.textContent = `${gameData.correct.name}!`;
}

window.getPokeData = function() {
  const pokemon = getPokemon();
  const randomPokemon = shuffle(pokemon);
  const pokemonChoices = get4Pokemon(randomPokemon);
  const [ firstPokemon ] = pokemonChoices;
  const image = getPokemonImage(firstPokemon);

  return { 
    pokemonChoices: shuffle(pokemonChoices),
    correct: {
      image,
      name: firstPokemon.name,
    }
  };
};
