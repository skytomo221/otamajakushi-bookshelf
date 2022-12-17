import log from 'electron-log';

import { ExtensionProperties } from '../common/ExtensionProperties';
import StyleThemeParameters from '../common/StyleThemeParameters';
import TemplateProperties from '../common/TemplateProperties';
import { WordCard } from '../common/WordCard';

import { Mediator } from './Mediator';
import { SummaryWord } from './SummaryWord';


declare global {
  interface Window {
    api: Api;
  }
}

export interface Api {
  newBook: (id: string) => Promise<string[]>;
  open: (id: string) => Promise<string[]>;
  save: (filePath: string) => Promise<boolean>;
  windowMinimize: () => void;
  windowMaximize: () => void;
  windowClose: () => void;
  createPage: (bookPath: string, templateId: string) => Promise<Mediator>;
  deletePage: (word: SummaryWord) => Promise<boolean>;
  readIndexes: (path: string) => Promise<SummaryWord[]>;
  readPage: (word: SummaryWord) => Promise<Mediator>;
  readTemplates: (path: string) => Promise<TemplateProperties[]>;
  updatePage: (summary: SummaryWord, word: WordCard) => Promise<Mediator>;
  onClick: (summary: SummaryWord, onClick: string) => Promise<Mediator>;
  applyStyleTheme: (id: string) => Promise<StyleThemeParameters>;
  markdown: (text: string) => string,
  onExtensions: (
    channel: 'extensions:send',
    callback: (
      event: Electron.IpcRendererEvent,
      extensions: ExtensionProperties[],
    ) => void,
  ) => Electron.IpcRenderer;
  onErrorLog: (
    channel: 'log:error',
    callback: (
      event: Electron.IpcRendererEvent,
      log: string,
    ) => void,
  ) => Electron.IpcRenderer;
  log: log.ElectronLog & {
    default: log.ElectronLog;
  };
  on: (
    channel: string,
    callback: (event: Electron.IpcRendererEvent, ...argv: unknown[]) => void,
  ) => Electron.IpcRenderer;
}

export type FileOpenReturn =
  | { status: 'cancel' }
  | { status: 'success'; paths: string[] }
  | { status: 'failure'; message: string };
