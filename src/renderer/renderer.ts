import log from 'electron-log';
import { ExtensionBaseProperties } from 'otamashelf/ExtensionProperties';
import { Json } from 'otamashelf/Json';
import { LayoutComponent } from 'otamashelf/LayoutCard';
import { TemplatePage, Page, ConfigurationPage } from 'otamashelf/Page';
import { SearchResult } from 'otamashelf/PageExplorer';
import { PageProperties } from 'otamashelf/PageProperties';
import { SearchCard } from 'otamashelf/SearchCard';
import { ConvertProps, ConvertReturns } from 'otamashelf/TextConverter';

import StyleThemeParameters from '../common/StyleThemeParameters';

import { Mediator } from './Mediator';

declare global {
  interface Window {
    api: Api;
  }
}

export type Api = {
  newBook: (id: string) => Promise<string[]>;
  open: (id: string) => Promise<string[]>;
  save: (filePath: string) => Promise<boolean>;
  windowMinimize: () => void;
  windowMaximize: () => void;
  windowClose: () => void;
  requestBook: (bookCreatorId: string) => Promise<TemplatePage>;
  createBook: (
    bookCreatorId: string,
    book: TemplatePage,
  ) => Promise<TemplatePage>;
  openBook: (type: 'directory' | 'file') => Promise<string[]>;
  saveBook: (bookPath: string) => Promise<boolean>;
  requestPage: (bookPath: string) => Promise<TemplatePage>;
  createPage: (bookPath: string, template: TemplatePage) => Promise<Page>;
  readPage: (index: PageProperties) => Promise<Mediator>;
  readConfiguration: (
    bookPath: string,
  ) => Promise<{ page: ConfigurationPage; layout: LayoutComponent }>;
  readDescription: (bookPath: string) => Promise<string>;
  updatePage: (bookPath: string, page: Page) => Promise<number>;
  updateDescription: (bookPath: string, description: string) => Promise<number>;
  updateExtensionConfiguration: (
    extensionId: string,
    configuration: ConfigurationPage,
  ) => Promise<number>;
  modifyPage: (
    bookPath: string,
    pageId: string,
    script: Json,
  ) => Promise<Mediator>;
  mofidyDescription: (
    bookPath: string,
    description: string,
    script: Json,
  ) => Promise<string>;
  generateIndex: (
    bookPath: string,
    pageFormat: string,
  ) => Promise<PageProperties[]>;
  generateSearchIndex: (
    bookPath: string,
    pageFormat: string,
    searchIndexGeneratorId: string,
  ) => Promise<SearchCard[]>;
  readSearchCriteria: () => Promise<{ id: string; name: string }[]>;
  readSearchScopes: (
    pageFormat: string,
  ) => Promise<{ id: string; name: string }[]>;
  searchPage: (
    bookPath: string,
    pageFormat: string,
    searchIndexGeneratorId: string,
    pageExplorerId: string,
    searchWord: string,
  ) => Promise<SearchResult[]>;
  deletePage: (bookPath: string, index: PageProperties) => Promise<boolean>;
  readAllPageFormats: (bookPath: string) => Promise<string[]>;
  readAllStyleThemes: () => Promise<
    (ExtensionBaseProperties & { type: 'style-theme' })[]
  >;
  applyStyleTheme: (id: string) => Promise<StyleThemeParameters>;
  convertTextConverter: (
    id: string,
    props: ConvertProps,
  ) => Promise<ConvertReturns>;
  readAllBookCreators: () => Promise<
    (ExtensionBaseProperties & { bookFormatPattern: string } & {
      type: 'book-creator';
    })[]
  >;
  onDefaultLog: (
    channel: 'log:default',
    callback: (event: Electron.IpcRendererEvent, log: string) => void,
  ) => Electron.IpcRenderer;
  onErrorLog: (
    channel: 'log:error',
    callback: (event: Electron.IpcRendererEvent, log: string) => void,
  ) => Electron.IpcRenderer;
  onInfoLog: (
    channel: 'log:info',
    callback: (event: Electron.IpcRendererEvent, log: string) => void,
  ) => Electron.IpcRenderer;
  onSuccessLog: (
    channel: 'log:success',
    callback: (event: Electron.IpcRendererEvent, log: string) => void,
  ) => Electron.IpcRenderer;
  onWarningLog: (
    channel: 'log:warning',
    callback: (event: Electron.IpcRendererEvent, log: string) => void,
  ) => Electron.IpcRenderer;
  log: log.ElectronLog & {
    default: log.ElectronLog;
  };
  on: (
    channel: string,
    callback: (event: Electron.IpcRendererEvent, ...argv: unknown[]) => void,
  ) => Electron.IpcRenderer;
};

export type FileOpenReturn =
  | { status: 'cancel' }
  | { status: 'success'; paths: string[] }
  | { status: 'failure'; message: string };
