import songs from './data/songs.json';
import { STATUSES } from './data/songUtils';
import SongCard from './components/SongCard';

const sortedSongs = [...songs].sort((a, b) => (b.addedAt || '').localeCompare(a.addedAt || ''));

export default function App() {
  const masteredCount = songs.filter((s) => s.status === 'mastered').length;
  const practicingCount = songs.filter((s) => s.status === 'practicing').length;

  return (
    <div className="page">
      <header className="hero">
        <div className="staff" aria-hidden="true">
          <p className="hero-eyebrow">Guitar Tab Shelf</p>
          <h1 className="hero-title">我的吉他譜櫃</h1>
        </div>
        <p className="hero-sub">
          收藏 {songs.length} 首 · 練習中 {practicingCount} 首 · 已精通 {masteredCount} 首
        </p>
      </header>

      <main>
        <section className="song-grid" aria-label="歌曲列表">
          {sortedSongs.map((song) => (
            <SongCard key={song.id} song={song} />
          ))}
        </section>
      </main>

      <footer className="site-footer">
        <p>
          進度階段：{Object.values(STATUSES).map((s) => s.label).join(' → ')}
        </p>
      </footer>
    </div>
  );
}
