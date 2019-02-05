document.addEventListener('DOMContentLoaded', () => {
  // console.log(POKEMON[0].sprites.front)
  let pokeContainer = document.getElementById('pokemon-container')
  let searchForm = document.getElementById('pokemon-search-form')
  let allPokes = []

  fetch('http://localhost:3000/pokemon')
  .then(r => r.json())
  .then(pokemons => {
    allPokes = pokemons
    pokeContainer.innerHTML = renderAllPokemon(allPokes)
  })

  searchForm.addEventListener('input', (e) => {
    e.preventDefault()
    const input = e.target.value
    const filteredPoke = allPokes.filter((pokemonObj) => {
      return pokemonObj.name.includes(input.toLowerCase())
    })
    pokeContainer.innerHTML = renderAllPokemon(filteredPoke)
  })

  pokeContainer.addEventListener('click', (e) => {
    if(e.target.tagName === "IMG"){
      // console.log(e.target.dataset.id);
      const pokeClicked = allPokes.find((pokemonObj) => {
        return pokemonObj.id == e.target.dataset.id
      })
      e.target.src = (e.target.src === pokeClicked.sprites.front ? pokeClicked.sprites.back : pokeClicked.sprites.front)
    } // end of if tagname = IMG
  })//end of click listener for toggling

  const renderAllPokemon = pokeArray => {
    return pokeArray.map((pokemon) => pokeHTML(pokemon)).join('')
  } //take in an array of pokemon and map them so they return HTML now

  function pokeHTML(pokemon){
    return `
    <div class="pokemon-card">
  <div class="pokemon-frame">
    <h1 class="center-text">${pokemon.name}</h1>
    <div class="pokemon-image">
      <img data-id="${pokemon.id}" data-action="flip" class="toggle-sprite" src="${pokemon.sprites.front}">
    </div>
  </div>
</div>
    `
  } // creating HTML for a passed in pokemon

})//end of the DOM
