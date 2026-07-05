function Star({ filled }) {
  return (
    <svg viewBox="0 0 20 20" width="15" height="15" aria-hidden="true">
      <path
        d="M10 1.8 12.5 7l5.7.6-4.3 3.9 1.2 5.6L10 14.2 4.9 17.1l1.2-5.6-4.3-3.9L7.5 7Z"
        fill={filled ? 'var(--brass)' : 'none'}
        stroke="var(--brass)"
        strokeWidth="1.4"
        strokeLinejoin="round"
        opacity={filled ? 1 : 0.45}
      />
    </svg>
  );
}

export default function StarRating({ value }) {
  if (!value) {
    return <span className="stars stars-unrated">難度未評</span>;
  }
  return (
    <span className="stars" role="img" aria-label={`難度 ${value} / 5`}>
      {[1, 2, 3, 4, 5].map((n) => (
        <Star key={n} filled={n <= value} />
      ))}
    </span>
  );
}
