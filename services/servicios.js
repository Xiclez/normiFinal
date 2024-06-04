const {
    eleccionNumero,
    _getPokemonInfo,
    eleccionEquipo,
    crearJuego,
    obtenerInfoJuego,
    actualizarSecuencia,
  } = require('../utils/logicaJuego');
  
  // Function to start a game
  async function iniciarJuego() {
    const teamNumbers = Array.from({ length: 6 }, () => eleccionNumero(1, 386));
    const team = await eleccionEquipo(teamNumbers);
    const game = await crearJuego(teamNumbers);
    return {
      idJuego: game.id,
      equipoInicial: team,
    };
  }
  
  // Function to compare sequences
  async function compararSecuencia(ids, idJuego) {
    const gameInfo = await obtenerInfoJuego(idJuego);
    // Implementation to compare sequences and return the result
  }
  
  module.exports = {
    iniciarJuego,
    compararSecuencia,
  };
  