const { contextBridge } = require('electron');

contextBridge.exposeInMainWorld('titanNative', {
  platform: process.platform,
  isElectron: true,
  appVersion: '2.4.0'
});
