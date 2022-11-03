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
    main: 'bg-slate-800 text-slate-300',
    menuBar: 'bg-slate-800',
    statuBar: 'bg-slate-700',
    editor: 'bg-slate-900',
    h2: 'text-5xl text-slate-100',
    h3: 'text-4xl text-slate-100',
    h4: 'text-3xl text-slate-100',
    h5: 'text-2xl text-slate-100',
    h6: 'text-xl text-slate-100',
    lg: 'text-lg text-slate-300',
    base: 'text-base text-slate-300',
    'Menu.root': 'bg-slate-900 text-slate-300 shadow-md shadow-slate-800 m-1 px-2 py-1',
  });
}
