import { FileFilter } from "electron";

export type ExtensionProperties = BookControllerInfo | LayoutBuilderInfo;

export interface BookControllerInfo {
  name: string;
  id: string;
  version: string;
  type: 'book-controller';
  filters: FileFilter[];
}

export interface LayoutBuilderInfo {
  name: string;
  id: string;
  version: string;
  type: 'layout-builder';
}
