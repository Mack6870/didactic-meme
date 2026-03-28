function Header({ onShowHowToPlay, onShowStats }) {
  return (
    <header className="header">
      <div className="header__logo">Hintle</div>
      <div className="header__actions">
        <button
          className="header__btn"
          onClick={onShowHowToPlay}
          aria-label="How to play"
          title="How to play"
        >
          ?
        </button>
        <button
          className="header__btn"
          onClick={onShowStats}
          aria-label="Statistics"
          title="Statistics"
        >
          📊
        </button>
      </div>
    </header>
  );
}

export default Header;
