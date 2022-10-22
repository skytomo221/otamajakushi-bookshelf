import { StyleThemeProperties } from '../common/ExtensionProperties';
import StyleTheme from '../common/StyleTheme';
import StyleThemeParameters from '../common/StyleThemeParameters';

export default class OtamaLightTheme extends StyleTheme {
  public properties: StyleThemeProperties = {
    name: 'Otama Light Theme',
    id: 'otama-light-theme',
    version: '0.1.0',
    type: 'style-theme',
    author: 'skytomo221',
  };

  readonly style = (): StyleThemeParameters => ({
    menuBar: 'bg-slate-50',
    statuBar: 'bg-slate-50',
    editor: 'bg-slate-100',
    h2: 'text-5xl text-slate-900',
    h3: 'text-4xl text-slate-900',
    h4: 'text-3xl text-slate-900',
    h5: 'text-2xl text-slate-900',
    h6: 'text-xl text-slate-900',
    lg: 'text-lg text-slate-800',
    base: 'text-base text-slate-800',
  });
}
