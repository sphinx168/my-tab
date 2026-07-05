// 練習進度的四個階段，order 供排序與篩選使用
export const STATUSES = {
  'want-to-learn': { label: '想學', order: 0 },
  practicing: { label: '練習中', order: 1 },
  playable: { label: '可完整彈奏', order: 2 },
  mastered: { label: '已精通', order: 3 },
};

export const STATUS_KEYS = Object.keys(STATUSES);

// 由連結網址判斷來源類型，決定顯示哪種圖示
export function linkType(url) {
  try {
    const host = new URL(url).hostname.replace(/^www\./, '');
    if (host === 'youtu.be' || host === 'youtube.com' || host.endsWith('.youtube.com')) {
      return 'youtube';
    }
    if (host === 'b23.tv' || host === 'bilibili.com' || host.endsWith('.bilibili.com')) {
      return 'bilibili';
    }
  } catch {
    // 無效網址一律當作樂譜連結
  }
  return 'sheet';
}
