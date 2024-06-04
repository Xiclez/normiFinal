// Function to return a number within a specified range
function eleccionNumero(inicio, fin) {
    return Math.floor(Math.random() * (fin - inicio + 1)) + inicio;
  }
  
  // Function to get Pokemon info from PokeAPI
  async function _getPokemonInfo(numero) {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${numero}`);
    const data = await response.json();
    return {
      id: data.id,
      name: data.name,
      imageUrl: data.sprites.front_default,
    };
  }
  
  // Function to choose a team of 6 Pokemon
  async function eleccionEquipo(arr) {
    const team = [];
    for (const num of arr) {
      const pokemon = await _getPokemonInfo(num);
      team.push(pokemon);
    }
    return team;
  }
  
  // Function to create a game
  async function crearJuego(team) {
    // Implementation to create a game in the database
  }
  
  // Function to get game info by ID
  async function obtenerInfoJuego(idJuego) {
    // Implementation to get game info from the database
  }
  
  // Function to update the sequence
  async function actualizarSecuencia(idJuego, newPokemonId) {
    // Implementation to update the sequence in the database
  }
  
  module.exports = {
    eleccionNumero,
    _getPokemonInfo,
    eleccionEquipo,
    crearJuego,
    obtenerInfoJuego,
    actualizarSecuencia,
  };
  