import ClueCard from './ClueCard';
import GuessInput from './GuessInput';
import ScoreDisplay from './ScoreDisplay';
import ShareButton from './ShareButton';
import Confetti from './Confetti';
import { useState, useEffect } from 'react';

function GameBoard({ game, stats, onRecordGame, onMarkDaily, mode }) {
  const [showConfetti, setShowConfetti] = useState(false);
  const [lastWrongKey, setLastWrongKey] = useState(0);
  const [countdown, setCountdown] = useState('');

  const isFinished = game.status === 'won' || game.status === 'lost';

  // Confetti for perfect score
  useEffect(() => {
    if (game.status === 'won' && game.score === 5) {
      setShowConfetti(true);
      const t = setTimeout(() => setShowConfetti(false), 3000);
      return () => clearTimeout(t);
    }
  }, [game.status, game.score]);

  // Record game when finished
  useEffect(() => {
    if (isFinished && game.puzzle) {
      onRecordGame(game.score, mode === 'daily');
      if (mode === 'daily') {
        onMarkDaily(game.puzzle.id, game.score, game.currentClue);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFinished]);

  // Countdown to next daily
  useEffect(() => {
    if (mode !== 'daily' || !isFinished) return;
    const tick = () => {
      const now = new Date();
      const tomorrow = new Date(now);
      tomorrow.setDate(tomorrow.getDate() + 1);
      tomorrow.setHours(0, 0, 0, 0);
      const diff = tomorrow - now;
      const h = String(Math.floor(diff / 3600000)).padStart(2, '0');
      const m = String(Math.floor((diff % 3600000) / 60000)).padStart(2, '0');
      const s = String(Math.floor((diff % 60000) / 1000)).padStart(2, '0');
      setCountdown(`${h}:${m}:${s}`);
    };
    tick();
    const interval = setInterval(tick, 1000);
    return () => clearInterval(interval);
  }, [mode, isFinished]);

  const handleGuess = (text) => {
    game.guess(text);
    setLastWrongKey((k) => k + 1);
  };

  if (game.status === 'loading') {
    return <div className="loading">Loading puzzle...</div>;
  }

  if (!game.puzzle) {
    return <div className="loading">No puzzle available</div>;
  }

  return (
    <div>
      {showConfetti && <Confetti />}

      {/* Category badge */}
      <div className="category-badge">
        {getCategoryEmoji(game.puzzle.category)} {game.puzzle.category}
      </div>

      {/* Lives */}
      {!isFinished && (
        <div className="lives">
          {Array.from({ length: game.maxWrong }, (_, i) => (
            <span
              key={i}
              className={i < game.maxWrong - game.wrongGuesses ? '' : 'lives__heart--lost'}
            >
              ❤️
            </span>
          ))}
        </div>
      )}

      {/* Feedback */}
      {game.feedback && !isFinished && (
        <div className={`guess-feedback guess-feedback--${game.feedback.type}`}>
          {game.feedback.message}
        </div>
      )}

      {/* Clue cards */}
      <div>
        {game.puzzle.clues.map((clue, i) => {
          const isRevealed = game.revealedClues.includes(i);
          const isActive = i === game.currentClue && !isFinished;
          const isLocked = !isRevealed && !isFinished;
          // After game ends, show all clues
          const showAll = isFinished;

          return (
            <ClueCard
              key={i}
              number={i}
              text={showAll || isRevealed ? clue : ''}
              totalClues={game.maxClues}
              isActive={isActive}
              isLocked={!showAll && isLocked}
              isRevealed={isRevealed && !isActive}
            />
          );
        })}
      </div>

      {/* Guess input (only during play) */}
      {!isFinished && (
        <GuessInput
          onGuess={handleGuess}
          onSkip={game.skip}
          disabled={false}
          canSkip={game.currentClue < game.maxClues - 1}
          lastWrong={game.feedback?.type === 'wrong' ? lastWrongKey : 0}
        />
      )}

      {/* Results */}
      {isFinished && (
        <div className="results">
          <ScoreDisplay score={game.score} maxScore={game.maxClues} />

          <div className="results__answer">{game.feedback?.message?.replace(/^[✓✗]\s*/, '').replace(/^The answer was:\s*/, '')}</div>
          <div className="results__category">{game.puzzle.category}</div>

          <div className="results__actions">
            <ShareButton
              puzzleNum={game.puzzle.id}
              score={game.score}
              clueIndex={game.currentClue}
              maxClues={game.maxClues}
              mode={mode}
            />
            {mode === 'unlimited' && (
              <button
                className="btn btn--primary"
                onClick={() => game.loadPuzzle([])}
              >
                Next Puzzle →
              </button>
            )}
            {mode === 'daily' && countdown && (
              <div className="countdown">
                <div className="countdown__label">Next puzzle in</div>
                <div className="countdown__time">{countdown}</div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

function getCategoryEmoji(category) {
  const map = {
    Movies: '🎬',
    Science: '🔬',
    Food: '🍽️',
    History: '📜',
    Music: '🎵',
    Geography: '🌍',
    'Pop Culture': '✨',
    Sports: '⚽',
  };
  return map[category] || '🧩';
}

export default GameBoard;
