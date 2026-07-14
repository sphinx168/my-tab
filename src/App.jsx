import { useEffect, useMemo, useState } from 'react';
import songs from './data/songs.json';
import videos from './data/videos.json';
import SongCard from './components/SongCard';
import VideoCard from './components/VideoCard';
import { STATUSES } from './data/songUtils';

function byTitle(a, b) {
  return a.title.localeCompare(b.title, 'zh-Hant');
}

function byNewest(a, b) {
  return (b.addedAt || '').localeCompare(a.addedAt || '') || byTitle(a, b);
}

function sortSongs(items, sortBy) {
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
  const [view, setView] = useState('songs');
  const [sortBy, setSortBy] = useState('newest');
  const [activeMetronomeId, setActiveMetronomeId] = useState(null);

  const visibleSongs = useMemo(() => sortSongs(songs, sortBy), [sortBy]);
  const visibleVideos = useMemo(() => [...videos].sort(byNewest), []);

  useEffect(() => {
    if (activeMetronomeId && !visibleSongs.some((song) => song.id === activeMetronomeId)) {
      setActiveMetronomeId(null);
    }
  }, [activeMetronomeId, visibleSongs]);

  function deactivateMetronome(songId) {
    setActiveMetronomeId((currentId) => currentId === songId ? null : currentId);
  }

  return (
    <div className="page">
      <header className="app-header">
        <h1>曲目一覽</h1>
      </header>

      <nav className="view-tabs" aria-label="內容分類">
        <button
          type="button"
          className="view-tab"
          aria-pressed={view === 'songs'}
          onClick={() => setView('songs')}
        >
          曲目
        </button>
        <button
          type="button"
          className="view-tab"
          aria-pressed={view === 'videos'}
          onClick={() => setView('videos')}
        >
          跟練影片
        </button>
      </nav>

      <main>
        {view === 'songs' ? (
          <>
            <section className="catalogue-controls" aria-label="排序">
              <div className="control-field">
                <label htmlFor="sort-by">排序</label>
                <select id="sort-by" value={sortBy} onChange={(event) => setSortBy(event.target.value)}>
                  <option value="newest">最近收錄</option>
                  <option value="status">學習階段</option>
                  <option value="difficulty">難度：高至低</option>
                  <option value="bpm">BPM：慢至快</option>
                </select>
              </div>
            </section>

            <p className="result-count" aria-live="polite">顯示 {visibleSongs.length} 首曲目</p>

            <section className="song-grid" aria-label="歌曲列表">
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
          </>
        ) : (
          <>
            <p className="result-count" aria-live="polite">顯示 {visibleVideos.length} 部影片</p>

            <section className="video-grid" aria-label="跟練影片列表">
              {visibleVideos.map((video) => (
                <VideoCard key={video.id} video={video} />
              ))}
              {visibleVideos.length === 0 && (
                <p className="empty-results">目前還沒有收藏跟練影片。</p>
              )}
            </section>
          </>
        )}
      </main>

      <footer className="site-footer">
        <p>最後更新：{__BUILD_DATE__}</p>
      </footer>
    </div>
  );
}
