/**
 * map.js — Leaflet 地圖功能
 * 香港行山路線資訊網站
 */

/**
 * 初始化概覽地圖（首頁使用）
 * @param {string} elementId - 地圖容器的 HTML 元素 ID
 * @param {Array} routes - 路線資料陣列，每項包含 { name, lat, lng, url }
 */
function initOverviewMap(elementId, routes) {
  var map = L.map(elementId).setView([22.35, 114.1], 11);

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    maxZoom: 18,
  }).addTo(map);

  routes.forEach(function (route) {
    var marker = L.marker([route.lat, route.lng]).addTo(map);
    var popupContent =
      '<strong>' +
      route.name +
      '</strong><br>' +
      '<a href="' +
      route.url +
      '">查看路線詳情</a>';
    marker.bindPopup(popupContent);
  });

  return map;
}

/**
 * 從 GPX 檔案載入路線並顯示在地圖上（路線詳細頁使用）
 * @param {string} elementId - 地圖容器的 HTML 元素 ID
 * @param {string} gpxUrl    - GPX 檔案的 URL
 */
function initRouteMap(elementId, gpxUrl) {
  var map = L.map(elementId).setView([22.35, 114.1], 13);

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    maxZoom: 18,
  }).addTo(map);

  // 解析並繪製 GPX 路線
  fetchGpx(gpxUrl, function (trackPoints) {
    if (!trackPoints || trackPoints.length === 0) return;

    var polyline = L.polyline(trackPoints, {
      color: '#e53935',
      weight: 4,
      opacity: 0.85,
    }).addTo(map);

    // 起點與終點標記
    L.marker(trackPoints[0])
      .addTo(map)
      .bindPopup('起點')
      .openPopup();
    L.marker(trackPoints[trackPoints.length - 1])
      .addTo(map)
      .bindPopup('終點');

    map.fitBounds(polyline.getBounds(), { padding: [30, 30] });
  });

  return map;
}

/**
 * 以 XMLHttpRequest 取得 GPX 檔案並解析成座標陣列
 * @param {string}   url      - GPX 檔案 URL
 * @param {Function} callback - 接收座標陣列 [[lat, lng], ...] 的回呼函式
 */
function fetchGpx(url, callback) {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', url, true);
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
      callback(parseGpx(xhr.responseXML || xhr.responseText));
    }
  };
  xhr.send();
}

/**
 * 解析 GPX XML，回傳 [[lat, lng], ...] 座標陣列
 * @param {Document|string} gpxData - GPX 的 XML Document 或字串
 * @returns {Array} 座標陣列
 */
function parseGpx(gpxData) {
  var xmlDoc;
  if (typeof gpxData === 'string') {
    var parser = new DOMParser();
    xmlDoc = parser.parseFromString(gpxData, 'application/xml');
  } else {
    xmlDoc = gpxData;
  }

  var trkpts = xmlDoc.getElementsByTagName('trkpt');
  var points = [];
  for (var i = 0; i < trkpts.length; i++) {
    var lat = parseFloat(trkpts[i].getAttribute('lat'));
    var lon = parseFloat(trkpts[i].getAttribute('lon'));
    if (!isNaN(lat) && !isNaN(lon)) {
      points.push([lat, lon]);
    }
  }
  return points;
}
