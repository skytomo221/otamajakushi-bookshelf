import Extension from './Extension';
import { StyleThemeProperties } from './ExtensionProperties';
import StyleThemeParameters from './StyleThemeParameters';

export default abstract class StyleTheme extends Extension {
  abstract properties(): Promise<StyleThemeProperties>;

  abstract readonly style: () => Promise<StyleThemeParameters>;
}
