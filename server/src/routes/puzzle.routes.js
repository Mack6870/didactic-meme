const express = require('express');
const router = express.Router();
const puzzleController = require('../controllers/puzzle.controller');

router.get('/daily', puzzleController.getDaily);
router.get('/random', puzzleController.getRandom);
router.post('/:id/guess', puzzleController.checkGuess);
router.get('/:id/reveal', puzzleController.getReveal);

module.exports = router;
