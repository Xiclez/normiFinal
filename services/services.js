const {
    numChoice,
    teamChoice,
    createGame,
    getGameInfo,
    updateSequence,
  } = require('../utils/gameLogic');
  
  async function startGame() {
    const teamNumbers = Array.from({ length: 6 }, () => numChoice(1, 386));
    const team = await teamChoice(teamNumbers);
    const game = await createGame(teamNumbers);
    return {
      idJuego: game._id,
      equipoInicial: team
    };
  }
  
  async function comparareSequence(req, res) {
    const { idJuego, pokemons } = req.body;
    try {
      const game = await getGameInfo(idJuego);
  
      const isTrue = pokemons.every((pokemon, index) => pokemon === game.pokemonSequence[index]);
  
      if (isTrue) {
        const startTeam = game.initialTeam;
        const newPokeId = startTeam[numChoice(0, startTeam.length - 1)];
        const updatedGame = await updateSequence(idJuego, newPokeId);
        const fullSequence = await teamChoice(updatedGame.pokemonSequence);
  
        res.json({ 
          resultado: "SEGUIR", 
          pokemonSequence: fullSequence 
        });
      } else {
        res.json({ 
          resultado: "TERMINADO", 
          score: game.pokemonSequence.length 
        });
      }
    } catch (error) {
      res.status(500).json({ error: 'Error while validating sequence: ' + error.message });
    }
  }
  
  module.exports = {
    startGame,
    comparareSequence,
  };
  