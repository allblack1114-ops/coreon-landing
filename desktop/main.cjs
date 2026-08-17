const { app, BrowserWindow, shell } = require('electron');
const path = require('path');

const PRODUCT_ORIGIN = 'https://app.coreon-global.com';
const ENTRY_URL = `${PRODUCT_ORIGIN}/customer-portal`;
const PRODUCT_HOST = 'app.coreon-global.com';

function parseUrl(raw) {
  try { return new URL(raw); } catch { return null; }
}

function isProductUrl(raw) {
  const url = parseUrl(raw);
  return Boolean(url && url.protocol === 'https:' && url.hostname === PRODUCT_HOST);
}

function openExternal(raw) {
  const url = parseUrl(raw);
  if (!url || !['https:', 'mailto:', 'tel:'].includes(url.protocol)) return;
  shell.openExternal(url.toString()).catch(() => {});
}

function failurePage(message) {
  return `data:text/html;charset=utf-8,${encodeURIComponent(`<!doctype html><html lang="ko"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>COREON 연결 오류</title><style>body{margin:0;min-height:100vh;display:grid;place-items:center;background:#071529;color:#fff;font-family:-apple-system,BlinkMacSystemFont,"Segoe UI","Noto Sans KR",sans-serif}.card{width:min(640px,calc(100% - 36px));padding:32px;border:1px solid #315479;border-radius:22px;background:#0b2443}.muted{color:#b8cce1}button{padding:12px 16px;border:0;border-radius:999px;font-weight:900;cursor:pointer}</style><body><main class="card"><h1>COREON Safety AX에 연결할 수 없습니다.</h1><p class="muted">네트워크 연결 또는 서비스 상태를 확인한 뒤 다시 시도해 주세요. 서버의 원시 오류 메시지는 사용자 화면에 노출하지 않습니다.</p><p class="muted">${String(message || '').replace(/[<>]/g, '')}</p><button onclick="location.href='${ENTRY_URL}'">다시 연결</button></main></body></html>`)}`;
}

function createWindow() {
  const win = new BrowserWindow({
    title: 'COREON Safety AX Agent',
    width: 1440,
    height: 960,
    minWidth: 1024,
    minHeight: 720,
    show: false,
    autoHideMenuBar: true,
    backgroundColor: '#071529',
    webPreferences: {
      preload: path.join(__dirname, 'preload.cjs'),
      contextIsolation: true,
      nodeIntegration: false,
      sandbox: true,
      webSecurity: true,
      spellcheck: true,
      partition: 'persist:coreon-safety-ax'
    }
  });

  win.webContents.setUserAgent(`${win.webContents.getUserAgent()} COREON-Safety-AX-Desktop/28.12`);

  win.webContents.setWindowOpenHandler(({ url }) => {
    if (isProductUrl(url)) return { action: 'allow' };
    openExternal(url);
    return { action: 'deny' };
  });

  win.webContents.on('will-navigate', (event, url) => {
    if (isProductUrl(url)) return;
    event.preventDefault();
    openExternal(url);
  });

  win.webContents.on('will-redirect', (event, url) => {
    if (isProductUrl(url)) return;
    event.preventDefault();
    openExternal(url);
  });

  win.webContents.on('did-fail-load', (_event, errorCode, errorDescription, _url, isMainFrame) => {
    if (!isMainFrame || errorCode === -3) return;
    win.loadURL(failurePage(errorDescription)).catch(() => {});
  });

  win.once('ready-to-show', () => win.show());
  win.loadURL(ENTRY_URL).catch(() => {});
  return win;
}

app.whenReady().then(() => {
  createWindow();
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});
