import { useEffect, useMemo, useState } from 'react';
import songs from './data/songs.json';
import SongCard from './components/SongCard';
import { STATUSES } from './data/songUtils';

const statusOptions = Object.entries(STATUSES);

function sortSongs(items, sortBy) {
  const byTitle = (a, b) => a.title.localeCompare(b.title, 'zh-Hant');
  const byNewest = (a, b) => (b.addedAt || '').localeCompare(a.addedAt || '') || byTitle(a, b);

  return [...items].sort((a, b) => {
    if (sortBy === 'status') {
      return (STATUSES[a.status]?.order ?? 99) - (STATUSES[b.status]?.order ?? 99) || byNewest(a, b);
    }
    if (sortBy === 'difficulty') {
      return (b.difficulty || -1) - (a.difficulty || -1) || byNewest(a, b);
    }
    if (sortBy === 'bpm') {
      return (a.bpm || Number.MAX_SAFE_INTEGER) - (b.bpm || Number.MAX_SAFE_INTEGER) || byTitle(a, b);
    }
    return byNewest(a, b);
  });
}

export default function App() {
  const [query, setQuery] = useState('');
  const [status, setStatus] = useState('all');
  const [difficulty, setDifficulty] = useState('all');
  const [sortBy, setSortBy] = useState('newest');
  const [activeMetronomeId, setActiveMetronomeId] = useState(null);

  const visibleSongs = useMemo(() => {
    const normalizedQuery = query.trim().toLocaleLowerCase();
    const matches = songs.filter((song) => {
      const searchTarget = [song.title, song.artist, song.tabAuthor].join(' ').toLocaleLowerCase();
      const matchesQuery = !normalizedQuery || searchTarget.includes(normalizedQuery);
      const matchesStatus = status === 'all' || song.status === status;
      const matchesDifficulty = difficulty === 'all'
        || (difficulty === 'unrated' ? !song.difficulty : song.difficulty === Number(difficulty));

      return matchesQuery && matchesStatus && matchesDifficulty;
    });

    return sortSongs(matches, sortBy);
  }, [query, status, difficulty, sortBy]);

  const hasFilters = query || status !== 'all' || difficulty !== 'all' || sortBy !== 'newest';

  useEffect(() => {
    if (activeMetronomeId && !visibleSongs.some((song) => song.id === activeMetronomeId)) {
      setActiveMetronomeId(null);
    }
  }, [activeMetronomeId, visibleSongs]);

  function clearFilters() {
    setQuery('');
    setStatus('all');
    setDifficulty('all');
    setSortBy('newest');
  }

  function deactivateMetronome(songId) {
    setActiveMetronomeId((currentId) => currentId === songId ? null : currentId);
  }

  return (
    <div className="page">
      <header className="masthead-mini">
        <h1>曲目一覽</h1>
        <hr className="rule-thin" />
      </header>

      <main>
        <section className="catalogue-controls" aria-label="搜尋、篩選與排序">
          <div className="control-field control-search">
            <label htmlFor="song-search">搜尋曲目</label>
            <input
              id="song-search"
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="歌名、歌手或採譜者"
            />
          </div>

          <div className="control-field">
            <label htmlFor="status-filter">學習狀態</label>
            <select id="status-filter" value={status} onChange={(event) => setStatus(event.target.value)}>
              <option value="all">全部狀態</option>
              {statusOptions.map(([key, info]) => <option key={key} value={key}>{info.label}</option>)}
            </select>
          </div>

          <div className="control-field">
            <label htmlFor="difficulty-filter">難度</label>
            <select id="difficulty-filter" value={difficulty} onChange={(event) => setDifficulty(event.target.value)}>
              <option value="all">全部難度</option>
              <option value="unrated">難度未評</option>
              {[1, 2, 3, 4, 5].map((value) => <option key={value} value={value}>{value} 星</option>)}
            </select>
          </div>

          <div className="control-field">
            <label htmlFor="sort-by">排序</label>
            <select id="sort-by" value={sortBy} onChange={(event) => setSortBy(event.target.value)}>
              <option value="newest">最近收錄</option>
              <option value="status">學習階段</option>
              <option value="difficulty">難度：高至低</option>
              <option value="bpm">BPM：慢至快</option>
            </select>
          </div>

          {hasFilters && <button type="button" className="clear-filters" onClick={clearFilters}>清除條件</button>}
        </section>

        <p className="result-count" aria-live="polite">顯示 {visibleSongs.length} 首曲目</p>

        <section className="classifieds" aria-label="歌曲列表">
          {visibleSongs.map((song) => (
            <SongCard
              key={song.id}
              song={song}
              activeMetronomeId={activeMetronomeId}
              onActivateMetronome={setActiveMetronomeId}
              onDeactivateMetronome={deactivateMetronome}
            />
          ))}
          {visibleSongs.length === 0 && (
            <p className="empty-results">找不到符合條件的曲目，試著調整搜尋或篩選條件。</p>
          )}
        </section>
      </main>

      <footer className="site-footer">
        <p>最後更新：{__BUILD_DATE__}</p>
      </footer>
    </div>
  );
}
