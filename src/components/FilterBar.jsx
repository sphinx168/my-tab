import { STATUSES, STATUS_KEYS } from '../data/songUtils';

export default function FilterBar({ filters, onChange, statusCounts, sorts }) {
  const set = (patch) => onChange({ ...filters, ...patch });

  return (
    <div className="filter-bar">
      <input
        type="search"
        className="search-input"
        placeholder="搜尋曲名、演唱者或採譜者…"
        value={filters.query}
        onChange={(e) => set({ query: e.target.value })}
        aria-label="搜尋歌曲"
      />

      <div className="status-chips" role="group" aria-label="依練習進度篩選">
        <button
          type="button"
          className={`chip ${filters.status === 'all' ? 'chip-active' : ''}`}
          onClick={() => set({ status: 'all' })}
        >
          全部 <span className="chip-count">{statusCounts.all}</span>
        </button>
        {STATUS_KEYS.map((key) => (
          <button
            key={key}
            type="button"
            className={`chip ${filters.status === key ? 'chip-active' : ''}`}
            onClick={() => set({ status: filters.status === key ? 'all' : key })}
          >
            {STATUSES[key].label} <span className="chip-count">{statusCounts[key] || 0}</span>
          </button>
        ))}
      </div>

      <div className="filter-selects">
        <label className="select-label">
          難度
          <select
            value={filters.difficulty}
            onChange={(e) => set({ difficulty: Number(e.target.value) })}
          >
            <option value="0">全部</option>
            {[1, 2, 3, 4, 5].map((n) => (
              <option key={n} value={n}>
                {'★'.repeat(n)}
              </option>
            ))}
          </select>
        </label>
        <label className="select-label">
          排序
          <select value={filters.sort} onChange={(e) => set({ sort: e.target.value })}>
            {Object.entries(sorts).map(([key, s]) => (
              <option key={key} value={key}>
                {s.label}
              </option>
            ))}
          </select>
        </label>
      </div>
    </div>
  );
}
