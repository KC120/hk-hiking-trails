# hk-hiking-trails
香港行山路線資訊網站

## 簡介

本網站收錄香港各區熱門行山路線，提供路線資訊、互動地圖及 GPX 檔案下載。

## 檔案結構

```
hk-hiking-trails/
├── index.html              # 首頁（路線列表）
├── css/
│   └── style.css           # 樣式
├── js/
│   └── map.js              # Leaflet 地圖功能
├── routes/
│   └── sample-route.html   # 路線範例頁面
├── gpx/
│   └── sample-route.gpx    # GPX 範例檔案
├── images/
│   └── .gitkeep            # 圖片資料夾
└── README.md               # 網站說明
```

## 技術

- **HTML / CSS / JavaScript** — 純前端，無需後端
- **[Leaflet.js](https://leafletjs.com/)** — 開源互動地圖
- **[OpenStreetMap](https://www.openstreetmap.org/)** — 地圖底圖
- **GPX** — 路線軌跡格式

## 新增路線

1. 在 `gpx/` 目錄放入路線的 GPX 檔案。
2. 在 `routes/` 目錄建立對應的 HTML 頁面（可複製 `sample-route.html`）。
3. 在 `index.html` 的路線列表中加入新卡片。

## 本地預覽

直接以瀏覽器開啟 `index.html`，或使用任意靜態伺服器，例如：

```bash
npx serve .
```

## 免責聲明

所有資料僅供參考，出行前請留意香港天文台天氣預報及官方警告。

