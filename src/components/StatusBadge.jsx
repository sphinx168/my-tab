import { STATUSES } from '../data/songUtils';

export default function StatusBadge({ status }) {
  const info = STATUSES[status];
  if (!info) return null;
  return <span className={`status-badge status-${status}`}>{info.label}</span>;
}
