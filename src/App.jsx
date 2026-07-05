import songs from './data/songs.json';
import { STATUSES } from './data/songUtils';
import SongCard from './components/SongCard';

const sortedSongs = [...songs].sort((a, b) => (b.addedAt || '').localeCompare(a.addedAt || ''));

export default function App() {
  return (
    <div className="page">
      <header className="masthead-mini">
        <h1>曲目一覽</h1>
        <hr className="rule-thin" />
      </header>

      <main>
        <section className="classifieds" aria-label="歌曲列表">
          {sortedSongs.map((song) => (
            <SongCard key={song.id} song={song} />
          ))}
        </section>
      </main>

      <footer className="site-footer">
        <p>進度階段：{Object.values(STATUSES).map((s) => s.label).join(' → ')}</p>
      </footer>
    </div>
  );
}
