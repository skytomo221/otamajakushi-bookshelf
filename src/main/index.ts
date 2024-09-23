/* eslint-disable global-require */
/* eslint-disable @typescript-eslint/no-var-requires */
import { exec } from 'child_process';
import { app, BrowserWindow, dialog, ipcMain, nativeImage } from 'electron';
import fs from 'node:fs';
import path from 'node:path';

import log from 'electron-log';
import getPort from 'get-port';
import MarkdownIt from 'markdown-it';
import { Book } from 'otamashelf/Book';
import { Json } from 'otamashelf/Json';
import Otamashelf from 'otamashelf/Otamashelf';
import {
  BookParametersPage,
  BookTemplatePage,
  DescriptionPage,
  NormalPage,
  Page,
  PageTemplatePage,
} from 'otamashelf/Page';
import { ConvertReturns } from 'otamashelf/TextConverter';
import { endsWithPageExplorer } from 'otamashelf/extensions/endsWithPageExplorer';
import { includesPageExplorer } from 'otamashelf/extensions/includesPageExplorer';
import { otmAddContentPageModifier } from 'otamashelf/extensions/otmAddContentPageModifier';
import { otmBothSearchIndexGenerator } from 'otamashelf/extensions/otmBothSearchIndexGenerator';
import { otmCreator } from 'otamashelf/extensions/otmCreator';
import { otmDiscriminator } from 'otamashelf/extensions/otmDiscriminator';
import { otmLayoutBuilder } from 'otamashelf/extensions/otmLayoutBuilder';
import { otmLoader } from 'otamashelf/extensions/otmLoader';
import { otmPageCreator } from 'otamashelf/extensions/otmPageCreator';
import { otmPagesIndexer } from 'otamashelf/extensions/otmPagesIndexer';
import { otmRemoveContentPageModifier } from 'otamashelf/extensions/otmRemoveContentPageModifier';
import { otmRenumberModifier } from 'otamashelf/extensions/otmRenumberModifier';
import { otmSaver } from 'otamashelf/extensions/otmSaver';
import { otmTranslationSearchIndexGenerator } from 'otamashelf/extensions/otmTranslationSearchIndexGenerator';
import { startsWithPageExplorer } from 'otamashelf/extensions/startsWithPageExplorer';
import OtamashelfServer from 'otamashelf-extension/OtamashelfServer';

import StyleThemeParameters from '../common/StyleThemeParameters';

import regexPageExplorer from './RegexPageExplorer';
import markdownTextConverter from './markdownTextConverter';
import otamaDarkTheme from './otamaDarkTheme';
import otamaDefaultTheme from './otamaDefaultTheme';
import otamaLightTheme from './otamaLightTheme';
import { Configuration } from 'otamashelf/Configuration';
import { NormalPageReference } from 'otamashelf/PageReference';

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
  const otamashelf = new Otamashelf();
  otamashelf.registerExtension(endsWithPageExplorer);
  otamashelf.registerExtension(includesPageExplorer);
  otamashelf.registerExtension(markdownTextConverter);
  otamashelf.registerExtension(otamaDarkTheme);
  otamashelf.registerExtension(otamaDefaultTheme);
  otamashelf.registerExtension(otamaLightTheme);
  otamashelf.registerExtension(otmAddContentPageModifier);
  otamashelf.registerExtension(otmBothSearchIndexGenerator);
  otamashelf.registerExtension(otmCreator);
  otamashelf.registerExtension(otmDiscriminator);
  otamashelf.registerExtension(otmLayoutBuilder);
  otamashelf.registerExtension(otmLoader);
  otamashelf.registerExtension(otmPageCreator);
  otamashelf.registerExtension(otmPagesIndexer);
  otamashelf.registerExtension(otmRemoveContentPageModifier);
  otamashelf.registerExtension(otmRenumberModifier);
  otamashelf.registerExtension(otmSaver);
  otamashelf.registerExtension(otmTranslationSearchIndexGenerator);
  otamashelf.registerExtension(regexPageExplorer);
  otamashelf.registerExtension(startsWithPageExplorer);
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
    otamashelf.emit(
      'log.verbose',
      `The extensions directory does exist: ${extensionsDirectoryPath}.`,
    );
  } else {
    otamashelf.emit(
      'log.verbose',
      `The extensions directory does not exist: ${extensionsDirectoryPath}.`,
    );
    fs.mkdirSync(extensionsDirectoryPath);
    otamashelf.emit(
      'log.verbose',
      `Created the extensions directory: ${extensionsDirectoryPath}.`,
    );
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
          const server = new OtamashelfServer({ port: portNumber });
          server.on('error', error => otamashelf.emit('log.error', error));
          server.on('connection', ws => {
            otamashelf.emit('log.verbose', 'Extension client connected.');
            ws.on('message', message =>
              otamashelf.emit('log.verbose', message.toString()),
            );
            ws.onRegisteringExtension(
              extension => {
                otamashelf.emit('log.verbose', 'extension →', extension);
                otamashelf.emit(
                  'log.verbose',
                  'extension.configuration() →',
                  extension.configuration(),
                );
              },
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              message =>
                otamashelf.emit('log.verbose', (message as any).toString()),
            );
          });
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
    /* nothing to do */
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

  ipcMain.handle(
    'book:request',
    (_, bookCreatorId: string): Promise<BookTemplatePage> =>
      otamashelf.requestNewBook(bookCreatorId),
  );

  ipcMain.handle(
    'book:create',
    (_, bookCreatorId: string, template: BookTemplatePage): Promise<Book> =>
      otamashelf.createBook(bookCreatorId, template),
  );

  ipcMain.handle(
    'book:open',
    async (_, type: 'directory' | 'file'): Promise<string[]> => {
      const paths =
        type === 'file'
          ? dialog.showOpenDialogSync(mainWindow, {
              buttonLabel: '開く',
              properties: ['openFile', 'createDirectory'],
            })
          : dialog.showOpenDialogSync(mainWindow, {
              buttonLabel: '開く',
              properties: ['openDirectory', 'createDirectory'],
            });
      if (!paths) return [];
      try {
        const books = await Promise.all(
          paths.map(bookPath => otamashelf.openBook(bookPath, type)),
        );
        return books.map(book => book.fileFormat.path);
      } catch (error) {
        if (error instanceof Error) {
          otamashelf.emit('log.error', error.message);
        }
      }
      return [];
    },
  );

  ipcMain.handle(
    'book:save',
    async (_, filePath: string): Promise<boolean> =>
      otamashelf
        .saveBook(filePath)
        .then(() => Promise.resolve(true))
        .catch(() => Promise.resolve(false)),
  );

  ipcMain.handle(
    'page:request',
    (_, bookPath: string): Promise<PageTemplatePage> =>
      otamashelf.requestNewPage(bookPath),
  );

  ipcMain.handle(
    'page:create',
    (_, bookPath: string, template: PageTemplatePage): Promise<Page> =>
      otamashelf.createPage(bookPath, template),
  );

  ipcMain.handle(
    'page:read',
    async (_, normalPageReference: NormalPageReference) =>
      otamashelf.readPage(normalPageReference),
  );

  ipcMain.handle('book-parameters:read', (_, bookPath: string) =>
    otamashelf.readBookParameters(bookPath),
  );

  ipcMain.handle(
    'book-parameters:update',
    async (_, bookPath: string, parameters: BookParametersPage) =>
      otamashelf.updateBookParameters(bookPath, parameters),
  );

  ipcMain.handle('description:read', async (_, bookPath: string) =>
    otamashelf.readDescription(bookPath),
  );

  ipcMain.handle(
    'page:update',
    async (_, bookPath: string, page: NormalPage) => {
      otamashelf.updatePage(bookPath, page);
      return otamashelf.readPage({ type: 'normal', bookPath, pageId: page.id });
    },
  );

  ipcMain.handle('configuraion:read', async () =>
    otamashelf.configurationsRegistry.get(),
  );

  ipcMain.handle(
    'configuraion:update',
    async (_, configuration: Configuration) =>
      otamashelf.updateConfiguration(configuration),
  );

  ipcMain.handle(
    'description:update',
    async (_, bookPath: string, description: DescriptionPage) =>
      otamashelf.updateDescription(bookPath, description),
  );

  ipcMain.handle(
    'book:modify',
    async (_, bookPath: string, bookModifierId: string, script: Json) => {
      otamashelf.modifyBook(bookPath, bookModifierId, script);
      return true;
    },
  );

  ipcMain.handle(
    'pages:modify',
    async (
      _,
      bookPath: string,
      pageId: string,
      pagesModifierId: string,
      script: Json,
    ) => otamashelf.modifyPages(bookPath, pageId, pagesModifierId, script),
  );

  ipcMain.handle(
    'page:modify',
    async (
      _,
      bookPath: string,
      pageId: string,
      pageModifierId: string,
      script: Json,
    ) => {
      log.info('page:modify', bookPath, pageId, pageModifierId, script);
      return otamashelf.modifyPage(bookPath, pageId, pageModifierId, script);
    },
  );

  ipcMain.handle(
    'description:modify',
    async (_, bookPath: string, description: DescriptionPage, script: Json) =>
      otamashelf.modifyDescription(bookPath, description, script),
  );

  ipcMain.handle(
    'all-pages:index',
    async (_, bookPath: string, pageFormat: string) =>
      otamashelf.indexAllPages(bookPath, pageFormat),
  );

  ipcMain.handle(
    'search-index:generate',
    async (
      _,
      bookPath: string,
      pageFormat: string,
      searchIndexGeneratorId: string,
    ) =>
      otamashelf.generateSearchIndex(
        bookPath,
        pageFormat,
        searchIndexGeneratorId,
      ),
  );

  ipcMain.handle('search-criterion:all', async () =>
    otamashelf.searchCriterion(),
  );

  ipcMain.handle('search-scope:all', async (_, pageFormat: string) =>
    otamashelf.searchScopes(pageFormat),
  );

  ipcMain.handle(
    'page:search',
    async (
      _,
      bookPath: string,
      pageFormat: string,
      searchIndexGeneratorId: string,
      pageExplorerId: string,
      searchWord: string,
    ) =>
      otamashelf.search(
        bookPath,
        pageFormat,
        searchIndexGeneratorId,
        pageExplorerId,
        searchWord,
      ),
  );

  ipcMain.handle(
    'page:delete',
    async (_, normalPageReference: NormalPageReference): Promise<number> =>
      otamashelf.deletePage(normalPageReference),
  );

  ipcMain.handle('page-format:all', async (_, bookPath: string) => {
    const bookTimeMachine = otamashelf.booksController.getOrThrow(bookPath);
    const { currentBook } = bookTimeMachine;
    return Array.from(new Set(currentBook.pages.map(p => p.pageFormat)));
  });

  ipcMain.handle('style-theme:all', async () =>
    otamashelf.styleThemes.map(s => s.properties),
  );

  ipcMain.handle(
    'style-theme:apply',
    async (_, id: string): Promise<StyleThemeParameters> => {
      const styleTheme = otamashelf.styleThemes.findById(id);
      if (!styleTheme) {
        otamashelf.emit('log.error', `Extension ${id} not found.`);
        throw new Error(`Extension ${id} not found.`);
      }
      const { style } = await styleTheme.style();
      return style;
    },
  );

  ipcMain.handle(
    'text-converter:convert',
    async (_, mime: string, text: string): Promise<ConvertReturns> => {
      const textConverter = otamashelf.textConverters.find(
        tc => tc.properties.mime === mime,
      );
      if (!textConverter) {
        otamashelf.emit('log.error', `${mime} converter not found.`);
        throw new Error(`${mime} converter not found.`);
      }
      const { configuration } = otamashelf.configurationsRegistry.get();
      return textConverter.convert({ text, configuration });
    },
  );

  ipcMain.handle('book-creator:all', async () =>
    otamashelf.bookCreators.map(c => c.properties),
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
