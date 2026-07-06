# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 專案概要

吉他 Tab 收藏網站：純靜態 React + Vite 網站，無後端。歌曲資料是 repo 內的 JSON 檔（`src/data/songs.json`），部署在 Netlify（https://sphinx168-my-tab.netlify.app），GitHub repo 為 `sphinx168/my-tab`。

## 指令

```bash
npm run dev       # 開發伺服器（port 5173，.claude/launch.json 已設定 preview）
npm run build     # 建置到 dist/
```

沒有測試與 lint 設定。

## 日常工作流程：新增/編輯歌曲

最常見的任務是改 `src/data/songs.json`（一首歌一筆），然後 commit + push，Netlify 會自動重新建置部署。欄位約定：

- `status`：`want-to-learn` 想學 / `practicing` 練習中 / `playable` 可完整彈奏 / `mastered` 已精通（定義在 `src/data/songUtils.js` 的 `STATUSES`）
- `difficulty`：1–5 星；`0` 表示尚未評分，UI 顯示「難度未評」
- `links`：陣列，可多個；來源類型（YouTube / Bilibili / 其他一律視為樂譜）由 `songUtils.js` 的 `linkType()` 從網址自動判斷，不需手動標記
- `notes` 為空字串、`links` 為空陣列時，卡片會自動省略該區塊
- `addedAt`（`YYYY-MM-DD`）供「最新收錄」排序使用
- `bpm`：選填數字，歌曲節奏。省略或設為 `0` 時卡片不顯示 BPM 資訊
- `sheet`：選填物件，放六線譜或和弦譜本體（不同於 `links` 裡的外部教學連結），卡片上以可展開的「查看六線譜／和弦」區塊呈現。兩種來源擇一或並用：
  - `sheet.text`：直接編輯的純文字譜（六線譜或和弦皆可），多行用 `\n`，以等寬字體原樣呈現，適合手key或貼上文字譜。
  - `sheet.images`：字串陣列，放「上傳」的譜面掃描圖／照片路徑。圖檔先放進 `public/tabs/`，再以 `/tabs/檔名` 路徑填入陣列。
  - 兩者都留空或整個 `sheet` 省略時，卡片不顯示該區塊。

## 架構

- `src/App.jsx`：唯一的頁面。build 時直接 import `songs.json`，依 `addedAt` 排序後渲染全部歌曲，無篩選/搜尋 UI（歌曲數量還少，之後量多再考慮加回來）。
- `src/components/`：展示元件（SongCard、StarRating、StatusBadge、SongLink、TabSheet），皆無自身狀態。`SongCard` 版面模仿報紙分類廣告：左側照片框 + 圖說，右側標題／狀態／byline／星等／連結／譜面／備註／日期。`TabSheet` 用原生 `<details>` 收合六線譜／和弦內容，避免卡片預設就被拉長。
- 樣式在 `src/index.css`，手寫 CSS、無 UI 套件。設計主題「老報紙」：米白報紙底色、黑色襯線鉛字，色票與字體定義在 `:root` CSS 變數（`--paper`、`--ink`、`--crimson` 等），新樣式一律取用變數而非硬編色碼。字體：Playfair Display（標題）+ Noto Serif TC（內文），由 `index.html` 載入 Google Fonts。難度星等與連結皆為純文字呈現（無圖示），維持印刷品的單色調性。
- 介面文字為繁體中文。
- 頁尾「最後更新」日期是建置時間戳，非手動維護：`vite.config.js` 的 `define.__BUILD_DATE__` 在建置當下取當天日期字串，`App.jsx` 直接引用該全域常數。每次 push 觸發 Netlify 重新建置就會自動更新，不需要手動改日期。

## 部署

- push 到 `main` 即自動部署（Netlify 已連結 GitHub repo）。
- 需要手動部署時：用 Netlify MCP 的 `deploy-site`（siteId：`36ce4548-2860-4921-a356-114ee913adc9`），執行其回傳的 `npx @netlify/mcp` 指令。
