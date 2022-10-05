import { contextBridge, ipcRenderer } from 'electron';

import log from 'electron-log';

import { LayoutCard } from './LayoutCard';
import { SummaryWord } from './SummaryWord';
import { WordCard } from './WordCard';

contextBridge.exposeInMainWorld('api', {
  windowMinimize: () => ipcRenderer.invoke('window-minimize'),
  windowMaximize: () => ipcRenderer.invoke('window-maximize'),
  windowClose: () => ipcRenderer.invoke('window-close'),
  fileOpen: (): Promise<string> => ipcRenderer.invoke('file-open'),
  words: (path: string): Promise<{ form: string; id: string | number }[]> =>
    ipcRenderer.invoke('dictionary-controller:words:read', path),
  word: (word: SummaryWord): Promise<LayoutCard> =>
    ipcRenderer.invoke('dictionary-controller:word:read', word),
  wordUpdate: (summary: SummaryWord, word: WordCard): Promise<LayoutCard> =>
    ipcRenderer.invoke('dictionary-controller:word:update', summary, word),
  log,
});
