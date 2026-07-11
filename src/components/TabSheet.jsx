export default function TabSheet({ sheet }) {
  const images = sheet?.images || [];
  const text = sheet?.text || '';

  if (images.length === 0 && !text) return null;

  return (
    <details className="tab-sheet">
      <summary>查看六線譜／和弦</summary>

      {images.length > 0 && (
        <div className="tab-sheet-images">
          {images.map((src) => (
            <a key={src} href={src} target="_blank" rel="noreferrer">
              <img src={src} alt="譜面掃描" className="tab-sheet-image" loading="lazy" />
            </a>
          ))}
        </div>
      )}

      {text && <pre className="tab-sheet-text">{text}</pre>}
    </details>
  );
}
