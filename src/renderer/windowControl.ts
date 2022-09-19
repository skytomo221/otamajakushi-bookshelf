import { ipcRenderer } from 'electron';

export const windowMinimize = () => {
  ipcRenderer.invoke('window-minimize');
};

export const windowMaximize = () => {
  ipcRenderer.invoke('window-maximize');
};

export const windowClose = () => {
  ipcRenderer.invoke('window-close');
};
