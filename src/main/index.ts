/* eslint-disable global-require */
/* eslint-disable @typescript-eslint/no-var-requires */
import { app, BrowserWindow, dialog, ipcMain } from 'electron';
import { readFileSync } from 'fs';

import log from 'electron-log';

import OtmLoader from '../otm/OtmLoader';
import { LayoutCard } from '../renderer/LayoutCard';
import { SummaryWord } from '../renderer/SummaryWord';
import { FileOpenReturn } from '../renderer/renderer';

import Book from './Book';
import OtmController from './OtmController';
import OtmLayoutBuilder from './OtmLayoutBuilder';
import { State } from './State';

const createWindow = () => {
  const path = require('path');
  const mainWindow = new BrowserWindow({
    width: 1200,
    height: 675,
    webPreferences: {
      preload: path.join(app.getAppPath(), '../preload.js'),
    },
    frame: false,
    resizable: true,
  });
  const state: State = {
    bookshelf: {
      books: [],
    },
  };

  (() => {
    if (process.argv.find(arg => arg === '--debug')) {
      log.transports.file.level = 'debug';
      log.transports.console.level = 'debug';
    }
    const d = new Date();
    const prefix =
      d.getFullYear() +
      `00${d.getMonth() + 1}`.slice(-2) +
      `00${d.getDate()}`.slice(-2);
    const curr = log.transports.file.fileName;
    log.transports.file.fileName = `${prefix}_${curr}`;
  })();
  log.info('Change filename');

  // 読み込む index.html。
  // tsc でコンパイルするので、出力先の dist の相対パスで指定する。
  mainWindow.loadFile(path.join(__dirname, '../index.html'));

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
      const results: Array<Promise<Book>> = paths.map(
        filePath =>
          new Promise((resolve, reject) => {
            const loader = new OtmLoader(filePath);
            loader
              .asPromise()
              .then(otm =>
                resolve({
                  path: filePath,
                  dictionary: otm,
                }),
              )
              .catch(error => {
                reject(error);
              });
          }),
      );
      (await Promise.all(results)).forEach(book =>
        state.bookshelf.books.push(book),
      );
      return {
        status: 'success',
        paths,
      };
    } catch (error) {
      if (error instanceof Error) {
        return { status: 'failure', message: error.message };
      }
    }
    return { status: 'cancel' };
  });

  ipcMain.handle(
    'dictionary-words',
    async (_, filePath: string): Promise<SummaryWord[]> => {
      const book = state.bookshelf.books.find(b => b.path === filePath);
      return (
        book?.dictionary
          ?.toPlain()
          .words.map(word => ({ bookPath: book.path, ...word.entry })) ?? []
      );
    },
  );

  ipcMain.handle(
    'dictionary-word',
    async (_, word: SummaryWord): Promise<LayoutCard> => {
      const book = state.bookshelf.books.find(b => b.path === word.bookPath);
      if (book) {
        const renderer = new OtmController(book.dictionary).card(
          Number(word.id),
        );
        return OtmLayoutBuilder.layout(word, renderer);
      }
      throw new Error(`Invalid word: ${word}`);
    },
  );
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
