function HowToPlay({ onClose }) {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal__header">
          <h2 className="modal__title">How to Play</h2>
          <button className="modal__close" onClick={onClose} aria-label="Close">
            ×
          </button>
        </div>

        <div className="how-to-play__step">
          <div className="how-to-play__icon">🔍</div>
          <div className="how-to-play__text">
            <h3>Read the Clues</h3>
            <p>
              Each puzzle has 5 clues, revealed one at a time. Clue 1 is the
              vaguest — clue 5 is the most obvious.
            </p>
          </div>
        </div>

        <div className="how-to-play__step">
          <div className="how-to-play__icon">💡</div>
          <div className="how-to-play__text">
            <h3>Make Your Guess</h3>
            <p>
              After each clue, type your guess or skip to reveal the next clue.
              You have 3 wrong guesses before the game ends.
            </p>
          </div>
        </div>

        <div className="how-to-play__step">
          <div className="how-to-play__icon">⭐</div>
          <div className="how-to-play__text">
            <h3>Earn Stars</h3>
            <p>
              The fewer clues you need, the more stars you earn! Guess on clue 1
              for 5 stars, clue 2 for 4 stars, and so on.
            </p>
          </div>
        </div>

        <div className="how-to-play__step">
          <div className="how-to-play__icon">📋</div>
          <div className="how-to-play__text">
            <h3>Share Your Score</h3>
            <p>
              After each game, share your star rating with friends. Everyone
              gets the same daily puzzle!
            </p>
          </div>
        </div>

        <button className="btn btn--primary" onClick={onClose} style={{ width: '100%' }}>
          Got it!
        </button>
      </div>
    </div>
  );
}

export default HowToPlay;
