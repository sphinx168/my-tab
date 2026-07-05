import StarRating from './StarRating';
import StatusBadge from './StatusBadge';
import LinkIcon from './LinkIcon';

export default function SongCard({ song }) {
  return (
    <article className="song-card">
      <div className="card-top">
        <StatusBadge status={song.status} />
        <StarRating value={song.difficulty} />
      </div>

      <h2 className="song-title">{song.title}</h2>
      <p className="song-artist">{song.artist}</p>
      <p className="song-tab-author">
        <span className="eyebrow">採譜</span>
        {song.tabAuthor}
      </p>

      {song.links?.length > 0 && (
        <div className="song-links">
          {song.links.map((link) => (
            <LinkIcon key={link.url} link={link} />
          ))}
        </div>
      )}

      {song.notes && <p className="song-notes">{song.notes}</p>}

      {song.addedAt && <p className="song-date">收錄於 {song.addedAt}</p>}
    </article>
  );
}
