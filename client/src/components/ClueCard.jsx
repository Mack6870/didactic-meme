function ClueCard({ number, text, totalClues, isActive, isLocked, isRevealed }) {
  const stars = totalClues - number + 1;
  let className = 'clue-card';
  if (isActive) className += ' clue-card--active';
  if (isLocked) className += ' clue-card--locked';
  if (isRevealed && !isActive) className += ' clue-card--revealed';

  return (
    <div className={className} style={{ animationDelay: `${number * 0.05}s` }}>
      <div className="clue-card__header">
        <span className="clue-card__number">Clue {number + 1}</span>
        <span className="clue-card__stars">
          {'★'.repeat(stars)}
        </span>
      </div>
      <p className="clue-card__text">
        {isLocked ? 'Reveal this clue...' : text}
      </p>
    </div>
  );
}

export default ClueCard;
