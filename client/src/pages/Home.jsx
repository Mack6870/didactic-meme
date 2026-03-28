import { useState, useEffect, useCallback } from 'react';
import Header from '../components/Header';
import GameBoard from '../components/GameBoard';
import HowToPlay from '../components/HowToPlay';
import StatsModal from '../components/StatsModal';
import { useGame } from '../hooks/useGame';
import { useStats } from '../hooks/useStats';

function Home() {
  const [mode, setMode] = useState('daily');
  const [showHowToPlay, setShowHowToPlay] = useState(false);
  const [showStats, setShowStats] = useState(false);

  const game = useGame(mode);
  const { stats, recordGame, hasDailyBeenPlayed, markDailyPlayed, getDailyResult } = useStats();

  // Show how-to-play on first visit
  useEffect(() => {
    const seen = localStorage.getItem('hintle_seen_tutorial');
    if (!seen) {
      setShowHowToPlay(true);
      localStorage.setItem('hintle_seen_tutorial', '1');
    }
  }, []);

  // Load puzzle when mode changes
  useEffect(() => {
    if (mode === 'daily') {
      // If already played today, we still load but will show results
      game.loadPuzzle();
    } else {
      game.loadPuzzle([]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mode]);

  const handleModeSwitch = useCallback((newMode) => {
    if (newMode !== mode) {
      setMode(newMode);
    }
  }, [mode]);

  return (
    <>
      <Header
        onShowHowToPlay={() => setShowHowToPlay(true)}
        onShowStats={() => setShowStats(true)}
      />

      {/* Mode toggle */}
      <div className="mode-toggle">
        <button
          className={`mode-toggle__btn ${mode === 'daily' ? 'mode-toggle__btn--active' : ''}`}
          onClick={() => handleModeSwitch('daily')}
        >
          Daily
        </button>
        <button
          className={`mode-toggle__btn ${mode === 'unlimited' ? 'mode-toggle__btn--active' : ''}`}
          onClick={() => handleModeSwitch('unlimited')}
        >
          Unlimited
        </button>
      </div>

      {/* Game board */}
      <GameBoard
        game={game}
        stats={stats}
        onRecordGame={recordGame}
        onMarkDaily={markDailyPlayed}
        mode={mode}
      />

      {/* Modals */}
      {showHowToPlay && <HowToPlay onClose={() => setShowHowToPlay(false)} />}
      {showStats && <StatsModal stats={stats} onClose={() => setShowStats(false)} />}
    </>
  );
}

export default Home;
