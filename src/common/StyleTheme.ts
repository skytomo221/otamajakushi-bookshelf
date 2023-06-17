import Extension from 'otamashelf/Extension';
import { StyleThemeProperties } from 'otamashelf/ExtensionProperties';

import StyleThemeParameters from './StyleThemeParameters';

export default abstract class StyleTheme extends Extension {
  abstract readonly properties: StyleThemeProperties;

  abstract readonly style: () => Promise<StyleThemeParameters>;
}
