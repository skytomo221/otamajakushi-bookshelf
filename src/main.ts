/* eslint-disable global-require */
/* eslint-disable @typescript-eslint/no-var-requires */
import { app, BrowserWindow, dialog, ipcMain } from 'electron';
import { readFileSync } from 'fs';

// セキュアな Electron の構成
// 参考: https://qiita.com/pochman/items/64b34e9827866664d436

const createWindow = () => {
  const win = new BrowserWindow({
    width: 500,
    height: 700,
    webPreferences: {
      nodeIntegration: true,
      nodeIntegrationInWorker: true,
      contextIsolation: false,
      // preload: `${__dirname}/preload.js`
    },
    frame: false,
    resizable: true,
  });

  // 読み込む index.html。
  // tsc でコンパイルするので、出力先の dist の相対パスで指定する。
  const path = require('path');
  win.loadFile('index.html');

  if (process.argv.find(arg => arg === '--debug')) {
    win.webContents.openDevTools();
  }

  ipcMain.handle('window-minimize', () => {
    win.minimize();
  });

  let fullScreen = false;

  ipcMain.handle('window-maximize', () => {
    win.setFullScreen((fullScreen = !fullScreen));
  });

  ipcMain.handle('window-close', () => {
    app.quit();
  });

  ipcMain.handle('file-open', async event => {
    // ファイルを選択
    const paths = dialog.showOpenDialogSync(win, {
      buttonLabel: '開く', // 確認ボタンのラベル
      filters: [{ name: 'OTM-JSON', extensions: ['json'] }],
      properties: [
        'openFile', // ファイルの選択を許可
        'createDirectory', // ディレクトリの作成を許可 (macOS)
      ],
    });

    // キャンセルで閉じた場合
    if (paths === undefined) {
      return { status: undefined };
    }

    // ファイルの内容を返却
    try {
      const filePath = paths[0];
      const buff = readFileSync(filePath);

      return {
        status: true,
        path: filePath,
        text: buff.toString(),
      };
    } catch (error) {
      return { status: false, message: error.message };
    }
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
