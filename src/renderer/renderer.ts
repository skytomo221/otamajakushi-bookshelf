import log from 'electron-log';
import { Book } from 'otamashelf/Book';
import { Configuration } from 'otamashelf/Configuration';
import { ConfigurationScheme } from 'otamashelf/ConfigurationScheme';
import { ExtensionBaseProperties } from 'otamashelf/ExtensionProperties';
import { Json } from 'otamashelf/Json';
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
import { BookTemplatePageReference, NormalPageReference, PageTemplatePageReference } from 'otamashelf/PageReference';
import { SearchCard } from 'otamashelf/SearchCard';
import { ConvertReturns } from 'otamashelf/TextConverter';

import StyleThemeParameters from '../common/StyleThemeParameters';

import { Mediator, NormalMediator } from './Mediator';


declare global {
  interface Window {
    api: Api;
  }
}

export type Api = {
  windowMinimize: () => void;
  windowMaximize: () => void;
  windowClose: () => void;
  showSaveDialogSync: () => Promise<string | undefined>;
  requestBook: (bookCreatorId: string) => Promise<{
    page: BookTemplatePage;
    layout: LayoutComponent;
    index: BookTemplatePageReference;
  }>;
  createBook: (
    pageReference: BookTemplatePageReference,
    book: BookTemplatePage,
    path: string,
  ) => Promise<Book>;
  openBook: (type: 'directory' | 'file') => Promise<string[]>;
  saveBook: (bookPath: string) => Promise<boolean>;
  requestPage: (bookPath: string) => Promise<{
    page: PageTemplatePage;
    layout: LayoutComponent;
    index: PageTemplatePageReference;
  }>;
  createPage: (
    pageReference: PageTemplatePageReference,
    template: PageTemplatePage,
  ) => Promise<NormalMediator>;
  readPage: (
    normalPageReference: NormalPageReference,
  ) => Promise<{ page: NormalPage; layout: LayoutComponent }>;
  readBookParameters: (bookPath: string) => Promise<BookParametersPage>;
  updateBookParameters: (
    bookPath: string,
    parameters: BookParametersPage,
  ) => Promise<number>;
  readConfiguration: () => Promise<{
    configuration: Configuration;
    configurationsSchema: ConfigurationScheme;
  }>;
  readDescription: (
    bookPath: string,
  ) => Promise<{ page: DescriptionPage; layout: LayoutComponent }>;
  updatePage: (
    bookPath: string,
    page: Page,
  ) => Promise<{ page: NormalPage; layout: LayoutComponent }>;
  updateDescription: (bookPath: string, description: string) => Promise<number>;
  updateConfiguration: (configuration: Configuration) => Promise<number>;
  modifyBook: (
    bookPath: string,
    bookModifierId: string,
    script: Json,
  ) => Promise<{ page: NormalPage; layout: LayoutComponent }>;
  modifyPagesFromNormalPage: (
    normalPageReference: NormalPageReference,
    pagesModifierId: string,
    script: Json,
  ) => Promise<{ page: NormalPage; layout: LayoutComponent }>;
  modifyPagesFromPageTemplatePage: (
    pageTemplatePageReference: PageTemplatePageReference,
    pageTemplatePage: PageTemplatePage,
    pagesModifierId: string,
    script: Json,
  ) => Promise<{ page: PageTemplatePage; layout: LayoutComponent }>;
  modifyNormalPage: (
    normalPageReference: NormalPageReference,
    pageModifierId: string,
    script: Json,
  ) => Promise<{ page: NormalPage; layout: LayoutComponent }>;
  modifyPageTemplatePage: (
    pageTemplatePageReference: PageTemplatePageReference,
    pageTemplatePage: PageTemplatePage,
    pageModifierId: string,
    script: Json,
  ) => Promise<{ page: PageTemplatePage; layout: LayoutComponent }>;
  modifyBookTemplatePage: (
    bookTemplatePageReference: BookTemplatePageReference,
    bookTemplatePage: BookTemplatePage,
    script: Json,
  ) => Promise<{ page: BookTemplatePage; layout: LayoutComponent }>;
  mofidyDescription: (
    bookPath: string,
    description: string,
    script: Json,
  ) => Promise<string>;
  indexAllPages: (
    bookPath: string,
    pageFormat: string,
  ) => Promise<(NormalPageReference & PageDisplayInformation)[]>;
  generateSearchIndex: (
    bookPath: string,
    pageFormat: string,
    searchIndexGeneratorId: string,
  ) => Promise<SearchCard[]>;
  readAllSearchCriteria: () => Promise<{ id: string; name: string }[]>;
  readAllSearchScopes: (
    pageFormat: string,
  ) => Promise<{ id: string; name: string }[]>;
  searchPage: (
    bookPath: string,
    pageFormat: string,
    searchIndexGeneratorId: string,
    pageExplorerId: string,
    searchWord: string,
  ) => Promise<(SearchCard & SearchResult)[]>;
  deletePage: (normalPageReference: NormalPageReference) => Promise<number>;
  readAllPageFormats: (bookPath: string) => Promise<string[]>;
  readAllStyleThemes: () => Promise<
    (ExtensionBaseProperties & { type: 'style-theme' })[]
  >;
  applyStyleTheme: (id: string) => Promise<StyleThemeParameters>;
  convertMime: (mime: string, text: string) => Promise<ConvertReturns>;
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
