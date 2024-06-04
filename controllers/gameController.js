const { startGame, comparareSequence } = require('../services/servicios');

const start = async (req, res) => {
  try {
    const gameData = await startGame();
    res.status(201).json(gameData);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const compare = async (req, res) => {
    try{
       const sequenceData = await comparareSequence(req, res);
       res.status(201).json(sequenceData);
    }catch (error){
        res.status(500).json({ message: error.message });
  
    }
 
};

module.exports = {
  start,
  compare,
};
