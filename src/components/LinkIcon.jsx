import { linkType } from '../data/songUtils';

const ICONS = {
  youtube: (
    <svg viewBox="0 0 24 24" width="14" height="14" aria-hidden="true">
      <path
        d="M22.5 7.2a2.8 2.8 0 0 0-2-2C18.9 4.8 12 4.8 12 4.8s-6.9 0-8.5.4a2.8 2.8 0 0 0-2 2A29 29 0 0 0 1.1 12a29 29 0 0 0 .4 4.8 2.8 2.8 0 0 0 2 2c1.6.4 8.5.4 8.5.4s6.9 0 8.5-.4a2.8 2.8 0 0 0 2-2 29 29 0 0 0 .4-4.8 29 29 0 0 0-.4-4.8ZM9.8 15.3V8.7L15.5 12Z"
        fill="currentColor"
      />
    </svg>
  ),
  bilibili: (
    <svg viewBox="0 0 24 24" width="14" height="14" aria-hidden="true">
      <path
        d="M6.2 2.6a1 1 0 0 1 1.4 0L10 5h4l2.4-2.4a1 1 0 1 1 1.4 1.4l-1 1H19a3.5 3.5 0 0 1 3.5 3.5v9A3.5 3.5 0 0 1 19 21H5a3.5 3.5 0 0 1-3.5-3.5v-9A3.5 3.5 0 0 1 5 5h2.2l-1-1a1 1 0 0 1 0-1.4ZM5 7.2A1.5 1.5 0 0 0 3.5 8.7v8.6A1.5 1.5 0 0 0 5 18.8h14a1.5 1.5 0 0 0 1.5-1.5V8.7A1.5 1.5 0 0 0 19 7.2Zm3 3.1a1 1 0 0 1 1 1v1.4a1 1 0 1 1-2 0v-1.4a1 1 0 0 1 1-1Zm8 0a1 1 0 0 1 1 1v1.4a1 1 0 1 1-2 0v-1.4a1 1 0 0 1 1-1Z"
        fill="currentColor"
      />
    </svg>
  ),
  sheet: (
    <svg viewBox="0 0 24 24" width="14" height="14" aria-hidden="true">
      <path
        d="M9 3.5a1 1 0 0 1 1-1h9.5a1 1 0 0 1 1 1v13.2a3.3 3.3 0 1 1-2-3V7.5H11v9.2a3.3 3.3 0 1 1-2-3Zm2-.5v2.5h8.5V3ZM7.7 15.5a1.3 1.3 0 1 0 1.3 1.3 1.3 1.3 0 0 0-1.3-1.3Zm10.5 0a1.3 1.3 0 1 0 1.3 1.3 1.3 1.3 0 0 0-1.3-1.3Z"
        fill="currentColor"
      />
    </svg>
  ),
};

const TYPE_LABELS = { youtube: 'YouTube', bilibili: 'Bilibili', sheet: '樂譜' };

export default function LinkIcon({ link }) {
  const type = linkType(link.url);
  return (
    <a
      className={`song-link link-${type}`}
      href={link.url}
      target="_blank"
      rel="noreferrer"
      title={`${TYPE_LABELS[type]}：${link.label || link.url}`}
    >
      {ICONS[type]}
      <span>{link.label || TYPE_LABELS[type]}</span>
    </a>
  );
}
