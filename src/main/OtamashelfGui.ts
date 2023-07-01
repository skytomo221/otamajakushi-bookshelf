import { ExtensionProperties } from 'otamashelf';
import Otamashelf from 'otamashelf/Otamashelf';

import StyleTheme from '../common/StyleTheme';

import ThemeRegistry from './ThemeRegistry';

export default class OtamashelfGui extends Otamashelf {
  readonly themeRegistry = new ThemeRegistry();

  constructor() {
    super();
    this.commandsRegistry.regesterCommand(
      'otamashelf.themeRegistry.get',
      (name: string) => this.themeRegistry.get(name),
    );
    this.commandsRegistry.regesterCommand(
      'otamashelf.themeRegistry.register',
      (styleTheme: StyleTheme) => this.themeRegistry.register(styleTheme),
    );
    ['error', 'warn', 'info', 'success', 'verbose', 'debug', 'silly'].forEach(command => {
      this.commandsRegistry.regesterCommand(
        `log.${command}`,
        (...message: unknown[]) => this.emit(`log.${command}`, ...message),
      );
    });
  }

  extensionProperties(): ExtensionProperties[] {
    const bookCreatorProperties = Array.from(
      this.bookCreatorsRegistry.keys(),
    ).map(id => {
      const bookCreator = this.bookCreatorsRegistry.get(id);
      if (!bookCreator) {
        throw new Error(`Book creator not found. id: ${id}`);
      }
      return bookCreator.properties;
    });
    const bookIndexersProperties = Array.from(
      this.bookIndexersRegistry.keys(),
    ).map(id => {
      const bookIndexer = this.bookIndexersRegistry.get(id);
      if (!bookIndexer) {
        throw new Error(`Book indexer not found. id: ${id}`);
      }
      return bookIndexer.properties;
    });
    const bookLoadersProperties = Array.from(
      this.bookLoadersRegistry.keys(),
    ).map(id => {
      const bookLoader = this.bookLoadersRegistry.get(id);
      if (!bookLoader) {
        throw new Error(`Book loader not found. id: ${id}`);
      }
      return bookLoader.properties;
    });
    const bookSaversProperties = Array.from(this.bookSaversRegistry.keys()).map(
      id => {
        const bookSaver = this.bookSaversRegistry.get(id);
        if (!bookSaver) {
          throw new Error(`Book saver not found. id: ${id}`);
        }
        return bookSaver.properties;
      },
    );
    const bookUpdatersProperties = Array.from(
      this.bookUpdatersRegistry.keys(),
    ).map(id => {
      const bookUpdater = this.bookUpdatersRegistry.get(id);
      if (!bookUpdater) {
        throw new Error(`Book updater not found. id: ${id}`);
      }
      return bookUpdater.properties;
    });
    const pageCardCreatorsProperties = Array.from(
      this.pageCreatorsRegistry.keys(),
    ).map(id => {
      const pageCardCreator = this.pageCreatorsRegistry.get(id);
      if (!pageCardCreator) {
        throw new Error(`Page card creator not found. id: ${id}`);
      }
      return pageCardCreator.properties;
    });
    const pageCardExplorersProperties = Array.from(
      this.pageExplorersRegistry.keys(),
    ).map(id => {
      const pageCardExploer = this.pageExplorersRegistry.get(id);
      if (!pageCardExploer) {
        throw new Error(`Page card explorer not found. id: ${id}`);
      }
      return pageCardExploer.properties;
    });
    const pageCardProcessorsProperties = Array.from(
      this.pageProcessorsRegistry.keys(),
    ).map(id => {
      const pageCardProcessor = this.pageProcessorsRegistry.get(id);
      if (!pageCardProcessor) {
        throw new Error(`Page card processor not found. id: ${id}`);
      }
      return pageCardProcessor.properties;
    });
    const themeProperties = Array.from(
      this.themeRegistry.keys(),
    ).map(id => {
      const theme = this.themeRegistry.get(id);
      if (!theme) {
        throw new Error(`theme not found. id: ${id}`);
      }
      return theme.properties;
    });
    return [
      ...bookCreatorProperties,
      ...bookIndexersProperties,
      ...bookLoadersProperties,
      ...bookSaversProperties,
      ...bookUpdatersProperties,
      ...pageCardCreatorsProperties,
      ...pageCardExplorersProperties,
      ...pageCardProcessorsProperties,
      ...themeProperties,
    ];
  }
}
