import { useState } from 'react';

function ShareButton({ puzzleNum, score, clueIndex, maxClues, mode }) {
  const [copied, setCopied] = useState(false);

  const handleShare = async () => {
    const stars = '⭐'.repeat(score) + '☆'.repeat(maxClues - score);
    const clueText = score > 0 ? `Clue ${clueIndex + 1}/${maxClues}` : `X/${maxClues}`;
    const modeLabel = mode === 'daily' ? `#${puzzleNum}` : 'Practice';
    const text = `Hintle ${modeLabel} ${stars}\n${clueText}\nhttps://hintle.game`;

    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback: select a hidden textarea
      const el = document.createElement('textarea');
      el.value = text;
      el.setAttribute('readonly', '');
      el.style.position = 'absolute';
      el.style.left = '-9999px';
      document.body.appendChild(el);
      el.select();
      document.execCommand('copy');
      document.body.removeChild(el);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <button className="btn btn--share" onClick={handleShare} type="button">
      {copied ? '✓ Copied!' : '📋 Share Result'}
    </button>
  );
}

export default ShareButton;
