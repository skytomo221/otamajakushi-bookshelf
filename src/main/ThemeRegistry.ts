import Registry from 'otamashelf/Registry';

import { StyleThemeProperties } from '../common/O20fExtensionProperties';
import StyleTheme from '../common/StyleTheme';
import StyleThemeParameters from '../common/StyleThemeParameters';

export default class ThemeRegistry<
  K extends string,
  V extends StyleTheme,
> extends Registry<K, V> {
  properties(): IterableIterator<StyleThemeProperties> {
    return super.properties() as IterableIterator<StyleThemeProperties>;
  }

  public style(id: K): Promise<StyleThemeParameters> {
    const v = this.get(id);
    if (!v) return Promise.reject(new Error('StyleTheme not found.'));
    return v.style();
  }
}
