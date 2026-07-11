export default function DifficultyRating({ value }) {
  if (!value) {
    return <span className="difficulty-unrated">難度未評</span>;
  }
  return (
    <span className="difficulty-dots" role="img" aria-label={`難度 ${value} / 5`}>
      {Array.from({ length: 5 }, (_, index) => (
        <span key={index} className={`difficulty-dot${index < value ? ' is-filled' : ''}`} aria-hidden="true" />
      ))}
    </span>
  );
}
