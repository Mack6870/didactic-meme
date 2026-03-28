function StatsModal({ stats, onClose }) {
  const maxCount = Math.max(...Object.values(stats.starDistribution), 1);

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal__header">
          <h2 className="modal__title">Statistics</h2>
          <button className="modal__close" onClick={onClose} aria-label="Close">
            ×
          </button>
        </div>

        <div className="stats-grid">
          <div className="stats-grid__item">
            <div className="stats-grid__value">{stats.gamesPlayed}</div>
            <div className="stats-grid__label">Played</div>
          </div>
          <div className="stats-grid__item">
            <div className="stats-grid__value">
              {stats.gamesPlayed > 0
                ? Math.round((stats.gamesWon / stats.gamesPlayed) * 100)
                : 0}
              %
            </div>
            <div className="stats-grid__label">Win %</div>
          </div>
          <div className="stats-grid__item">
            <div className="stats-grid__value">{stats.currentStreak}</div>
            <div className="stats-grid__label">Streak</div>
          </div>
          <div className="stats-grid__item">
            <div className="stats-grid__value">{stats.maxStreak}</div>
            <div className="stats-grid__label">Best</div>
          </div>
        </div>

        <div className="star-dist">
          <div className="star-dist__title">Star Distribution</div>
          {[5, 4, 3, 2, 1, 0].map((star) => {
            const count = stats.starDistribution[star] || 0;
            const pct = maxCount > 0 ? (count / maxCount) * 100 : 0;
            return (
              <div className="star-dist__row" key={star}>
                <span className="star-dist__label">
                  {star > 0 ? `${star}★` : '0'}
                </span>
                <div className="star-dist__bar">
                  <div
                    className="star-dist__fill"
                    style={{ width: `${Math.max(pct, count > 0 ? 8 : 0)}%` }}
                  >
                    {count > 0 ? count : ''}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <button className="btn btn--secondary" onClick={onClose} style={{ width: '100%' }}>
          Close
        </button>
      </div>
    </div>
  );
}

export default StatsModal;
