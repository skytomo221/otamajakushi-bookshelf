/* eslint-disable global-require */
/* eslint-disable @typescript-eslint/no-var-requires */
import { app, BrowserWindow, dialog, ipcMain } from 'electron';
import { readFileSync } from 'fs';

import { FileOpenReturn } from '../renderer/renderer.d';

const createWindow = () => {
  const path = require('path');
  const mainWindow = new BrowserWindow({
    width: 1200,
    height: 675,
    webPreferences: {
      preload: path.join(app.getAppPath(), 'preload.js'),
    },
    frame: false,
    resizable: true,
  });

  // 読み込む index.html。
  // tsc でコンパイルするので、出力先の dist の相対パスで指定する。
  mainWindow.loadFile(path.join(__dirname, './index.html'));

  if (process.argv.find(arg => arg === '--debug')) {
    mainWindow.webContents.openDevTools();
  }

  ipcMain.handle('window-minimize', () => {
    mainWindow.minimize();
  });

  let fullScreen = false;

  ipcMain.handle('window-maximize', () => {
    mainWindow.setFullScreen((fullScreen = !fullScreen));
  });

  ipcMain.handle('window-close', () => {
    app.quit();
  });

  ipcMain.handle('file-open', async (): Promise<FileOpenReturn> => {
    const paths = dialog.showOpenDialogSync(mainWindow, {
      buttonLabel: '開く',
      filters: [{ name: 'OTM-JSON', extensions: ['json'] }],
      properties: ['openFile', 'createDirectory'],
    });
    if (paths === undefined) {
      return { status: 'cancel' };
    }
    try {
      const filePath = paths[0];
      const buff = readFileSync(filePath);
      return {
        status: 'success',
        path: filePath,
        text: buff.toString(),
      };
    } catch (error) {
      if (error instanceof Error) {
        return { status: 'failure', message: error.message };
      }
    }
    return { status: 'cancel' };
  });
};

// Electronの起動準備が終わったら、ウィンドウを作成する。
app.whenReady().then(createWindow);

// すべての ウィンドウ が閉じたときの処理
app.on('window-all-closed', () => {
  // macOS 以外では、メインプロセスを停止する
  // macOS では、ウインドウが閉じてもメインプロセスは停止せず
  // ドックから再度ウインドウが表示されるようにする。
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // macOS では、ウインドウが閉じてもメインプロセスは停止せず
  // ドックから再度ウインドウが表示されるようにする。
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
