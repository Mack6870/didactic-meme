import { useState, useRef, useEffect } from 'react';

function GuessInput({ onGuess, onSkip, disabled, canSkip, lastWrong }) {
  const [value, setValue] = useState('');
  const [shaking, setShaking] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    if (lastWrong) {
      setShaking(true);
      const t = setTimeout(() => setShaking(false), 500);
      return () => clearTimeout(t);
    }
  }, [lastWrong]);

  useEffect(() => {
    if (!disabled && inputRef.current) {
      inputRef.current.focus();
    }
  }, [disabled]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmed = value.trim();
    if (!trimmed || disabled) return;
    onGuess(trimmed);
    setValue('');
  };

  return (
    <div>
      <form className="guess-input" onSubmit={handleSubmit}>
        <input
          ref={inputRef}
          className={`guess-input__field${shaking ? ' guess-input__field--error' : ''}`}
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Type your guess..."
          disabled={disabled}
          autoComplete="off"
          maxLength={100}
        />
        <button
          className="guess-input__btn"
          type="submit"
          disabled={disabled || !value.trim()}
        >
          Guess
        </button>
      </form>
      {canSkip && (
        <button
          className="guess-input__skip"
          onClick={onSkip}
          disabled={disabled}
          type="button"
        >
          Skip → reveal next clue
        </button>
      )}
    </div>
  );
}

export default GuessInput;
