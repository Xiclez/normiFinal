const express = require('express');
const router = express.Router();
const { start, compare } = require('../controllers/gameController');

router.get('/start', start);
router.post('/compare', compare);

module.exports = router;
