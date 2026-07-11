# AGENTS.md

This file provides guidance to Codex (Codex.ai/code) when working with code in this repository.

## 專案概要

吉他 Tab 收藏網站：純靜態 React + Vite 網站，無後端。歌曲資料是 repo 內的 JSON 檔（`src/data/songs.json`），部署在 GitHub Pages（https://sphinx168.github.io/my-tab/），GitHub repo 為 `sphinx168/my-tab`。

## 指令

```bash
npm run dev       # 開發伺服器（port 5173，.Codex/launch.json 已設定 preview）
npm run build     # 建置到 dist/
npm test          # 使用 Node 內建測試執行時間與完成度工具測試
```

沒有 lint 設定；純函式測試位於 `src/data/songUtils.test.js`。

## 日常工作流程：新增/編輯歌曲

最常見的任務是改 `src/data/songs.json`（一首歌一筆），然後 commit + push，GitHub Actions 會自動重新建置部署到 GitHub Pages。欄位約定：

- `status`：`want-to-learn` 想學 / `practicing` 練習中 / `playable` 可完整彈奏 / `mastered` 已精通（定義在 `src/data/songUtils.js` 的 `STATUSES`）
- `difficulty`：1–5 星；`0` 表示尚未評分，UI 顯示「難度未評」
- `links`：陣列，可多個；每筆包含 `url`、`label` 與 `type`。`type` 可填 `tutorial` 教學 / `original` 原曲 / `interactive` 互動譜 / `other` 其他，不從網址自動猜測用途
- `addedAt`（`YYYY-MM-DD`）供「最新收錄」排序使用
- `bpm`：選填數字，歌曲節奏。省略或設為 `0` 時卡片不顯示 BPM 資訊
- `progress`：練習進度物件。`current` 與 `duration` 使用 `M:SS` 或 `H:MM:SS`；不知道曲長時將 `duration` 設為 `null`，UI 只顯示目前時間、不計算百分比
- `details`：選填的結構化詳情物件。`versions` 放版本差異、`sections` 放段落與時間範圍、`challenges` 放難點字串、`practiceLogs` 放含日期／BPM／筆記的練習紀錄
- `sheet`：選填物件，放六線譜或和弦譜本體（不同於 `links` 裡的外部教學連結），卡片上以可展開的「查看六線譜／和弦」區塊呈現。兩種來源擇一或並用：
  - `sheet.text`：直接編輯的純文字譜（六線譜或和弦皆可），多行用 `\n`，以等寬字體原樣呈現，適合手key或貼上文字譜。
  - `sheet.images`：字串陣列，放「上傳」的譜面掃描圖／照片路徑。圖檔先放進 `public/tabs/`，再以 `/tabs/檔名` 路徑填入陣列。
  - 兩者都留空或整個 `sheet` 省略時，卡片不顯示該區塊。

## 架構

- `src/App.jsx`：唯一的頁面。build 時直接 import `songs.json`，提供歌名搜尋、狀態／難度篩選與排序，並管理全頁唯一的作用中節拍器。
- `src/components/`：`SongCard` 顯示曲目摘要與進度；`SongDetails` 用原生 `<details>` 收合連結、節拍器、結構化筆記與譜面；`Metronome` 使用 Web Audio API，且全頁同時只播放一個。`TabSheet` 在詳情內二次收合六線譜／和弦內容。
- 樣式在 `src/index.css`，手寫 CSS、無 UI 套件。設計主題「老報紙」：米白報紙底色、黑色襯線鉛字，色票與字體定義在 `:root` CSS 變數（`--paper`、`--ink`、`--crimson` 等），新樣式一律取用變數而非硬編色碼。字體：Playfair Display（標題）+ Noto Serif TC（內文），由 `index.html` 載入 Google Fonts。難度星等與連結皆為純文字呈現（無圖示），維持印刷品的單色調性。
- 介面文字為繁體中文。
- 頁尾「最後更新」日期是建置時間戳，非手動維護：`vite.config.js` 的 `define.__BUILD_DATE__` 在建置當下取當天日期字串，`App.jsx` 直接引用該全域常數。每次 push 觸發 GitHub Actions 重新建置就會自動更新，不需要手動改日期。

## 部署

- push 到 `main` 即自動部署：`.github/workflows/deploy.yml` 會建置並發布到 GitHub Pages（repo Settings → Pages → Source 需設定為「GitHub Actions」）。
- `vite.config.js` 設定 `base: '/my-tab/'`，對應 GitHub Pages 的專案子路徑（`https://sphinx168.github.io/my-tab/`）；若之後改用自訂網域，記得把 `base` 改回 `/`。
- 需要手動觸發部署時，到 repo 的 Actions 頁籤手動執行 `Deploy to GitHub Pages` workflow（已設定 `workflow_dispatch`）。
