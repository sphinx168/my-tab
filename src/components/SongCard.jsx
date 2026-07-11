import StarRating from './StarRating';
import StatusBadge from './StatusBadge';
import ProgressIndicator from './ProgressIndicator';
import SongDetails from './SongDetails';

export default function SongCard({ song, activeMetronomeId, onActivateMetronome, onDeactivateMetronome }) {
  return (
    <article className="ad">
      <div>
        <div className="ad-photo" aria-hidden="true">
          <svg width="46" height="46" viewBox="0 0 24 24">
            <path
              d="M9 3.5a1 1 0 0 1 1-1h9.5a1 1 0 0 1 1 1v13.2a3.3 3.3 0 1 1-2-3V7.5H11v9.2a3.3 3.3 0 1 1-2-3Z"
              fill="#1c1a16"
            />
          </svg>
        </div>
        <p className="ad-caption">〈{song.title}〉練習手稿</p>
      </div>

      <div>
        <div className="ad-head">
          <h2 className="ad-title">{song.title}</h2>
          <StatusBadge status={song.status} />
        </div>
        <p className="ad-byline">
          {song.artist} 演唱{song.tabAuthor && ` · ${song.tabAuthor} 採譜`}
        </p>

        <p className="ad-rating-line">
          <StarRating value={song.difficulty} />
          {song.bpm > 0 && <span className="ad-bpm">　·　每分鐘 {song.bpm} 拍</span>}
        </p>

        <ProgressIndicator progress={song.progress} />

        <SongDetails
          song={song}
          activeMetronomeId={activeMetronomeId}
          onActivateMetronome={onActivateMetronome}
          onDeactivateMetronome={onDeactivateMetronome}
        />

        {song.addedAt && <p className="ad-date">刊登日期：{song.addedAt}</p>}
      </div>
    </article>
  );
}
