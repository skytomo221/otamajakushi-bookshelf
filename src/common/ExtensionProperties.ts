export interface FileFilter {
  // Docs: https://electronjs.org/docs/api/structures/file-filter
  extensions: string[];
  name: string;
}

export type ExtensionProperties =
  | BookControllerProperties
  | LayoutBuilderProperties
  | StyleThemeProperties;

export interface BookControllerProperties {
  name: string;
  id: string;
  version: string;
  author: string;
  type: 'book-controller';
  format: 'file' | 'directory';
  filters: FileFilter[];
}

export interface LayoutBuilderProperties {
  name: string;
  id: string;
  version: string;
  author: string;
  type: 'layout-builder';
}

export interface StyleThemeProperties {
  name: string;
  id: string;
  version: string;
  author: string;
  type: 'style-theme';
}
