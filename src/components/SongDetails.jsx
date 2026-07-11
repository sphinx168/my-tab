import Metronome from './Metronome';
import SongLink from './SongLink';
import TabSheet from './TabSheet';

export default function SongDetails({ song, activeMetronomeId, onActivateMetronome, onDeactivateMetronome }) {
  const versions = song.details?.versions || [];
  const sections = song.details?.sections || [];
  const challenges = song.details?.challenges || [];
  const practiceLogs = [...(song.details?.practiceLogs || [])]
    .sort((a, b) => (b.date || '').localeCompare(a.date || ''));

  function handleToggle(event) {
    if (event.target === event.currentTarget && !event.currentTarget.open) {
      onDeactivateMetronome(song.id);
    }
  }

  return (
    <details className="song-details" onToggle={handleToggle}>
      <summary>
        <span>查看練習詳情</span>
        <span className="details-marker" aria-hidden="true">＋</span>
      </summary>

      <div className="details-body">
        <Metronome
          songId={song.id}
          songBpm={song.bpm}
          activeId={activeMetronomeId}
          onActivate={onActivateMetronome}
          onDeactivate={onDeactivateMetronome}
        />

        {song.links?.length > 0 && (
          <section className="detail-section">
            <h3>相關連結</h3>
            <div className="ad-links">
              {song.links.map((link) => <SongLink key={link.url} link={link} />)}
            </div>
          </section>
        )}

        {versions.length > 0 && (
          <section className="detail-section">
            <h3>版本差異</h3>
            <dl className="detail-list">
              {versions.map((version, index) => (
                <div key={`${index}-${version.name}`}>
                  <dt>{version.name}</dt>
                  <dd>{version.notes}</dd>
                </div>
              ))}
            </dl>
          </section>
        )}

        {sections.length > 0 && (
          <section className="detail-section">
            <h3>段落筆記</h3>
            <ul className="section-notes">
              {sections.map((section, index) => (
                <li key={`${index}-${section.title}-${section.timeRange}`}>
                  <p><strong>{section.title}</strong>{section.timeRange && <span>{section.timeRange}</span>}</p>
                  <p>{section.notes}</p>
                </li>
              ))}
            </ul>
          </section>
        )}

        {challenges.length > 0 && (
          <section className="detail-section">
            <h3>練習難點</h3>
            <ul className="challenge-list">
              {challenges.map((challenge, index) => <li key={`${index}-${challenge}`}>{challenge}</li>)}
            </ul>
          </section>
        )}

        {practiceLogs.length > 0 && (
          <section className="detail-section">
            <h3>練習紀錄</h3>
            <ol className="practice-logs">
              {practiceLogs.map((log, index) => (
                <li key={`${index}-${log.date}-${log.note}`}>
                  <p><time dateTime={log.date}>{log.date}</time>{log.bpm > 0 && <span>{log.bpm} BPM</span>}</p>
                  <p>{log.note}</p>
                </li>
              ))}
            </ol>
          </section>
        )}

        <TabSheet sheet={song.sheet} />
      </div>
    </details>
  );
}
