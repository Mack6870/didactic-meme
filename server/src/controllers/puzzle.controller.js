const puzzleService = require('../services/puzzle.service');

exports.getDaily = async (req, res, next) => {
  try {
    const puzzle = await puzzleService.getDaily();
    res.json(puzzle);
  } catch (err) {
    next(err);
  }
};

exports.getRandom = async (req, res, next) => {
  try {
    const excludeIds = req.query.exclude ? req.query.exclude.split(',') : [];
    const puzzle = await puzzleService.getRandom(excludeIds);
    res.json(puzzle);
  } catch (err) {
    next(err);
  }
};

exports.checkGuess = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { guess } = req.body;
    if (!guess || typeof guess !== 'string') {
      return res.status(400).json({ error: 'Guess is required' });
    }
    const result = await puzzleService.checkGuess(id, guess.trim());
    if (!result) {
      return res.status(404).json({ error: 'Puzzle not found' });
    }
    res.json(result);
  } catch (err) {
    next(err);
  }
};

exports.getReveal = async (req, res, next) => {
  try {
    const { id } = req.params;
    const puzzle = await puzzleService.getReveal(id);
    if (!puzzle) {
      return res.status(404).json({ error: 'Puzzle not found' });
    }
    res.json(puzzle);
  } catch (err) {
    next(err);
  }
};
