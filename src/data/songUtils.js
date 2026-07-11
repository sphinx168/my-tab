// 練習進度的四個階段，order 供排序與篩選使用
export const STATUSES = {
  'want-to-learn': { label: '想學', order: 0 },
  practicing: { label: '練習中', order: 1 },
  playable: { label: '可完整彈奏', order: 2 },
  mastered: { label: '已精通', order: 3 },
};

export const STATUS_KEYS = Object.keys(STATUSES);

export const LINK_TYPES = {
  tutorial: '教學',
  original: '原曲',
  interactive: '互動譜',
  other: '其他',
};

export function parseTimecode(value) {
  if (typeof value !== 'string') return null;

  const parts = value.trim().split(':');
  if (parts.length !== 2 && parts.length !== 3) return null;
  const hasValidShape = parts.length === 2
    ? /^\d+$/.test(parts[0]) && /^\d{2}$/.test(parts[1])
    : /^\d+$/.test(parts[0]) && /^\d{2}$/.test(parts[1]) && /^\d{2}$/.test(parts[2]);
  if (!hasValidShape) return null;

  const numbers = parts.map(Number);
  const seconds = numbers.at(-1);
  const minutes = numbers.at(-2);
  const hours = parts.length === 3 ? numbers[0] : 0;

  if (seconds > 59 || (parts.length === 3 && minutes > 59)) return null;
  return (hours * 60 * 60) + (minutes * 60) + seconds;
}

export function formatTimecode(value) {
  if (!Number.isFinite(value) || value < 0) return null;

  const totalSeconds = Math.floor(value);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  if (hours > 0) {
    return `${hours}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  }
  return `${minutes}:${String(seconds).padStart(2, '0')}`;
}

export function calculateProgress(progress) {
  const currentSeconds = parseTimecode(progress?.current);
  const durationSeconds = parseTimecode(progress?.duration);
  const percentage = currentSeconds !== null && durationSeconds > 0
    ? Math.min(100, Math.max(0, Math.round((currentSeconds / durationSeconds) * 100)))
    : null;

  return { currentSeconds, durationSeconds, percentage };
}

// 供顯示用的簡短網域名稱，例如 https://www.youtube.com/... → youtube.com
export function displayHost(url) {
  try {
    return new URL(url).hostname.replace(/^www\./, '');
  } catch {
    return url;
  }
}
