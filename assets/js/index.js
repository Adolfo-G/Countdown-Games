let gameData;
const main = document.querySelector('main');
const pokemonImage = document.querySelector('#pokemon-image');
const textOverlay = document.querySelector('#text-overlay');
const choices = document.querySelector('#choices');
const playBtn = document.querySelector('#play');
playBtn.addEventListener('click', fetchData);
addAnswerHandler();


async function fetchData() {
  resetImage();
  gameData = await window.getPokeData();
  showSilhouette();
  displayChoices();
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