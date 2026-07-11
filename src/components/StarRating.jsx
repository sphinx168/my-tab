export default function StarRating({ value }) {
  if (!value) {
    return <span className="ad-rating ad-rating-unrated">難度未評</span>;
  }
  const stars = '★'.repeat(value) + '☆'.repeat(5 - value);
  return (
    <span className="ad-rating" role="img" aria-label={`難度 ${value} / 5`}>
      {stars}
    </span>
  );
}
