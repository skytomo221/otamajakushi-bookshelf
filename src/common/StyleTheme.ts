import Extension from './Extension';
import { StyleThemeProperties } from './ExtensionProperties';
import StyleThemeParameters from './StyleThemeParameters';

export default abstract class StyleTheme extends Extension {
  public abstract readonly properties: StyleThemeProperties;

  abstract readonly style: () => StyleThemeParameters;
}
