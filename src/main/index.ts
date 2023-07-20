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
import { ExtensionProperties } from 'otamashelf';
import { BookWithPath } from 'otamashelf/Book';
import BookTimeMachine from 'otamashelf/BookTimeMachine';
import { PageCard } from 'otamashelf/PageCard';
import TemplateProperties from 'otamashelf/TemplateProperties';
import EndsWithPageExplorer from 'otamashelf/extensions/EndsWithPageExplorer';
import IncludesPageExplorer from 'otamashelf/extensions/IncludesPageExplorer';
import OtmCreator from 'otamashelf/extensions/OtmCreator';
import OtmIndexer from 'otamashelf/extensions/OtmIndexer';
import OtmLayoutBuilder from 'otamashelf/extensions/OtmLayoutBuilder';
import OtmLoader from 'otamashelf/extensions/OtmLoader';
import OtmPageCreator from 'otamashelf/extensions/OtmPageCreator';
import OtmSaver from 'otamashelf/extensions/OtmSaver';
import OtmUpdater from 'otamashelf/extensions/OtmUpdater';
import StartsWithPageExplorer from 'otamashelf/extensions/StartsWithPageExplorer';

import SearchProperites from '../common/SearchProperties';
import StyleThemeParameters from '../common/StyleThemeParameters';
import { Mediator } from '../renderer/Mediator';
import { SummaryWord } from '../renderer/SummaryWord';

import OtamaDarkTheme from './OtamaDarkTheme';
import OtamaDefaultTheme from './OtamaDefaultTheme';
import OtamaLightTheme from './OtamaLightTheme';
import OtamashelfGui from './OtamashelfGui';
import RegexPageExplorer from './RegexPageExplorer';
import SocketBookCreator from './SocketBookCreator';
import SocketBookIndexer from './SocketBookIndexer';
import SocketBookLoader from './SocketBookLoader';
import SocketBookSaver from './SocketBookSaver';
import SocketBookUpdater from './SocketBookUpdater';
import SocketLayoutBuilder from './SocketLayoutBuilder';
import SocketPageCreator from './SocketPageCreator';
import SocketPageExplorer from './SocketPageExplorer';
import SocketPageProcessor from './SocketPageProcessor';

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
  const otamashelf = new OtamashelfGui();
  // otamashelf.executeCommand(
  //   'otamashelf.booksController.register',
  //   new OtmController(),
  // );
  otamashelf.themeRegistry.register(new OtamaDarkTheme());
  otamashelf.layoutBuilderRegistry.register(new OtmLayoutBuilder());
  otamashelf.themeRegistry.register(new OtamaDefaultTheme());
  otamashelf.themeRegistry.register(new OtamaLightTheme());
  otamashelf.themeRegistry.register(new OtamaDarkTheme());
  otamashelf.bookCreatorsRegistry.register(new OtmCreator());
  otamashelf.bookIndexersRegistry.register(new OtmIndexer());
  otamashelf.bookLoadersRegistry.register(new OtmLoader());
  otamashelf.bookSaversRegistry.register(new OtmSaver());
  otamashelf.bookUpdatersRegistry.register(new OtmUpdater());
  otamashelf.pageCreatorsRegistry.register(new OtmPageCreator());
  otamashelf.pageExplorersRegistry.register(new StartsWithPageExplorer());
  otamashelf.pageExplorersRegistry.register(new EndsWithPageExplorer());
  otamashelf.pageExplorersRegistry.register(new IncludesPageExplorer());
  otamashelf.executeCommand(
    'otamashelf.pageExploeresRegistry.register',
    new RegexPageExplorer(),
  );
  otamashelf.on('log.error', (...message) => {
    log.error(...message);
    mainWindow.webContents.send('log:error', message.toString());
  });
  otamashelf.on('log.warn', (...message) => {
    log.warn(...message);
    mainWindow.webContents.send('log:warning', message.toString());
  });
  otamashelf.on('log.info', (...message) => {
    log.info(...message);
    mainWindow.webContents.send('log:error', message.toString());
  });
  otamashelf.on('log.success', (...message) => {
    log.info(...message);
    mainWindow.webContents.send('log:success', message.toString());
  });
  otamashelf.on('log.verbose', (...message) => {
    log.verbose(...message);
    mainWindow.webContents.send('log:default', message.toString());
  });
  otamashelf.on('log.debug', log.debug);
  otamashelf.on('log.silly', log.silly);
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
    otamashelf.emit('log.info', `The log file renamed ${prefix}_${curr}`);
  })();
  otamashelf.emit(
    'log.success',
    `Welcome to Otamajakushi Bookshelf ${process.env.npm_package_version}!
    ╭───────┬──╮                      ╭──╮     ╭──╮              ╭──╮  ╭──╮
    │   ┬   │  └─.───.─.────────.───.─┼──.───.─│  ├──.──.──.─────┤  └──┼──┤
    │.  │   │   ─┤  ─  │  ╷  ╷  │  ─  │  │  ─  │    <│  │  │__ ──┤  ╷  │  │
    │.  │   │────┴───.─┴──┴──┴──┴───.─┤  │───.─┴──┴──┴─────┴─────┴──┴──┴──┘
    │:  ┴   │                        ╭┘  │
    │::.. . │ ╭───────╮           ╭──╰───╯    ╭──╮        ╭──┬────╮
    ╰───────╯ │ ╭┬┬┬╮ .─────.─────┤  ├──.─────│  └──.─────┤  │   ─┤
              │.╰┴┴┴╯ │  ─  │  ─  │    <│__ ──┤  ╷  │  ─__│  │  ┌─┘
              │.╭┬┬┬╮ ├─────┴─────┴──┴──┴─────┴──┴──┴─────┴──┴──┘  ${process.env.npm_package_version}
              │:╰┴┴┴╯ ╰────╮
              │::.. . O20f │
              ╰────────────╯
    Repository URL: https://github.com/skytomo221/otamajakushi-bookshelf
    Please submit it to Issues in the repository above if you have a problem.

    Otamajakushi Bookshelf ${process.env.npm_package_version}へようこそ！
    次のリポジトリで開発を行っています：https://github.com/skytomo221/otamajakushi-bookshelf
    問題がある場合は、上記のリポジトリの Issues に投稿してください。`,
  );
  const md = new MarkdownIt();

  const extensionsDirectoryPath = path.join(__dirname, 'extensions');
  if (fs.existsSync(extensionsDirectoryPath)) {
    otamashelf.emit('log.verbose', `The extensions directory does exist: ${extensionsDirectoryPath}.`);
  } else {
    otamashelf.emit('log.verbose', `The extensions directory does not exist: ${extensionsDirectoryPath}.`);
    fs.mkdirSync(extensionsDirectoryPath);
    otamashelf.emit('log.verbose', `Created the extensions directory: ${extensionsDirectoryPath}.`);
  }
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
                    switch (properties.type) {
                      case 'book-creator':
                        if (!otamashelf.bookCreatorsRegistry.has(properties.id))
                          otamashelf.bookCreatorsRegistry.register(
                            new SocketBookCreator(properties, socket),
                          );
                        break;
                      case 'book-indexer':
                        if (!otamashelf.bookIndexersRegistry.has(properties.id))
                          otamashelf.bookIndexersRegistry.register(
                            new SocketBookIndexer(properties, socket),
                          );
                        break;
                      case 'book-loader':
                        if (!otamashelf.bookLoadersRegistry.has(properties.id))
                          otamashelf.bookLoadersRegistry.register(
                            new SocketBookLoader(properties, socket),
                          );
                        break;
                      case 'book-saver':
                        if (!otamashelf.bookSaversRegistry.has(properties.id))
                          otamashelf.bookSaversRegistry.register(
                            new SocketBookSaver(properties, socket),
                          );
                        break;
                      case 'book-updater':
                        if (!otamashelf.bookUpdatersRegistry.has(properties.id))
                          otamashelf.bookUpdatersRegistry.register(
                            new SocketBookUpdater(properties, socket),
                          );
                        break;
                      case 'layout-builder':
                        if (
                          !otamashelf.layoutBuilderRegistry.has(properties.id)
                        )
                          otamashelf.layoutBuilderRegistry.register(
                            new SocketLayoutBuilder(properties, socket),
                          );
                        break;
                      case 'page-creator':
                        if (!otamashelf.pageCreatorsRegistry.has(properties.id))
                          otamashelf.pageCreatorsRegistry.register(
                            new SocketPageCreator(properties, socket),
                          );
                        break;
                      case 'page-explorer':
                        if (
                          !otamashelf.pageExplorersRegistry.has(properties.id)
                        )
                          otamashelf.pageExplorersRegistry.register(
                            new SocketPageExplorer(properties, socket),
                          );
                        break;
                      case 'page-processor':
                        if (
                          !otamashelf.pageProcessorsRegistry.has(properties.id)
                        )
                          otamashelf.pageProcessorsRegistry.register(
                            new SocketPageProcessor(properties, socket),
                          );
                        break;
                      default:
                        break;
                    }
                    mainWindow.webContents.send(
                      'extensions:send',
                      otamashelf.extensionProperties(),
                    );
                    log.info(
                      `Extension loaded successfully. Extension id: ${properties.id}`,
                    );
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

  // 読み込む index.html。
  // tsc でコンパイルするので、出力先の dist の相対パスで指定する。
  mainWindow.loadFile(path.join(getResourceDirectory(), 'index.html'));

  if (process.argv.find(arg => arg === '--debug')) {
    mainWindow.webContents.openDevTools();
  }

  mainWindow.webContents.on('did-finish-load', async () => {
    const extensionProperties = otamashelf.extensionProperties();
    log.info(extensionProperties);
    mainWindow.webContents.send('extensions:send', extensionProperties);
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
    const bookCreator = otamashelf.bookCreatorsRegistry.get(id);
    if (!bookCreator) {
      otamashelf.emit('log.error', `Book creator not found. id: ${id}`);
      return [];
    }
    const { format, filters } = bookCreator.properties;
    const templatesReturns = await bookCreator.templates({
      action: 'templates',
    });
    if (templatesReturns.status === 'reject') {
      otamashelf.emit('log.error', templatesReturns.returns.reason);
      return [];
    }
    const { book } = templatesReturns.returns;
    const filePath =
      format === 'file'
        ? dialog.showSaveDialogSync(mainWindow, {
            buttonLabel: '作成する',
            filters,
            properties: ['createDirectory'],
          })
        : dialog.showOpenDialogSync(mainWindow, {
            buttonLabel: '作成する',
            filters,
            properties: ['openDirectory', 'createDirectory'],
          })?.[0];
    if (!filePath) return [];
    const bookWithPath = { path: filePath, ...book };
    try {
      otamashelf.booksController.regesterBook(bookWithPath);
      return [filePath];
    } catch (error) {
      if (error instanceof Error) {
        otamashelf.emit('log.error', error.message);
      }
    }
    return [];
  });

  ipcMain.handle('open', async (_, id: string): Promise<string[]> => {
    const bookLoader = otamashelf.bookLoadersRegistry.get(id);
    if (!bookLoader) {
      otamashelf.emit('log.error', `Book loader not found. id: ${id}`);
      return [];
    }
    const { format, filters } = bookLoader.properties;
    const paths =
      format === 'file'
        ? dialog.showOpenDialogSync(mainWindow, {
            buttonLabel: '開く',
            filters,
            properties: ['openFile', 'createDirectory'],
          })
        : dialog.showOpenDialogSync(mainWindow, {
            buttonLabel: '開く',
            properties: ['openDirectory', 'createDirectory'],
          });
    if (!paths) return [];
    try {
      const results: Array<Promise<BookWithPath>> = paths.map(
        filePath =>
          new Promise((resolve, reject) => {
            bookLoader
              .load({
                action: 'load',
                path: filePath,
              })
              .then(returns => {
                if (returns.status === 'reject') {
                  reject(returns.returns.reason);
                  return;
                }
                const { book } = returns.returns;
                otamashelf.booksController.regesterBook({
                  path: filePath,
                  ...book,
                });
                resolve({
                  path: filePath,
                  ...book,
                });
              })
              .catch(error => {
                reject(error);
              });
          }),
      );
      const books = await Promise.all(results);
      return books.map(book => book.path);
    } catch (error) {
      if (error instanceof Error) {
        otamashelf.emit('log.error', error.message);
      }
    }
    return [];
  });

  ipcMain.handle('save', async (_, filePath: string): Promise<boolean> => {
    const bookRepository =
      otamashelf.booksController.getBookRepository(filePath);
    if (!bookRepository) {
      otamashelf.emit('log.error', `File path ${filePath} not found.`);
      return false;
    }
    const book = bookRepository.plainBookTimeMachine.currentBook;
    if (!book) {
      otamashelf.emit('log.error', `File path ${filePath} not found.`);
      return false;
    }
    const bookSaver = await otamashelf.bookSaversRegistry.get('otm-saver');
    if (!bookSaver) {
      otamashelf.emit('log.error', `Book saver not found. id: otm-saver`);
      return false;
    }
    const returns = await bookSaver.save({
      action: 'save',
      book: { path: filePath, ...book },
    });
    const { status } = returns;
    if (status === 'reject') {
      otamashelf.emit('log.error', returns.returns.reason);
      return false;
    }
    return true;
  });

  ipcMain.handle(
    'book-controller:templates:read',
    async (_, filePath: string): Promise<TemplateProperties[]> => {
      const bookRepository =
        otamashelf.booksController.getBookRepository(filePath);
      if (!bookRepository) {
        otamashelf.emit('log.error', `File path ${filePath} not found.`);
        throw new Error(`Invalid path: ${filePath}`);
      }
      const book = bookRepository.plainBookTimeMachine.currentBook;
      if (!book) {
        otamashelf.emit('log.error', `File path ${filePath} not found.`);
        throw new Error(`Invalid path: ${filePath}`);
      }
      const templatesReturns = await otamashelf.pageCreatorsRegistry.templates(
        'otm-page-creator',
        { action: 'templates' },
      );
      if (templatesReturns.status === 'reject') {
        otamashelf.emit('log.error', templatesReturns.returns.reason);
        throw new Error(`Invalid path: ${filePath}`);
      }
      const { templates } = templatesReturns.returns;
      return templates.map(template => ({
        id: template,
        name: template,
      }));
    },
  );

  ipcMain.handle(
    'book-controller:page:create',
    async (_, bookPath: string, templateId: string): Promise<Mediator> => {
      const pageCardCreator = otamashelf.pageCreatorsRegistry.get(
        'otm-page-creator',
      );
      if (!pageCardCreator) {
        otamashelf.emit(
          'log.error',
          `Page card creator not found. id: ${bookPath}`,
        );
        throw new Error(`Invalid path: ${bookPath}`);
      }
      const bookRepository =
        otamashelf.booksController.getBookRepository(bookPath);
      if (!bookRepository) {
        otamashelf.emit('log.error', `File path ${bookPath} not found.`);
        throw new Error(`Invalid path: ${bookPath}`);
      }
      const book = bookRepository.plainBookTimeMachine.currentBook;
      if (!book) {
        otamashelf.emit('log.error', `File path ${bookPath} not found.`);
        throw new Error(`Invalid path: ${bookPath}`);
      }
      const creatorReturns = await pageCardCreator.create({
        action: 'create',
        templateId,
        book,
      });
      if (creatorReturns.status === 'reject') {
        otamashelf.emit('log.error', creatorReturns.returns.reason);
        throw new Error(`Invalid path: ${bookPath}`);
      }
      const { pageCard } = creatorReturns.returns;
      const layout = await new OtmLayoutBuilder().layout(pageCard);
      return {
        summary: { bookPath, id: pageCard.id },
        word: pageCard,
        layout,
      };
    },
  );

  ipcMain.handle(
    'book-controller:page:delete',
    async (_, summary: SummaryWord): Promise<boolean> => {
      const { bookPath, id } = summary;
      const bookRepository =
        otamashelf.booksController.getBookRepository(bookPath);
      if (!bookRepository) {
        otamashelf.emit('log.error', `File path ${bookPath} not found.`);
        throw new Error(`Invalid path: ${bookPath}`);
      }
      const bookTimeMachine = BookTimeMachine.fromPlain(
        bookRepository.plainBookTimeMachine,
      );
      const pageCard = bookTimeMachine.currentBook.pageCards.find(
        pc => pc.id === id,
      );
      if (!pageCard) {
        otamashelf.emit('log.error', `Page card id ${id} not found.`);
        throw new Error(`Invalid word: ${summary}`);
      }
      bookTimeMachine.removePageCard(pageCard, 'remove page card');
      return true;
    },
  );

  ipcMain.handle(
    'book-controller:page:read',
    async (_, summary: SummaryWord): Promise<Mediator> => {
      const book = otamashelf.booksController.getBookRepository(
        summary.bookPath,
      );
      if (!book) {
        otamashelf.emit(
          'log.error',
          `File path ${summary.bookPath} not found.`,
        );
        throw new Error(`Invalid path: ${summary.bookPath}`);
      }
      const word = await book.plainBookTimeMachine.currentBook.pageCards.find(
        w => w.id === summary.id.toString(),
      );
      if (!word) {
        otamashelf.emit('log.error', `Page card id ${summary.id} not found.`);
        throw new Error(`Invalid word: ${summary}`);
      }
      const layout = await new OtmLayoutBuilder().layout(word);
      return { summary, word, layout };
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
      const book = otamashelf.booksController.getBookRepository(bookPath);
      if (!book) {
        otamashelf.emit('log.error', `File path ${bookPath} not found.`);
        throw new Error(`Invalid path: ${bookPath}`);
      }
      const { pageCards } = book.plainBookTimeMachine.currentBook;
      const pageExplorer = otamashelf.pageExplorersRegistry.get(pageExplorerId);
      if (!pageExplorer) {
        otamashelf.emit(
          'log.error',
          `Page explorer not found. id: ${pageExplorerId}`,
        );
        throw new Error(`Invalid path: ${bookPath}`);
      }
      const readSearchIndexes =
        await otamashelf.bookIndexersRegistry.readSearchIndexes('otm-indexer', {
          action: 'search-indexes',
          searchModeId,
          pageCards,
        });
      if (readSearchIndexes.status === 'reject') {
        otamashelf.emit('log.error', readSearchIndexes.returns.reason);
        throw new Error(`Invalid path: ${bookPath}`);
      }
      const { searchCards } = readSearchIndexes.returns;
      const search = await pageExplorer.search({
        action: 'search',
        cards: searchCards,
        searchWord,
      });
      if (search.status === 'reject') {
        otamashelf.emit('log.error', search.returns.reason);
        throw new Error(`Invalid path: ${bookPath}`);
      }
      const { ids } = search.returns;
      const words = pageCards.filter(pc => ids.includes(pc.id));
      const indexes = await new OtmLayoutBuilder().indexes(words);
      return words.map((word, i) => ({
        summary: { id: word.id, bookPath },
        word,
        layout: indexes[i],
      }));
    },
  );

  ipcMain.handle(
    'book-controller:page:update',
    async (_, summary: SummaryWord, word: PageCard): Promise<Mediator> => {
      otamashelf.booksController.commitPageCard(
        summary.bookPath,
        word,
        'update page card',
      );
      const newWord = otamashelf.booksController
        .currentBook(summary.bookPath)
        .pageCards.find(w => w.id === summary.id.toString());
      if (!newWord) {
        otamashelf.emit('log.error', `Page card id ${summary.id} not found.`);
        throw new Error(`Invalid word: ${summary}`);
      }
      const layout = await new OtmLayoutBuilder().layout(newWord);
      return { summary, word: newWord, layout };
    },
  );

  ipcMain.handle(
    'book-controller:page:on-click',
    async (_, summary: SummaryWord, onClick: string): Promise<Mediator> => {
      const { bookPath, id } = summary;
      const book = otamashelf.booksController.getBookRepository(bookPath);
      if (!book) {
        otamashelf.emit('log.error', `File path ${bookPath} not found.`);
        throw new Error(`Invalid path: ${bookPath}`);
      }
      const pageCardProcessor = otamashelf.pageProcessorsRegistry.get(onClick);
      if (!pageCardProcessor) {
        otamashelf.emit(
          'log.error',
          `Page card processor not found. id: ${onClick}`,
        );
        throw new Error(`Invalid path: ${bookPath}`);
      }
      const word = book.plainBookTimeMachine.currentBook.pageCards.find(
        w => w.id === id,
      );
      if (!word) {
        otamashelf.emit('log.error', `Page card id ${id} not found.`);
        throw new Error(`Invalid word: ${summary}`);
      }
      const processPage = await pageCardProcessor.processPage({
        action: 'process-page',
        pageCard: word,
      });
      if (processPage.status === 'reject') {
        otamashelf.emit('log.error', processPage.returns.reason);
        throw new Error(`Invalid path: ${bookPath}`);
      }
      const { pageCard } = processPage.returns;
      const layout = await new OtmLayoutBuilder().layout(pageCard);
      return { summary, word: pageCard, layout };
    },
  );

  ipcMain.handle(
    'book-controller:page-explorer:read',
    async (): Promise<SearchProperites[]> => {
      const pageExplorers = Array.from(otamashelf.pageExplorersRegistry.keys());
      return Promise.all(
        pageExplorers.map(async pageExplorer => {
          const pe = otamashelf.pageExplorersRegistry.get(pageExplorer);
          if (!pe) {
            throw new Error(`Invalid page explorer: ${pageExplorer}`);
          }
          return {
            id: pageExplorer,
            displayName: pe.properties.name,
          };
        }),
      );
    },
  );

  ipcMain.handle(
    'book-controller:search-mode:read',
    async (_, bookPath: string): Promise<string[]> => {
      const bookRepository =
        otamashelf.booksController.getBookRepository(bookPath);
      if (!bookRepository) {
        otamashelf.emit('log.error', `File path ${bookPath} not found.`);
        throw new Error(`Invalid path: ${bookPath}`);
      }
      const bookIndexer = otamashelf.bookIndexersRegistry.get('otm-indexer');
      if (!bookIndexer) {
        otamashelf.emit('log.error', `File path ${bookPath} not found.`);
        throw new Error(`Invalid path: ${bookPath}`);
      }
      const searchModes = await bookIndexer.readSearchModes({
        action: 'search-modes',
      });
      if (searchModes.status === 'reject') {
        otamashelf.emit('log.error', `File path ${bookPath} not found.`);
        throw new Error(`Invalid path: ${bookPath}`);
      }
      const { modes } = searchModes.returns;
      return modes;
    },
  );

  ipcMain.handle(
    'style-theme:apply',
    async (_, id: string): Promise<StyleThemeParameters> => {
      const styleTheme = otamashelf.themeRegistry.get(id);
      if (!styleTheme) {
        otamashelf.emit('log.error', `Extension ${id} not found.`);
        throw new Error(`Extension ${id} not found.`);
      }
      return styleTheme.style();
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
