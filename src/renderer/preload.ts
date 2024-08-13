import { contextBridge, ipcRenderer } from 'electron';

import log from 'electron-log';
import { ExtensionBaseProperties } from 'otamashelf/ExtensionProperties';
import { LayoutComponent } from 'otamashelf/LayoutCard';
import { ConfigurationPage, DescriptionPage, NormalPage, Page, TemplatePage } from 'otamashelf/Page';
import { SearchResult } from 'otamashelf/PageExplorer';
import { PageProperties } from 'otamashelf/PageProperties';
import { SearchCard } from 'otamashelf/SearchCard';
import { ConvertProps, ConvertReturns } from 'otamashelf/TextConverter';

import StyleThemeParameters from '../common/StyleThemeParameters';

import { Mediator } from './Mediator';

contextBridge.exposeInMainWorld('api', {
  windowMinimize: () => ipcRenderer.invoke('window-minimize'),
  windowMaximize: () => ipcRenderer.invoke('window-maximize'),
  windowClose: () => ipcRenderer.invoke('window-close'),
  requestBook: (bookCreatorId: string): Promise<TemplatePage> =>
    ipcRenderer.invoke('book:request', bookCreatorId),
  createBook: (
    bookCreatorId: string,
    book: TemplatePage,
  ): Promise<TemplatePage> =>
    ipcRenderer.invoke('book:create', bookCreatorId, book),
  openBook: (type: 'directory' | 'file'): Promise<string[]> =>
    ipcRenderer.invoke('book:open', type),
  saveBook: (bookPath: string): Promise<boolean> =>
    ipcRenderer.invoke('book:save', bookPath),
  requestPage: (bookPath: string): Promise<TemplatePage> =>
    ipcRenderer.invoke('page:request', bookPath),
  createPage: (bookPath: string, template: TemplatePage): Promise<Page> =>
    ipcRenderer.invoke('page:create', bookPath, template),
  readPage: (
    index: PageProperties,
  ): Promise<{ page: NormalPage; layout: LayoutComponent }> =>
    ipcRenderer.invoke('page:read', index),
  readConfiguration: (
    bookPath: string,
  ): Promise<{ page: ConfigurationPage; layout: LayoutComponent }> =>
    ipcRenderer.invoke('configuration:read', bookPath),
  readDescription: (
    bookPath: string,
  ): Promise<{ page: DescriptionPage; layout: LayoutComponent }> =>
    ipcRenderer.invoke('description:read', bookPath),
  updatePage: (
    bookPath: string,
    page: Page,
  ): Promise<{ page: NormalPage; layout: LayoutComponent }> =>
    ipcRenderer.invoke('page:update', bookPath, page),
  updateDescription: (bookPath: string, description: string): Promise<number> =>
    ipcRenderer.invoke('description:update', bookPath, description),
  updateExtensionConfiguration: (
    extensionId: string,
    configuration: ConfigurationPage,
  ): Promise<number> =>
    ipcRenderer.invoke(
      'extension-configuration:update',
      extensionId,
      configuration,
    ),
  modifyBook: (
    bookPath: string,
    bookModifierId: string,
    script: JSON,
  ): Promise<boolean> =>
    ipcRenderer.invoke('book:modify', bookPath, bookModifierId, script),
  modifyPages: (
    bookPath: string,
    pageId: string,
    pagesModifierId: string,
    script: JSON,
  ): Promise<boolean> =>
    ipcRenderer.invoke(
      'book:modify-with-page',
      bookPath,
      pageId,
      pagesModifierId,
      script,
    ),
  modifyPage: (
    bookPath: string,
    pageId: string,
    pageModifierId: string,
    script: JSON,
  ): Promise<{ page: NormalPage; layout: LayoutComponent }> =>
    ipcRenderer.invoke('page:modify', bookPath, pageId, pageModifierId, script),
  mofidyDescription: (
    bookPath: string,
    description: string,
    script: JSON,
  ): Promise<string> =>
    ipcRenderer.invoke('description:modify', bookPath, description, script),
  generateIndex: (
    bookPath: string,
    pageFormat: string,
  ): Promise<PageProperties[]> =>
    ipcRenderer.invoke('index:generate', bookPath, pageFormat),
  generateSearchIndex: (
    bookPath: string,
    pageFormat: string,
    searchIndexGeneratorId: string,
  ): Promise<SearchCard[]> =>
    ipcRenderer.invoke(
      'search-index:generate',
      bookPath,
      pageFormat,
      searchIndexGeneratorId,
    ),
  readAllSearchCriteria: (): Promise<{ id: string; name: string }[]> =>
    ipcRenderer.invoke('search-criterion:all'),
  readAllSearchScopes: (
    pageFormat: string,
  ): Promise<{ id: string; name: string }[]> =>
    ipcRenderer.invoke('search-scope:all', pageFormat),
  searchPage: (
    bookPath: string,
    pageFormat: string,
    searchIndexGeneratorId: string,
    pageExplorerId: string,
    searchWord: string,
  ): Promise<SearchResult[]> =>
    ipcRenderer.invoke(
      'page:search',
      bookPath,
      pageFormat,
      searchIndexGeneratorId,
      pageExplorerId,
      searchWord,
    ),
  deletePage: (bookPath: string, index: PageProperties): Promise<boolean> =>
    ipcRenderer.invoke('page:delete', bookPath, index),
  readAllPageFormats: (bookPath: string): Promise<string[]> =>
    ipcRenderer.invoke('page-format:all', bookPath),
  readAllStyleThemes: (): Promise<
    (ExtensionBaseProperties & { type: 'style-theme' })[]
  > => ipcRenderer.invoke('style-theme:all'),
  applyStyleTheme: (id: string): Promise<StyleThemeParameters> =>
    ipcRenderer.invoke('style-theme:apply', id),
  convertMime: (mime: string, text: string): Promise<ConvertReturns> =>
    ipcRenderer.invoke('text-converter:convert', mime, text),
  readAllBookCreators: (): Promise<
    (ExtensionBaseProperties & { bookFormatPattern: string } & {
      type: 'book-creator';
    })[]
  > => ipcRenderer.invoke('book-creator:all'),
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
