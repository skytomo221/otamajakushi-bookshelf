/* eslint-disable global-require */
/* eslint-disable @typescript-eslint/no-var-requires */
import { app, BrowserWindow, dialog, ipcMain, nativeImage } from 'electron';
import path from 'node:path';

import log from 'electron-log';
import MarkdownIt from 'markdown-it';

import BookController from '../common/BookController';
import StyleTheme from '../common/StyleTheme';
import StyleThemeParameters from '../common/StyleThemeParameters';
import { WordCard } from '../common/WordCard';
import { Mediator } from '../renderer/Mediator';
import { SummaryWord } from '../renderer/SummaryWord';

import Book from './Book';
import OtamaDarkTheme from './OtamaDarkTheme';
import OtamaDefaultTheme from './OtamaDefaultTheme';
import OtamaLightTheme from './OtamaLightTheme';
import OtmController from './OtmController';
import OtmLayoutBuilder from './OtmLayoutBuilder';
import { State } from './State';

const createWindow = () => {
  const mainWindow = new BrowserWindow({
    width: 1200,
    height: 675,
    webPreferences: {
      preload: path.join(app.getAppPath(), '../preload.js'),
    },
    frame: false,
    resizable: true,
    icon: nativeImage.createFromPath(path.join(app.getAppPath(), '../assets/otamachan.png')),
  });
  const state: State = {
    bookshelf: {
      books: [],
    },
    extensions: [
      () => new OtmController(),
      () => new OtmLayoutBuilder(),
      () => new OtamaDefaultTheme(),
      () => new OtamaLightTheme(),
      () => new OtamaDarkTheme(),
    ],
  };
  const md = new MarkdownIt();

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

  mainWindow.webContents.on('did-finish-load', () => {
    mainWindow.webContents.send(
      'extensions:send',
      state.extensions.map(extension => {
        const ext = extension();
        return ext.properties;
      }),
    );
  });

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

  ipcMain.handle('open', async (_, id: string): Promise<string[]> => {
    const bookController = state.extensions
      .filter(
        (ext): ext is () => BookController => ext() instanceof BookController,
      )
      .find(ext => ext().properties.id === id);
    if (!bookController) {
      mainWindow.webContents.send('log:error', `Extension ${id} not found.`);
      return [];
    }
    const paths =
      bookController().properties.format === 'file'
        ? dialog.showOpenDialogSync(mainWindow, {
            buttonLabel: '開く',
            filters: bookController().properties.filters,
            properties: ['openFile', 'createDirectory'],
          })
        : dialog.showOpenDialogSync(mainWindow, {
            buttonLabel: '開く',
            filters: bookController().properties.filters,
            properties: ['openDirectory', 'createDirectory'],
          });
    if (!paths) return [];
    try {
      const results: Array<Promise<Book>> = paths.map(
        filePath =>
          new Promise((resolve, reject) => {
            const bc = bookController();
            bc.load(filePath)
              .then(() => {
                resolve({
                  path: filePath,
                  bookController: bc,
                });
              })
              .catch(error => {
                reject(error);
              });
          }),
      );
      const books = await Promise.all(results);
      state.bookshelf.books.push(...books);
      return books.map(book => book.path);
    } catch (error) {
      if (error instanceof Error) {
        mainWindow.webContents.send('log:error', error.message);
      }
    }
    return [];
  });

  ipcMain.handle('save', async (_, filePath: string): Promise<boolean> => {
    const book = state.bookshelf.books.find(b => b.path === filePath);
    if (!book) {
      mainWindow.webContents.send(
        'log:error',
        `File path ${filePath} not found.`,
      );
      return false;
    }
    return book.bookController
      .save(filePath)
      .then(() => true)
      .catch(error => {
        mainWindow.webContents.send('log:error', error.message);
        return false;
      });
  });

  ipcMain.handle(
    'book-controller:words:read',
    async (_, filePath: string): Promise<SummaryWord[]> => {
      const book = state.bookshelf.books.find(b => b.path === filePath);
      if (book) {
        return book.bookController
          .readWords()
          .map(word => ({ bookPath: book.path, ...word }));
      }
      throw new Error(`Invalid path: ${filePath}`);
    },
  );

  ipcMain.handle(
    'book-controller:word:read',
    async (_, summary: SummaryWord): Promise<Mediator> => {
      const book = state.bookshelf.books.find(b => b.path === summary.bookPath);
      if (book) {
        const word = book.bookController.readWord(Number(summary.id));
        const layout = new OtmLayoutBuilder().layout(word);
        return { summary, word, layout };
      }
      throw new Error(`Invalid word: ${summary}`);
    },
  );

  ipcMain.handle(
    'book-controller:word:update',
    async (_, summary: SummaryWord, word: WordCard): Promise<Mediator> => {
      const book = state.bookshelf.books.find(b => b.path === summary.bookPath);
      if (book) {
        book.bookController.updateWord(word);
        const newWord = book.bookController.readWord(Number(summary.id));
        const layout = new OtmLayoutBuilder().layout(newWord);
        return { summary, word: newWord, layout };
      }
      throw new Error(`Invalid word: ${summary} ${word}`);
    },
  );

  ipcMain.handle(
    'book-controller:word:on-click',
    async (_, summary: SummaryWord, onClick: string): Promise<Mediator> => {
      const book = state.bookshelf.books.find(b => b.path === summary.bookPath);
      if (book) {
        const newWord = book.bookController.onClick(onClick, Number(summary.id));
        const layout = new OtmLayoutBuilder().layout(newWord);
        return { summary, word: newWord, layout };
      }
      throw new Error(`Invalid word: ${summary} ${onClick}`);
    },
  );

  ipcMain.handle(
    'style-theme:apply',
    async (_, id: string): Promise<StyleThemeParameters> => {
      const styleTheme = state.extensions
        .filter((ext): ext is () => StyleTheme => ext() instanceof StyleTheme)
        .find(ext => ext().properties.id === id);
      if (!styleTheme) {
        mainWindow.webContents.send('log:error', `Extension ${id} not found.`);
        throw new Error(`Extension ${id} not found.`);
      }
      return styleTheme().style();
    },
  );

  ipcMain.on('markdown', (event: Electron.IpcMainEvent, text: string) => {
    // eslint-disable-next-line no-param-reassign
    event.returnValue = md.render(text);
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
