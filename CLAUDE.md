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

## 架構

- `src/App.jsx`：唯一的頁面。build 時直接 import `songs.json`，篩選（搜尋文字、狀態、難度）與排序（`SORTS`）都在這裡用 `useMemo` 完成；`FilterBar` 是受控元件，filters 狀態集中在 App。
- `src/components/`：展示元件（SongCard、StarRating、StatusBadge、LinkIcon、FilterBar），皆無自身狀態。
- 樣式在 `src/index.css`，手寫 CSS、無 UI 套件。設計主題「玫瑰木與黃銅」：色票與字體都定義在 `:root` CSS 變數（`--brass`、`--bg` 等），新樣式一律取用變數而非硬編色碼。字體：Fraunces（display，英文標題）+ Noto Sans TC（內文），由 `index.html` 載入 Google Fonts。
- 介面文字為繁體中文。

## 部署

- push 到 `main` 即自動部署（Netlify 已連結 GitHub repo）。
- 需要手動部署時：用 Netlify MCP 的 `deploy-site`（siteId：`36ce4548-2860-4921-a356-114ee913adc9`），執行其回傳的 `npx @netlify/mcp` 指令。
