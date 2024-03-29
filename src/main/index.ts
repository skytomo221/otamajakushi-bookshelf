/* eslint-disable global-require */
/* eslint-disable @typescript-eslint/no-var-requires */
import { exec } from 'child_process';
import { app, BrowserWindow, dialog, ipcMain, nativeImage } from 'electron';
import fs from 'node:fs';
import * as net from 'node:net';
import path from 'node:path';

import log from 'electron-log';
import getPort from 'get-port';
import MarkdownIt from 'markdown-it';

import BookController from '../common/BookController';
import { ExtensionProperties } from '../common/ExtensionProperties';
import { PageCard } from '../common/PageCard';
import PageExplorer from '../common/PageExplorer';
import SearchProperites from '../common/SearchProperties';
import StyleTheme from '../common/StyleTheme';
import StyleThemeParameters from '../common/StyleThemeParameters';
import TemplateProperties from '../common/TemplateProperties';
import { Mediator } from '../renderer/Mediator';
import { SummaryWord } from '../renderer/SummaryWord';

import AllPageExplorer from './AllPageExplorer';
import Book from './Book';
import EndsWithPageExplorer from './EndsWithPageExplorer';
import IncludesPageExplorer from './IncludesPageExplorer';
import OtamaDarkTheme from './OtamaDarkTheme';
import OtamaDefaultTheme from './OtamaDefaultTheme';
import OtamaLightTheme from './OtamaLightTheme';
import OtmController from './OtmController';
import OtmLayoutBuilder from './OtmLayoutBuilder';
import RegexPageExplorer from './RegexPageExplorer';
import SocketBookController from './SocketBookController';
import StartsWithPageExplorer from './StartsWithPageExplorer';
import { State } from './State';

const isDevelopment = process.env.NODE_ENV === 'development';

const getResourceDirectory = () =>
  isDevelopment
    ? path.join(process.cwd(), 'dist')
    : path.join(process.resourcesPath, 'app.asar', 'dist');

const createWindow = async () => {
  const mainWindow = new BrowserWindow({
    width: 1200,
    height: 675,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
    },
    frame: false,
    resizable: true,
    icon: nativeImage.createFromPath(
      path.join(getResourceDirectory(), 'assets/otamachan.png'),
    ),
  });
  // eslint-disable-next-line import/extensions, import/no-unresolved
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
      () => new StartsWithPageExplorer(),
      () => new EndsWithPageExplorer(),
      () => new IncludesPageExplorer(),
      () => new RegexPageExplorer(),
    ],
  };
  const md = new MarkdownIt();

  fs.readdir(path.join(__dirname, 'extensions'), (_err, files) => {
    files.forEach(file => {
      const extensionDirectory = path.join(__dirname, 'extensions', file);
      const activateFile = path.join(extensionDirectory, 'activate.json');
      fs.stat(activateFile, async (_err2, stats) => {
        const portNumber = await getPort();
        if (stats.isFile()) {
          const command = JSON.parse(fs.readFileSync(activateFile).toString())
            [process.platform].replace(
              // eslint-disable-next-line no-template-curly-in-string
              '${__dirname}',
              extensionDirectory,
            )
            // eslint-disable-next-line no-template-curly-in-string
            .replace('${portNumber}', portNumber.toString());
          net
            .createServer(socket => {
              socket.once(
                'data',
                async (buffer: { toString: () => string }) => {
                  const { action, data } = JSON.parse(buffer.toString());
                  log.info(buffer.toString());
                  if (action === 'properties') {
                    const properties = data as ExtensionProperties;
                    if (
                      state.extensions.every(
                        async e =>
                          (await e().properties()).id !== properties.id,
                      )
                    ) {
                      state.extensions.push(
                        () => new SocketBookController(socket),
                      );
                      mainWindow.webContents.send(
                        'extensions:send',
                        await Promise.all(
                          state.extensions.map(async extension => {
                            const ext = extension();
                            return ext.properties();
                          }),
                        ),
                      );
                      log.info(
                        `Extension loaded successfully. Extension id: ${properties.id}`,
                      );
                    }
                  }
                },
              );
              socket.write(JSON.stringify({ action: 'properties' }));
            })
            .listen(portNumber);
          exec(command);
          log.info({ activateFile, command, portNumber });
        }
      });
    });
  });

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
  mainWindow.loadFile(path.join(getResourceDirectory(), 'index.html'));

  if (process.argv.find(arg => arg === '--debug')) {
    mainWindow.webContents.openDevTools();
  }

  mainWindow.webContents.on('did-finish-load', async () => {
    mainWindow.webContents.send(
      'extensions:send',
      await Promise.all(
        state.extensions.map(async extension => {
          const ext = extension();
          return ext.properties();
        }),
      ),
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

  ipcMain.handle('new', async (_, id: string): Promise<string[]> => {
    const bookController = state.extensions
      .filter(
        (ext): ext is () => BookController => ext() instanceof BookController,
      )
      .find(async ext => (await ext().properties()).id === id);
    if (!bookController) {
      mainWindow.webContents.send('log:error', `Extension ${id} not found.`);
      return [];
    }
    const properties = await bookController().properties();
    const filePath =
      properties.format === 'file'
        ? dialog.showSaveDialogSync(mainWindow, {
            buttonLabel: '作成する',
            filters: properties.filters,
            properties: ['createDirectory'],
          })
        : dialog.showOpenDialogSync(mainWindow, {
            buttonLabel: '作成する',
            filters: properties.filters,
            properties: ['openDirectory', 'createDirectory'],
          })?.[0];
    if (!filePath) return [];
    try {
      const bc = await bookController().newBook(filePath);
      state.bookshelf.books.push({
        path: filePath,
        bookController: bc,
      });
      return [filePath];
    } catch (error) {
      if (error instanceof Error) {
        mainWindow.webContents.send('log:error', error.message);
      }
    }
    return [];
  });

  ipcMain.handle('open', async (_, id: string): Promise<string[]> => {
    const isEqualToIds = await Promise.all(
      state.extensions.map(async ext => (await ext().properties()).id === id),
    );
    const bookController = state.extensions[
      isEqualToIds.findIndex(b => b)
    ] as () => BookController;
    if (!(bookController() instanceof BookController)) {
      mainWindow.webContents.send(
        'log:error',
        `Extension ${id} is not a book controller.`,
      );
      return [];
    }
    if (!bookController) {
      mainWindow.webContents.send('log:error', `Extension ${id} not found.`);
      return [];
    }
    const properties = await bookController().properties();
    log.info(id);
    log.info(bookController);
    log.info(properties);
    const paths =
      properties.format === 'file'
        ? dialog.showOpenDialogSync(mainWindow, {
            buttonLabel: '開く',
            filters: properties.filters,
            properties: ['openFile', 'createDirectory'],
          })
        : dialog.showOpenDialogSync(mainWindow, {
            buttonLabel: '開く',
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
    'book-controller:templates:read',
    async (_, filePath: string): Promise<TemplateProperties[]> => {
      const book = state.bookshelf.books.find(b => b.path === filePath);
      if (book) {
        return (await book.bookController.readTemplates()).map(word => ({
          bookPath: book.path,
          ...word,
        }));
      }
      throw new Error(`Invalid path: ${filePath}`);
    },
  );

  ipcMain.handle(
    'book-controller:page:create',
    async (_, bookPath: string, templateId: string): Promise<Mediator> => {
      const book = state.bookshelf.books.find(b => b.path === bookPath);
      if (book) {
        const newId = await book.bookController.createPage(templateId);
        const word = await book.bookController.readPage(newId);
        const layout = await new OtmLayoutBuilder().layout(word);
        return {
          summary: { bookPath: book.path, id: word.id },
          word,
          layout,
        };
      }
      throw new Error(`Invalid template: ${templateId}`);
    },
  );

  ipcMain.handle(
    'book-controller:page:delete',
    async (_, summary: SummaryWord): Promise<boolean> => {
      const book = state.bookshelf.books.find(b => b.path === summary.bookPath);
      if (book) {
        return book.bookController.deletePage(summary.id);
      }
      throw new Error(`Invalid word: ${summary}`);
    },
  );

  ipcMain.handle(
    'book-controller:page:read',
    async (_, summary: SummaryWord): Promise<Mediator> => {
      const book = state.bookshelf.books.find(b => b.path === summary.bookPath);
      if (book) {
        const word = await book.bookController.readPage(summary.id.toString());
        const layout = await new OtmLayoutBuilder().layout(word);
        return { summary, word, layout };
      }
      throw new Error(`Invalid word: ${summary}`);
    },
  );

  ipcMain.handle(
    'book-controller:page:select',
    async (
      _,
      bookPath: string,
      pageExplorerId: string,
      searchModeId: string,
      searchWord: string,
    ): Promise<Mediator[]> => {
      const book = state.bookshelf.books.find(b => b.path === bookPath);
      const pageExplorer =
        state.extensions
          .filter(
            (ext): ext is () => PageExplorer => ext() instanceof PageExplorer,
          )
          .find(async p => (await p().properties()).id === pageExplorerId) ??
        (() => new AllPageExplorer());
      if (book) {
        const words = await book.bookController.readPages(
          await pageExplorer().search(
            await book.bookController.readSearchIndexes(searchModeId),
            searchWord,
          ),
        );
        log.info(words);
        const indexes = await new OtmLayoutBuilder().indexes(words);
        return words.map((word, i) => ({
          summary: { id: word.id, bookPath },
          word,
          layout: indexes[i],
        }));
      }
      throw new Error(`Invalid path: ${bookPath}`);
    },
  );

  ipcMain.handle(
    'book-controller:page:update',
    async (_, summary: SummaryWord, word: PageCard): Promise<Mediator> => {
      const book = state.bookshelf.books.find(b => b.path === summary.bookPath);
      if (book) {
        book.bookController.updatePage(word);
        const newWord = await book.bookController.readPage(
          summary.id.toString(),
        );
        const layout = await new OtmLayoutBuilder().layout(newWord);
        return { summary, word: newWord, layout };
      }
      throw new Error(`Invalid word: ${summary} ${word}`);
    },
  );

  ipcMain.handle(
    'book-controller:page:on-click',
    async (_, summary: SummaryWord, onClick: string): Promise<Mediator> => {
      const book = state.bookshelf.books.find(b => b.path === summary.bookPath);
      if (book) {
        const newWord = await book.bookController.onClick(
          onClick,
          Number(summary.id),
        );
        const layout = await new OtmLayoutBuilder().layout(newWord);
        return { summary, word: newWord, layout };
      }
      throw new Error(`Invalid word: ${summary} ${onClick}`);
    },
  );

  ipcMain.handle(
    'book-controller:page-explorer:read',
    async (): Promise<SearchProperites[]> => {
      const pageExplorers = state.extensions.filter(
        (ext): ext is () => PageExplorer => ext() instanceof PageExplorer,
      );
      return Promise.all(
        pageExplorers.map(async pageExplorer => ({
          id: (await pageExplorer().properties()).id,
          displayName: await pageExplorer().name(),
        })),
      );
    },
  );

  ipcMain.handle(
    'book-controller:search-mode:read',
    async (_, bookPath: string): Promise<string[]> => {
      const book = state.bookshelf.books.find(b => b.path === bookPath);
      if (book) {
        return book.bookController.readSearchModes();
      }
      throw new Error(`Invalid path: ${bookPath}`);
    },
  );

  ipcMain.handle(
    'style-theme:apply',
    async (_, id: string): Promise<StyleThemeParameters> => {
      const styleTheme = state.extensions
        .filter((ext): ext is () => StyleTheme => ext() instanceof StyleTheme)
        .find(async ext => (await ext().properties()).id === id);
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
