var rightAnswer = false;
var currentID = 0;
var randomIDList = shuffle(1, 10);
var $pokemonImg = document.querySelector('.pokemon-img');
var $answerBox = document.querySelector('.answer-input');
var $skipButton = document.querySelector('.button-skip');

addEventListener('load', getPokemon);
$answerBox.addEventListener('keydown', getNextPokemon);
$skipButton.addEventListener('click', skipPokemon);

function getPokemon() {
  var pokemonName = null;
  var xhr = new XMLHttpRequest();
  xhr.open('GET', 'https://pokeapi.co/api/v2/pokemon/' + randomIDList[currentID]);
  xhr.responseType = 'json';
  xhr.addEventListener('load', function () {
    if (xhr.status !== 200) {
    console.log('INVALID POKEMON ID')
    }

    $pokemonImg.setAttribute('src', xhr.response.sprites.front_default);

    pokemonName = xhr.response.species.name;
    if (pokemonName === 'nidoran-f' || pokemonName === 'nidoran-m') {
      pokemonName = 'nidoran';
    }
    console.log(pokemonName);

    $answerBox.addEventListener('input', function (event) {
      var guess = event.target.value;
      guess = guess.toLowerCase();
      console.log(guess);
      console.log(pokemonName);
      //why does it save the data that I input before.

      if (guess === pokemonName) {
        rightAnswer = true;
        $answerBox.className = 'answer-input right';
        pokemonName = null;
      }
    });

  });
  xhr.send();
}

function getNextPokemon(event) {
  if (rightAnswer && event.key === 'Enter') {
    currentID++;
    getPokemon();
    rightAnswer = false;
    event.target.value = null;
    $answerBox.className = 'answer-input';
  }
}

function shuffle(min, max) {
  var array = [];
  for (min; min <= max; min++) {
    array.push(min);
  }
  var i = array.length;
  var randomVal = 0;
  var hold;

  while (i--) {
    randomVal = Math.floor(Math.random() * (i + 1));

    hold = array[i];
    array[i] = array[randomVal];
    array[randomVal] = hold;
  }
  return array;
}

function skipPokemon() {
  var switchID = randomIDList.splice(currentID, 1);
  randomIDList.push(switchID[0]);
  getPokemon();
}
