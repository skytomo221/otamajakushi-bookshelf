import { contextBridge, ipcRenderer } from 'electron';

import log from 'electron-log';

import { LayoutCard } from './LayoutCard';
import { SummaryWord } from './SummaryWord';

contextBridge.exposeInMainWorld('api', {
  windowMinimize: () => ipcRenderer.invoke('window-minimize'),
  windowMaximize: () => ipcRenderer.invoke('window-maximize'),
  windowClose: () => ipcRenderer.invoke('window-close'),
  fileOpen: (): Promise<string> => ipcRenderer.invoke('file-open'),
  words: (path: string): Promise<{ form: string; id: string | number }[]> =>
    ipcRenderer.invoke('dictionary-words', path),
  word: (word: SummaryWord): Promise<LayoutCard> =>
    ipcRenderer.invoke('dictionary-word', word),
  log,
});
