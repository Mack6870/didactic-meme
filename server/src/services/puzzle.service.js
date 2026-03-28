const puzzles = require('../data/puzzles');

/**
 * Get today's daily puzzle (clues only, no answer).
 */
exports.getDaily = async () => {
  const today = new Date().toISOString().slice(0, 10);
  const puzzle = puzzles.find((p) => p.date === today);
  if (!puzzle) {
    // Fallback: cycle through daily puzzles by day-of-year
    const dailyPuzzles = puzzles.filter((p) => p.date !== null);
    const dayOfYear = Math.floor(
      (Date.now() - new Date(new Date().getFullYear(), 0, 0)) / 86400000
    );
    const index = dayOfYear % dailyPuzzles.length;
    return sanitize(dailyPuzzles[index]);
  }
  return sanitize(puzzle);
};

/**
 * Get a random puzzle from the unlimited pool.
 * Accepts an optional array of IDs to exclude (already played).
 */
exports.getRandom = async (excludeIds = []) => {
  const pool = puzzles.filter(
    (p) => p.date === null && !excludeIds.includes(p.id)
  );
  if (pool.length === 0) {
    // If all unlimited puzzles are exhausted, reset
    const allUnlimited = puzzles.filter((p) => p.date === null);
    const pick = allUnlimited[Math.floor(Math.random() * allUnlimited.length)];
    return sanitize(pick);
  }
  const pick = pool[Math.floor(Math.random() * pool.length)];
  return sanitize(pick);
};

/**
 * Check a guess against a puzzle's answer.
 * Returns { correct, answer (only if correct or out of guesses) }
 */
exports.checkGuess = async (puzzleId, guess) => {
  const puzzle = puzzles.find((p) => p.id === puzzleId);
  if (!puzzle) return null;

  const normalize = (s) => s.toLowerCase().replace(/[^a-z0-9]/g, '');
  const correct = normalize(guess) === normalize(puzzle.answer);

  return {
    correct,
    // Only reveal the answer if the guess is correct
    answer: correct ? puzzle.answer : undefined,
  };
};

/**
 * Get the full puzzle with answer (for post-game reveal).
 */
exports.getReveal = async (puzzleId) => {
  const puzzle = puzzles.find((p) => p.id === puzzleId);
  if (!puzzle) return null;
  return {
    id: puzzle.id,
    answer: puzzle.answer,
    category: puzzle.category,
    difficulty: puzzle.difficulty,
    clues: puzzle.clues,
  };
};

/**
 * Strip answer from puzzle before sending to client.
 */
function sanitize(puzzle) {
  return {
    id: puzzle.id,
    category: puzzle.category,
    difficulty: puzzle.difficulty,
    clues: puzzle.clues,
    date: puzzle.date,
  };
}
