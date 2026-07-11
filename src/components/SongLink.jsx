import { displayHost, LINK_TYPES } from '../data/songUtils';

export default function SongLink({ link }) {
  return (
    <a className="song-link-item" href={link.url} target="_blank" rel="noreferrer">
      <span className="link-type">{LINK_TYPES[link.type] || LINK_TYPES.other}</span>
      <span className="link-name">{link.label || '連結'}</span>
      <span className="link-host">{displayHost(link.url)}</span>
    </a>
  );
}
