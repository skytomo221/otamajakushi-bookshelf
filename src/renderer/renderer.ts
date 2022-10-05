import log from 'electron-log';

import { Mediator } from './Mediator';
import { SummaryWord } from './SummaryWord';
import { WordCard } from './WordCard';

declare global {
  interface Window {
    api: Api;
  }
}

export interface Api {
  fileOpen: () => Promise<FileOpenReturn>;
  windowMinimize: () => void;
  windowMaximize: () => void;
  windowClose: () => void;
  readWords: (path: string) => Promise<SummaryWord[]>;
  readWord: (word: SummaryWord) => Promise<Mediator>;
  updateWord: (summary: SummaryWord, word: WordCard) => Promise<Mediator>;
  log: log.ElectronLog & {
    default: log.ElectronLog;
  };
}

export type FileOpenReturn =
  | { status: 'cancel' }
  | { status: 'success'; paths: string[] }
  | { status: 'failure'; message: string };
