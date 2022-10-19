import { contextBridge, ipcRenderer } from 'electron';

import log from 'electron-log';

import { ExtensionProperties } from '../common/ExtensionProperties';
import { LayoutCard } from '../common/LayoutCard';
import { WordCard } from '../common/WordCard';

import { SummaryWord } from './SummaryWord';


contextBridge.exposeInMainWorld('api', {
  windowMinimize: () => ipcRenderer.invoke('window-minimize'),
  windowMaximize: () => ipcRenderer.invoke('window-maximize'),
  windowClose: () => ipcRenderer.invoke('window-close'),
  open: (id: string): Promise<string[]> => ipcRenderer.invoke('open', id),
  save: (filePath: string): Promise<boolean> =>
    ipcRenderer.invoke('save', filePath),
  readWords: (path: string): Promise<{ form: string; id: string | number }[]> =>
    ipcRenderer.invoke('book-controller:words:read', path),
  readWord: (word: SummaryWord): Promise<LayoutCard> =>
    ipcRenderer.invoke('book-controller:word:read', word),
  updateWord: (summary: SummaryWord, word: WordCard): Promise<LayoutCard> =>
    ipcRenderer.invoke('book-controller:word:update', summary, word),
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
