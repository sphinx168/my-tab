# Architecture

- `songs.json` 與 `videos.json` 是內容來源；純函式負責時間與完成度換算。
- `App` 以 `view` state 在「曲目」與「跟練影片」兩個分頁間切換，並管理全頁唯一的作用中節拍器 ID（僅曲目分頁使用）。
- `SongCard` 顯示摘要，`SongDetails` 管理收合詳情，`Metronome` 管理單曲 BPM 與音訊排程。`VideoCard` 顯示跟練影片並內嵌 YouTube 播放器。
- 所有音訊資源在停止、收合、篩選移除或卸載時清理。
