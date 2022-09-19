export interface Api {
  fileOpen: () => Promise<FileOpenReturn>;
  windowMinimize: () => void;
  windowMaximize: () => void;
  windowClose: () => void;
}

export type FileOpenReturn =
  | { status: 'cancel' }
  | { status: 'success'; path: string; text: string }
  | { status: 'failure'; message: string };
