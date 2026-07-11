# Architecture

- `songs.json` 是唯一內容來源；純函式負責時間與完成度換算。
- `App` 管理全頁唯一的作用中節拍器 ID。
- `SongCard` 顯示摘要，`SongDetails` 管理收合詳情，`Metronome` 管理單曲 BPM 與音訊排程。
- 所有音訊資源在停止、收合、篩選移除或卸載時清理。
