import log from 'electron-log';

import { LayoutCard } from './LayoutCard';
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
  words: (path: string) => Promise<SummaryWord[]>;
  word: (word: SummaryWord) => Promise<LayoutCard>;
  wordUpdate: (summary: SummaryWord, word: WordCard) => Promise<LayoutCard>;
  log: log.ElectronLog & {
    default: log.ElectronLog;
  };
}

export type FileOpenReturn =
  | { status: 'cancel' }
  | { status: 'success'; paths: string[] }
  | { status: 'failure'; message: string };
