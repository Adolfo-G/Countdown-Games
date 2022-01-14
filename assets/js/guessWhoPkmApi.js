let gameData;
const main = document.querySelector('main');
const pokemonImage = document.querySelector('#pokemon-image');
const textOverlay = document.querySelector('#text-overlay');
const choices = document.querySelector('#choices');
const playBtn = document.querySelector('#play');
playBtn.addEventListener('click', fetchData);
addAnswerHandler();

function addAnswerHandler() {
    choices.addEventListener('click', function(e) {
      const name = e.target.dataset;
      console.log("name", name)
      const resultClass = (name === gameData.correct.name) ?
        'correct' : 'incorrect';
  
      e.target.classList.add(resultClass);
      revealPokemon();
    });
  }

// function addAnswerHandler(){
//     choices.addEventListener("click", )
// }

function fetchData() {
    resetImage();
    gameData = window.getPokeData();
    showSilhouette();
    displayChoices();
  }

function getPokemon() {
    const res = fetch('https://pokeapi.co/api/v2/pokemon?limit=151');
    const pokemon = res.json();
    return pokemon.results;
  }

function resetImage() {
    pokemonImage.src = 'data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs%3D';
    main.classList.add('fetching');
    main.classList.remove('revealed');
}

function showSilhouette() {
    main.classList.remove('fetching');
    pokemonImage.src = gameData.correct.image;
}

function displayChoices() {
    const pokemonChoices = gameData;
    const choicesHTML = pokemonChoices.map(({ name }) => {
      return `<button data-name="${name}">${name}</button>`;
    }).join('');
  
    choices.innerHTML = choicesHTML;
  }