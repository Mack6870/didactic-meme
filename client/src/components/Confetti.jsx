function Confetti() {
  const colors = ['#7C5CFC', '#6BCB77', '#F4A261', '#E76F51', '#FF6B9D', '#45B7D1'];
  const pieces = Array.from({ length: 40 }, (_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`,
    delay: `${Math.random() * 1.5}s`,
    color: colors[i % colors.length],
    rotation: Math.random() * 360,
    size: 6 + Math.random() * 8,
  }));

  return (
    <div className="confetti">
      {pieces.map((p) => (
        <div
          key={p.id}
          className="confetti__piece"
          style={{
            left: p.left,
            backgroundColor: p.color,
            width: `${p.size}px`,
            height: `${p.size}px`,
            animationDelay: p.delay,
            transform: `rotate(${p.rotation}deg)`,
          }}
        />
      ))}
    </div>
  );
}

export default Confetti;
