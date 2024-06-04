const Game = require('../models/gameModel');
const { iniciarJuego, compararSecuencia } = require('../services/servicios');

const startGame = async (req, res) => {
    try {
        const gameData = await iniciarJuego();
        res.status(201).json(gameData);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const compareSequence = async (req, res) => {
    const { ids, idJuego } = req.body;
    try {
        const result = await compararSecuencia(ids, idJuego);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    startGame,
    compareSequence
};
