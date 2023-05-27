import Otamashelf from 'otamashelf/Otamashelf';

import ThemeRegistry, { StyleThemeGenerator } from './ThemeRegistry';

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
      (styleTheme: StyleThemeGenerator) =>
        this.themeRegistry.register(styleTheme),
    );
  }
}
