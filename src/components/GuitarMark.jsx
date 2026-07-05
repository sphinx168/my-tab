// 卡片右側的裝飾圖示，純視覺用途，填補留白
export default function GuitarMark() {
  return (
    <svg
      className="guitar-mark"
      viewBox="0 0 60 100"
      width="34"
      height="56"
      aria-hidden="true"
    >
      <path
        d="M30 4c-6 0-10 4-10 9 0 3 1.5 5.5 4 7.3-6 2-10 7-10 15 0 6 3 10 3 16 0 12-8 15-8 28 0 12 9 21 21 21s21-9 21-21c0-13-8-16-8-28 0-6 3-10 3-16 0-8-4-13-10-15 2.5-1.8 4-4.3 4-7.3 0-5-4-9-10-9Z"
        fill="none"
        stroke="var(--brass)"
        strokeWidth="1.6"
        opacity="0.5"
      />
      <circle cx="30" cy="70" r="8" fill="none" stroke="var(--brass)" strokeWidth="1.6" opacity="0.5" />
    </svg>
  );
}
