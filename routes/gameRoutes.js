const express = require('express');
const router = express.Router();
const { startGame, compareSequence } = require('../controllers/gameController');

router.post('/start', startGame);
router.post('/compare', compareSequence);

module.exports = router;
