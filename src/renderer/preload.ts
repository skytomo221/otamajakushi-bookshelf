import { contextBridge, ipcRenderer } from 'electron';

import log from 'electron-log';

import { ExtensionProperties } from '../common/ExtensionProperties';
import { LayoutCard } from '../common/LayoutCard';
import { PageCard } from '../common/PageCard';
import StyleThemeParameters from '../common/StyleThemeParameters';
import TemplateProperties from '../common/TemplateProperties';

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
  readIndexes: (path: string): Promise<{ form: string; id: string | number }[]> =>
    ipcRenderer.invoke('book-controller:indexes:read', path),
  readPage: (word: SummaryWord): Promise<LayoutCard> =>
    ipcRenderer.invoke('book-controller:page:read', word),
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
  onErrorLog: (
    channel: 'log:error',
    callback: (event: Electron.IpcRendererEvent, log: string) => void,
  ) => ipcRenderer.on(channel, (event, argv) => callback(event, argv)),
  log,
  on: (
    channel: string,
    callback: (event: Electron.IpcRendererEvent, ...argv: unknown[]) => void,
  ) => ipcRenderer.on(channel, (event, argv) => callback(event, argv)),
});
