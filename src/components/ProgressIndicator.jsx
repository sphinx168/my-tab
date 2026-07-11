import { calculateProgress, formatTimecode } from '../data/songUtils';

export default function ProgressIndicator({ progress }) {
  const { currentSeconds, durationSeconds, percentage } = calculateProgress(progress);
  const currentLabel = formatTimecode(currentSeconds);
  const durationLabel = formatTimecode(durationSeconds);

  if (currentLabel === null) {
    return <p className="progress-unset">練習進度尚未設定</p>;
  }

  if (percentage === null) {
    return (
      <p className="progress-unset">
        <span>已練到 {currentLabel}</span>
        <span aria-hidden="true"> · </span>
        <span>尚未設定曲長</span>
      </p>
    );
  }

  return (
    <div className="song-progress">
      <p className="progress-label">
        <span>{currentLabel} / {durationLabel}</span>
        <strong>{percentage}%</strong>
      </p>
      <div
        className="progress-track"
        role="progressbar"
        aria-label="歌曲練習完成度"
        aria-valuemin="0"
        aria-valuemax="100"
        aria-valuenow={percentage}
        aria-valuetext={`已完成 ${percentage}%`}
      >
        <span className="progress-fill" style={{ width: `${percentage}%` }} />
      </div>
    </div>
  );
}
