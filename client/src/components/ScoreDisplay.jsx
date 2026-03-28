function ScoreDisplay({ score, maxScore }) {
  const labels = {
    5: 'Incredible!',
    4: 'Amazing!',
    3: 'Great job!',
    2: 'Nice work!',
    1: 'Just made it!',
    0: 'Better luck next time!',
  };

  return (
    <div className="score-display">
      <div className="score-display__stars">
        {Array.from({ length: maxScore }, (_, i) => (
          <span
            key={i}
            className={`score-display__star ${
              i < score ? 'score-display__star--earned' : 'score-display__star--empty'
            }`}
            style={{ animationDelay: `${i * 0.15}s` }}
          >
            ★
          </span>
        ))}
      </div>
      <div className="score-display__label">{labels[score] || ''}</div>
      <div className="score-display__sublabel">
        {score > 0
          ? `You got it on clue ${maxScore - score + 1} of ${maxScore}`
          : 'You ran out of guesses'}
      </div>
    </div>
  );
}

export default ScoreDisplay;
