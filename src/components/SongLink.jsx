import { displayHost } from '../data/songUtils';

export default function SongLink({ link }) {
  return (
    <a className="ad-link" href={link.url} target="_blank" rel="noreferrer">
      詳見〈{link.label || '連結'}〉：{displayHost(link.url)}
    </a>
  );
}
