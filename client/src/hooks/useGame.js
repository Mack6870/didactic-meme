import { useState, useCallback } from 'react';
import { apiClient } from '../services/apiClient';

const MAX_CLUES = 5;
const MAX_WRONG = 3;

const INITIAL_STATE = {
  puzzle: null,
  currentClue: 0,
  wrongGuesses: 0,
  status: 'loading', // loading | playing | won | lost
  score: 0,
  feedback: null, // { type: 'wrong' | 'correct', message }
  revealedClues: [],
};

export function useGame(mode = 'daily') {
  const [state, setState] = useState(INITIAL_STATE);

  const loadPuzzle = useCallback(async (playedIds = []) => {
    setState({ ...INITIAL_STATE, status: 'loading' });
    try {
      let puzzle;
      if (mode === 'daily') {
        puzzle = await apiClient.get('/puzzle/daily');
      } else {
        const exclude = playedIds.join(',');
        const query = exclude ? `?exclude=${encodeURIComponent(exclude)}` : '';
        puzzle = await apiClient.get(`/puzzle/random${query}`);
      }
      setState({
        ...INITIAL_STATE,
        puzzle,
        status: 'playing',
        revealedClues: [0],
      });
    } catch (err) {
      console.error('Failed to load puzzle:', err);
      setState({ ...INITIAL_STATE, status: 'loading' });
    }
  }, [mode]);

  const guess = useCallback(async (text) => {
    if (state.status !== 'playing' || !state.puzzle) return;

    try {
      const result = await apiClient.post(`/puzzle/${state.puzzle.id}/guess`, {
        guess: text,
      });

      if (result.correct) {
        const score = MAX_CLUES - state.currentClue;
        setState((prev) => ({
          ...prev,
          status: 'won',
          score,
          feedback: { type: 'correct', message: `✓ ${result.answer}` },
        }));
      } else {
        const newWrong = state.wrongGuesses + 1;
        if (newWrong >= MAX_WRONG) {
          // Fetch the answer via reveal endpoint
          let answer = '???';
          try {
            const reveal = await apiClient.get(`/puzzle/${state.puzzle.id}/reveal`);
            answer = reveal.answer;
          } catch {
            // Reveal failed — show fallback
          }
          setState((prev) => ({
            ...prev,
            status: 'lost',
            wrongGuesses: newWrong,
            score: 0,
            feedback: { type: 'wrong', message: `✗ The answer was: ${answer}` },
          }));
        } else {
          setState((prev) => ({
            ...prev,
            wrongGuesses: newWrong,
            feedback: {
              type: 'wrong',
              message: `✗ Wrong! ${MAX_WRONG - newWrong} guess${MAX_WRONG - newWrong === 1 ? '' : 'es'} left`,
            },
          }));
        }
      }
    } catch (err) {
      console.error('Guess failed:', err);
    }
  }, [state.status, state.puzzle, state.currentClue, state.wrongGuesses]);

  const skip = useCallback(() => {
    if (state.status !== 'playing') return;
    const nextClue = state.currentClue + 1;
    if (nextClue >= MAX_CLUES) {
      // No more clues to reveal — force last clue state
      setState((prev) => ({
        ...prev,
        currentClue: MAX_CLUES - 1,
        feedback: null,
      }));
      return;
    }
    setState((prev) => ({
      ...prev,
      currentClue: nextClue,
      revealedClues: [...prev.revealedClues, nextClue],
      feedback: null,
    }));
  }, [state.status, state.currentClue]);

  const clearFeedback = useCallback(() => {
    setState((prev) => ({ ...prev, feedback: null }));
  }, []);

  return {
    ...state,
    maxClues: MAX_CLUES,
    maxWrong: MAX_WRONG,
    loadPuzzle,
    guess,
    skip,
    clearFeedback,
  };
}
