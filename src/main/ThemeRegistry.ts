import StyleTheme from '../common/StyleTheme';

export type StyleThemeGenerator = () => StyleTheme;

export default class ThemeRegistry {
  protected readonly themes: Map<string, StyleThemeGenerator> = new Map();

  public register(styleThemeGenerator: StyleThemeGenerator): void {
    const { id } = styleThemeGenerator().properties;
    this.themes.set(id, styleThemeGenerator);
  }

  public get(id: string): StyleTheme | undefined {
    const styleTheme = this.themes.get(id);
    if (!styleTheme) return undefined;
    return styleTheme();
  }
}
