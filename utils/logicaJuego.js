const Game = require('../models/gameModel');
const axios = require('axios');

// Function to return a number within a specified range
function numChoice(inicio, fin) {
    if (fin < inicio) {
      throw new Error('Invalid Range');
    }
    return Math.floor(Math.random() * (fin - inicio + 1)) + inicio;
  }
  

// Function to get Pokemon info from PokeAPI
async function _getPokemonInfo(id) {
  const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
  return {
    identificador: response.data.id,
    nombre: response.data.name,
    imagenUrl: response.data.sprites.front_default,
  };
}

// Function to choose a team of 6 Pokemon
async function teamChoice(arr) {
  const team = [];
  for (const num of arr) {
    const pokemon = await _getPokemonInfo(num);
    team.push(pokemon);
  }
  return team;
}

// Function to create a game
async function createGame(team) {
    const newGame = new Game({ initialTeam: team, pokemonSequence: [] });
    await newGame.save();
    return newGame; 
}

// Function to get game info by ID
async function getGameInfo(gameId) {
const game = await Game.findById(gameId);
if(!game){
    throw new Error('Game not found');
}
return game;
}

// Function to update the sequence
async function updateSequence(gameId, newPokemonId) {
    const game = await Game.findByIdAndUpdate(
        gameId,
        { $push: { pokemonSequence: newPokemonId } },
        { new: true }
    );
    if (!game) {
        throw new Error('Game not found');
    }
    return game;}

module.exports = {
  numChoice,
  _getPokemonInfo,
  teamChoice,
  createGame,
  getGameInfo,
  updateSequence,
};
