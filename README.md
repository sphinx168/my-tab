# 我的吉他譜櫃（my-tab）

記錄吉他歌曲收藏的靜態網站：曲名、演唱者、採譜者、譜源連結（樂譜 / YouTube / Bilibili）、練習進度、難度與練習心得。

React + Vite 建置，資料存在 repo 內的 JSON 檔，push 後由 Netlify 自動部署。

## 如何新增 / 編輯歌曲

所有歌曲資料都在 **`src/data/songs.json`**，一首歌一筆：

```json
{
  "id": "unique-id",
  "title": "曲名",
  "artist": "演唱者",
  "tabAuthor": "採譜者 / tab 製作者",
  "links": [
    { "url": "https://www.youtube.com/watch?v=...", "label": "教學影片" },
    { "url": "https://example.com/tab.pdf", "label": "樂譜 PDF" }
  ],
  "status": "practicing",
  "difficulty": 3,
  "notes": "練習心得",
  "addedAt": "2026-07-05"
}
```

| 欄位 | 說明 |
| --- | --- |
| `id` | 不重複的英文代號 |
| `links` | 可放多個連結；YouTube / Bilibili / 其他（視為樂譜）會自動顯示對應圖示 |
| `status` | `want-to-learn` 想學 / `practicing` 練習中 / `playable` 可完整彈奏 / `mastered` 已精通 |
| `difficulty` | 難度 1–5（星等） |
| `addedAt` | 收錄日期 `YYYY-MM-DD`，供「最新收錄」排序 |

改完 JSON 後：

```bash
git add src/data/songs.json
git commit -m "新增歌曲：xxx"
git push
```

push 後 Netlify 會自動重新建置部署，約一分鐘後網站就會更新。

## 本地開發

```bash
npm install
npm run dev     # 開發伺服器
npm run build   # 建置到 dist/
```
