const pokemonName = document.querySelector('.pokemon__name');
const pokemonNumber = document.querySelector('.pokemon__number');
const pokemonImage = document.querySelector('.pokemon__image');

const form = document.querySelector('.form');
const input = document.querySelector('.input__search');
const buttonPrev = document.querySelector('.btn-prev');
const buttonNext = document.querySelector('.btn-next');

let searchPokemon = 1;

const fetchPokemon =  async(pokemon) => {  /* o asyn é p/ deixar assincrona e assim poder utilizar o await */
    const APIResponse =  await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`); /* o await é pra esperar o fecth concluir e da uma resposta p/ gnt */
    
    if(APIResponse.status === 200) {
        const data = await APIResponse.json();
        return data;
    }
}
const renderPokemon =  async (pokemon) => {

    pokemonName.innerHTML = 'Carregando...';
    pokemonNumber.innerHTML = '';

    const data = await fetchPokemon(pokemon);

    if(data) {
        pokemonImage.style.display = 'block';
        pokemonName.innerHTML = data.name; /* ele vai renderizar o nome do pokemnon */
        pokemonNumber.innerHTML = data.id; /* ele vai receber o numero do pokemon */
        pokemonImage.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default']; /* ele vai receber a imagem do pokemon da API */
        input.value = '';
        searchPokemon = data.id;
    } else {
        pokemonImage.style.display = 'none';
        pokemonName.innerHTML = 'Não encontrado :(';
        pokemonNumber.innerHTML = '';
    }
}

form.addEventListener('submit', (event) => {
    event.preventDefault();
    renderPokemon(input.value.toLowerCase());

});

buttonPrev.addEventListener('click', () => {
   if(searchPokemon > 1) {
    searchPokemon -= 1;
    renderPokemon(searchPokemon);
   }
});
buttonNext.addEventListener('click', () => {
   searchPokemon += 1;
   renderPokemon(searchPokemon);
});

renderPokemon(searchPokemon);


