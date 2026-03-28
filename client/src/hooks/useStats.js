import { useState, useCallback } from 'react';

const STORAGE_KEY = 'hintle_stats';
const DAILY_KEY = 'hintle_daily';

const DEFAULT_STATS = {
  gamesPlayed: 0,
  gamesWon: 0,
  currentStreak: 0,
  maxStreak: 0,
  starDistribution: { 0: 0, 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 },
  lastPlayedDate: null,
};

function loadStats() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      return { ...DEFAULT_STATS, ...parsed };
    }
  } catch {
    // Corrupted data
  }
  return { ...DEFAULT_STATS };
}

function saveStats(stats) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(stats));
  } catch {
    // Storage full or unavailable
  }
}

export function useStats() {
  const [stats, setStats] = useState(loadStats);

  const recordGame = useCallback((score, isDaily = true) => {
    setStats((prev) => {
      const today = new Date().toISOString().slice(0, 10);
      const won = score > 0;
      const newStreak = won ? prev.currentStreak + 1 : 0;

      const next = {
        ...prev,
        gamesPlayed: prev.gamesPlayed + 1,
        gamesWon: prev.gamesWon + (won ? 1 : 0),
        currentStreak: newStreak,
        maxStreak: Math.max(prev.maxStreak, newStreak),
        starDistribution: {
          ...prev.starDistribution,
          [score]: (prev.starDistribution[score] || 0) + 1,
        },
        lastPlayedDate: isDaily ? today : prev.lastPlayedDate,
      };

      saveStats(next);
      return next;
    });
  }, []);

  const hasDailyBeenPlayed = useCallback(() => {
    try {
      const raw = localStorage.getItem(DAILY_KEY);
      if (!raw) return false;
      const data = JSON.parse(raw);
      const today = new Date().toISOString().slice(0, 10);
      return data.date === today;
    } catch {
      return false;
    }
  }, []);

  const markDailyPlayed = useCallback((puzzleId, score, clueIndex) => {
    try {
      const today = new Date().toISOString().slice(0, 10);
      localStorage.setItem(
        DAILY_KEY,
        JSON.stringify({ date: today, puzzleId, score, clueIndex })
      );
    } catch {
      // Storage full
    }
  }, []);

  const getDailyResult = useCallback(() => {
    try {
      const raw = localStorage.getItem(DAILY_KEY);
      if (!raw) return null;
      const data = JSON.parse(raw);
      const today = new Date().toISOString().slice(0, 10);
      if (data.date !== today) return null;
      return data;
    } catch {
      return null;
    }
  }, []);

  return { stats, recordGame, hasDailyBeenPlayed, markDailyPlayed, getDailyResult };
}
