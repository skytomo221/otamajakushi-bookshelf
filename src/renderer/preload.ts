import { contextBridge, ipcRenderer } from 'electron';

import log from 'electron-log';
import { ExtensionProperties, LayoutCard, PageCard } from 'otamashelf';
import TemplateProperties from 'otamashelf/TemplateProperties';

import SearchProperties from '../common/SearchProperties';
import StyleThemeParameters from '../common/StyleThemeParameters';

import { Mediator } from './Mediator';
import { SummaryWord } from './SummaryWord';

contextBridge.exposeInMainWorld('api', {
  windowMinimize: () => ipcRenderer.invoke('window-minimize'),
  windowMaximize: () => ipcRenderer.invoke('window-maximize'),
  windowClose: () => ipcRenderer.invoke('window-close'),
  newBook: (id: string): Promise<string[]> => ipcRenderer.invoke('new', id),
  open: (id: string): Promise<string[]> => ipcRenderer.invoke('open', id),
  save: (filePath: string): Promise<boolean> =>
    ipcRenderer.invoke('save', filePath),
  createPage: (bookPath: string, templateId: string): Promise<Mediator> =>
    ipcRenderer.invoke('book-controller:page:create', bookPath, templateId),
  deletePage: (word: SummaryWord): Promise<boolean> =>
    ipcRenderer.invoke('book-controller:page:delete', word),
  selectPage: (
    bookPath: string,
    pageExplorerId: string,
    searchModeId: string,
    searchWord: string,
  ): Promise<Mediator[]> =>
    ipcRenderer.invoke(
      'book-controller:page:select',
      bookPath,
      pageExplorerId,
      searchModeId,
      searchWord,
    ),
  readPage: (word: SummaryWord): Promise<LayoutCard> =>
    ipcRenderer.invoke('book-controller:page:read', word),
  readPageExplorer: (): Promise<SearchProperties[]> =>
    ipcRenderer.invoke('book-controller:page-explorer:read'),
  readSearchMode: (bookPath: string): Promise<string[]> =>
    ipcRenderer.invoke('book-controller:search-mode:read', bookPath),
  readTemplates: (word: SummaryWord): Promise<TemplateProperties[]> =>
    ipcRenderer.invoke('book-controller:templates:read', word),
  updatePage: (summary: SummaryWord, word: PageCard): Promise<LayoutCard> =>
    ipcRenderer.invoke('book-controller:page:update', summary, word),
  onClick: (summary: SummaryWord, onClick: string): Promise<Mediator> =>
    ipcRenderer.invoke('book-controller:page:on-click', summary, onClick),
  applyStyleTheme: (id: string): Promise<StyleThemeParameters> =>
    ipcRenderer.invoke('style-theme:apply', id),
  markdown: (text: string) => ipcRenderer.sendSync('markdown', text),
  onExtensions: (
    channel: 'extensions:send',
    callback: (
      event: Electron.IpcRendererEvent,
      extensions: ExtensionProperties[],
    ) => void,
  ) => ipcRenderer.on(channel, (event, argv) => callback(event, argv)),
  onDefaultLog: (
    channel: 'log:default',
    callback: (event: Electron.IpcRendererEvent, log: string) => void,
  ) => ipcRenderer.on(channel, (event, argv) => callback(event, argv)),
  onErrorLog: (
    channel: 'log:error',
    callback: (event: Electron.IpcRendererEvent, log: string) => void,
  ) => ipcRenderer.on(channel, (event, argv) => callback(event, argv)),
  onInfoLog: (
    channel: 'log:info',
    callback: (event: Electron.IpcRendererEvent, log: string) => void,
  ) => ipcRenderer.on(channel, (event, argv) => callback(event, argv)),
  onSuccessLog: (
    channel: 'log:success',
    callback: (event: Electron.IpcRendererEvent, log: string) => void,
  ) => ipcRenderer.on(channel, (event, argv) => callback(event, argv)),
  onWarningLog: (
    channel: 'log:warning',
    callback: (event: Electron.IpcRendererEvent, log: string) => void,
  ) => ipcRenderer.on(channel, (event, argv) => callback(event, argv)),
  log,
  on: (
    channel: string,
    callback: (event: Electron.IpcRendererEvent, ...argv: unknown[]) => void,
  ) => ipcRenderer.on(channel, (event, argv) => callback(event, argv)),
});
