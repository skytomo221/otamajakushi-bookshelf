import { ExtensionProperties } from 'otamashelf';

export type O20fExtensionProperties =
  | ExtensionProperties
  | StyleThemeProperties;

export interface StyleThemeProperties {
  action: 'properties';
  name: string;
  id: string;
  version: string;
  author: string;
  type: 'style-theme';
}
