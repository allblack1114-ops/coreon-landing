const { contextBridge } = require('electron');

contextBridge.exposeInMainWorld('COREONDesktop', Object.freeze({
  installed: true,
  platform: process.platform,
  product: 'COREON Safety AX Agent',
  releaseAxis: 'v28.12'
}));
