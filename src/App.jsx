import { useMemo, useState } from 'react';
import songs from './data/songs.json';
import { STATUSES } from './data/songUtils';
import FilterBar from './components/FilterBar';
import SongCard from './components/SongCard';

const SORTS = {
  newest: {
    label: '最新收錄',
    fn: (a, b) => (b.addedAt || '').localeCompare(a.addedAt || ''),
  },
  'difficulty-desc': {
    label: '難度 高→低',
    fn: (a, b) => b.difficulty - a.difficulty,
  },
  'difficulty-asc': {
    label: '難度 低→高',
    fn: (a, b) => a.difficulty - b.difficulty,
  },
  title: {
    label: '曲名',
    fn: (a, b) => a.title.localeCompare(b.title, 'zh-Hant'),
  },
};

const DEFAULT_FILTERS = { query: '', status: 'all', difficulty: 0, sort: 'newest' };

export default function App() {
  const [filters, setFilters] = useState(DEFAULT_FILTERS);

  const statusCounts = useMemo(() => {
    const counts = { all: songs.length };
    for (const song of songs) {
      counts[song.status] = (counts[song.status] || 0) + 1;
    }
    return counts;
  }, []);

  const visibleSongs = useMemo(() => {
    const query = filters.query.trim().toLowerCase();
    return songs
      .filter((song) => {
        if (filters.status !== 'all' && song.status !== filters.status) return false;
        if (filters.difficulty !== 0 && song.difficulty !== filters.difficulty) return false;
        if (query) {
          const haystack = `${song.title} ${song.artist} ${song.tabAuthor}`.toLowerCase();
          if (!haystack.includes(query)) return false;
        }
        return true;
      })
      .sort(SORTS[filters.sort].fn);
  }, [filters]);

  const masteredCount = statusCounts.mastered || 0;
  const practicingCount = statusCounts.practicing || 0;

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
        <FilterBar
          filters={filters}
          onChange={setFilters}
          statusCounts={statusCounts}
          sorts={SORTS}
        />

        {visibleSongs.length > 0 ? (
          <section className="song-grid" aria-label="歌曲列表">
            {visibleSongs.map((song) => (
              <SongCard key={song.id} song={song} />
            ))}
          </section>
        ) : (
          <div className="empty-state">
            <p>沒有符合條件的歌曲</p>
            <button type="button" className="chip" onClick={() => setFilters(DEFAULT_FILTERS)}>
              清除篩選條件
            </button>
          </div>
        )}
      </main>

      <footer className="site-footer">
        <p>
          進度階段：{Object.values(STATUSES).map((s) => s.label).join(' → ')}
        </p>
      </footer>
    </div>
  );
}
