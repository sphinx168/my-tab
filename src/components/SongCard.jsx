import DifficultyRating from './DifficultyRating';
import StatusBadge from './StatusBadge';
import SongDetails from './SongDetails';

export default function SongCard({ song, activeMetronomeId, onActivateMetronome, onDeactivateMetronome }) {
  return (
    <article className="card">
      <div className="card-head">
        <h2 className="card-title">{song.title}</h2>
        <StatusBadge status={song.status} />
      </div>

      <p className="card-byline">{song.artist} 演唱</p>

      <DifficultyRating value={song.difficulty} />

      <SongDetails
        song={song}
        activeMetronomeId={activeMetronomeId}
        onActivateMetronome={onActivateMetronome}
        onDeactivateMetronome={onDeactivateMetronome}
      />
    </article>
  );
}
