import { contextBridge, ipcRenderer } from 'electron';

import log from 'electron-log';
import { Book } from 'otamashelf/Book';
import { Configuration } from 'otamashelf/Configuration';
import { ConfigurationScheme } from 'otamashelf/ConfigurationScheme';
import { ExtensionBaseProperties } from 'otamashelf/ExtensionProperties';
import { LayoutComponent } from 'otamashelf/LayoutCard';
import {
  BookTemplatePage,
  PageTemplatePage,
  Page,
  BookParametersPage,
  NormalPage,
  DescriptionPage,
} from 'otamashelf/Page';
import { PageDisplayInformation } from 'otamashelf/PageDisplayInformation';
import { SearchResult } from 'otamashelf/PageExplorer';
import {
  BookTemplatePageReference,
  NormalPageReference,
  PageTemplatePageReference,
} from 'otamashelf/PageReference';
import { SearchCard } from 'otamashelf/SearchCard';
import { ConvertProps, ConvertReturns } from 'otamashelf/TextConverter';

import StyleThemeParameters from '../common/StyleThemeParameters';

import { Mediator, NormalMediator } from './Mediator';

contextBridge.exposeInMainWorld('api', {
  windowMinimize: () => ipcRenderer.invoke('window-minimize'),
  windowMaximize: () => ipcRenderer.invoke('window-maximize'),
  windowClose: () => ipcRenderer.invoke('window-close'),
  showSaveDialogSync: (): Promise<string | undefined> =>
    ipcRenderer.invoke('show-save-dialog-sync'),
  requestBook: (
    bookCreatorId: string,
  ): Promise<{
    page: BookTemplatePage;
    layout: LayoutComponent;
    index: BookTemplatePageReference;
  }> => ipcRenderer.invoke('book:request', bookCreatorId),
  createBook: (
    pageReference: BookTemplatePageReference,
    book: BookTemplatePage,
    path: string,
  ): Promise<Book> =>
    ipcRenderer.invoke('book:create', pageReference, book, path),
  openBook: (type: 'directory' | 'file'): Promise<string[]> =>
    ipcRenderer.invoke('book:open', type),
  saveBook: (bookPath: string): Promise<boolean> =>
    ipcRenderer.invoke('book:save', bookPath),
  requestPage: (
    bookPath: string,
  ): Promise<{
    page: PageTemplatePage;
    layout: LayoutComponent;
    index: PageTemplatePageReference;
  }> => ipcRenderer.invoke('page:request', bookPath),
  createPage: (
    pageReference: PageTemplatePageReference,
    template: PageTemplatePage,
  ): Promise<NormalMediator> =>
    ipcRenderer.invoke('page:create', pageReference, template),
  readPage: (
    index: PageDisplayInformation,
  ): Promise<{ page: NormalPage; layout: LayoutComponent }> =>
    ipcRenderer.invoke('page:read', index),
  readBookParameters: (bookPath: string): Promise<BookParametersPage> =>
    ipcRenderer.invoke('book-parameters:read', bookPath),
  updateBookParameters: (bookPath: string, parameters: BookParametersPage) =>
    ipcRenderer.invoke('book-parameters:update', bookPath, parameters),
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
  readConfiguration: (): Promise<{
    configuration: Configuration;
    configurationsSchema: ConfigurationScheme;
  }> => ipcRenderer.invoke('configuration:read', bookPath),
  updateConfiguration: (configuration: Configuration): Promise<number> =>
    ipcRenderer.invoke('configuration:update', configuration),
  modifyBook: (
    bookPath: string,
    bookModifierId: string,
    script: JSON,
  ): Promise<boolean> =>
    ipcRenderer.invoke('book:modify', bookPath, bookModifierId, script),
  modifyPagesFromNormalPage: (
    normalPageReference: NormalPageReference,
    pagesModifierId: string,
    script: JSON,
  ): Promise<{ page: NormalPage; layout: LayoutComponent }> =>
    ipcRenderer.invoke(
      'normal-page:modify-with-page',
      normalPageReference,
      pagesModifierId,
      script,
    ),
  modifyPagesFromPageTemplatePage: (
    pageTemplatePageReference: PageTemplatePageReference,
    pageTemplatePage: PageTemplatePage,
    pagesModifierId: string,
    script: JSON,
  ): Promise<{ page: PageTemplatePage; layout: LayoutComponent }> =>
    ipcRenderer.invoke(
      'page-template-page:modify-with-page',
      pageTemplatePageReference,
      pageTemplatePage,
      pagesModifierId,
      script,
    ),
  modifyNormalPage: (
    normalPageReference: NormalPageReference,
    pageModifierId: string,
    script: JSON,
  ): Promise<{ page: NormalPage; layout: LayoutComponent }> =>
    ipcRenderer.invoke(
      'normal-page:modify',
      normalPageReference,
      pageModifierId,
      script,
    ),
  modifyPageTemplatePage: (
    pageTemplatePageReference: PageTemplatePageReference,
    pageTemplatePage: PageTemplatePage,
    pageModifierId: string,
    script: JSON,
  ): Promise<{ page: PageTemplatePage; layout: LayoutComponent }> =>
    ipcRenderer.invoke(
      'page-template-page:modify',
      pageTemplatePageReference,
      pageTemplatePage,
      pageModifierId,
      script,
    ),
  modifyBookTemplatePage: (
    bookTemplatePageReference: BookTemplatePageReference,
    bookTemplatePage: BookTemplatePage,
    script: JSON,
  ): Promise<{ page: BookTemplatePage; layout: LayoutComponent }> =>
    ipcRenderer.invoke(
      'book-template-page:modify',
      bookTemplatePageReference,
      bookTemplatePage,
      script,
    ),
  mofidyDescription: (
    bookPath: string,
    description: string,
    script: JSON,
  ): Promise<string> =>
    ipcRenderer.invoke('description:modify', bookPath, description, script),
  indexAllPages: (
    bookPath: string,
    pageFormat: string,
  ): Promise<PageDisplayInformation[]> =>
    ipcRenderer.invoke('all-pages:index', bookPath, pageFormat),
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
  ): Promise<(SearchCard & SearchResult)[]> =>
    ipcRenderer.invoke(
      'page:search',
      bookPath,
      pageFormat,
      searchIndexGeneratorId,
      pageExplorerId,
      searchWord,
    ),
  deletePage: (normalPageReference: NormalPageReference): Promise<number> =>
    ipcRenderer.invoke('page:delete', normalPageReference),
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
