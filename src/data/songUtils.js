// 練習進度的四個階段，order 供排序與篩選使用
export const STATUSES = {
  'want-to-learn': { label: '想學', order: 0 },
  practicing: { label: '練習中', order: 1 },
  playable: { label: '可完整彈奏', order: 2 },
  mastered: { label: '已精通', order: 3 },
};

export const STATUS_KEYS = Object.keys(STATUSES);

// 供顯示用的簡短網域名稱，例如 https://www.youtube.com/... → youtube.com
export function displayHost(url) {
  try {
    return new URL(url).hostname.replace(/^www\./, '');
  } catch {
    return url;
  }
}
