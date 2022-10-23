import { StyleThemeProperties } from '../common/ExtensionProperties';
import StyleTheme from '../common/StyleTheme';
import StyleThemeParameters from '../common/StyleThemeParameters';

export default class OtamaDarkTheme extends StyleTheme {
  public properties: StyleThemeProperties = {
    name: 'Otama Dark Theme',
    id: 'otama-dark-theme',
    version: '0.1.0',
    type: 'style-theme',
    author: 'skytomo221',
  };

  readonly style = (): StyleThemeParameters => ({
    main: '!bg-slate-900 !text-slate-50',
    menuBar: 'bg-slate-900',
    statuBar: 'bg-slate-900',
    editor: 'bg-slate-800',
    h2: 'text-5xl text-slate-50',
    h3: 'text-4xl text-slate-50',
    h4: 'text-3xl text-slate-50',
    h5: 'text-2xl text-slate-50',
    h6: 'text-xl text-slate-50',
    lg: 'text-lg text-slate-100',
    base: 'text-base text-slate-100',
  });
}
