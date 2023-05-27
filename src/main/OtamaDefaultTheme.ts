import { StyleThemeProperties } from '../common/ExtensionProperties';
import StyleTheme from '../common/StyleTheme';
import StyleThemeParameters from '../common/StyleThemeParameters';

export default class OtamaDefaultTheme extends StyleTheme {
  public properties: StyleThemeProperties = {
    name: 'Otama Default Theme',
    id: 'otama-default-theme',
    version: '0.1.0',
    type: 'style-theme',
    author: 'skytomo221',
  };

  readonly style = async (): Promise<StyleThemeParameters> => ({
    main: '',
    menuBar: 'bg-blue-500',
    statuBar: 'bg-slate-300',
    editor: '',
    h2: 'text-5xl',
    h3: 'text-4xl',
    h4: 'text-3xl',
    h5: 'text-2xl',
    h6: 'text-xl',
    span: '',
    lg: 'text-lg',
    base: 'text-base',
    'Menu.root': 'bg-slate-100 shadow-md m-1 px-2 py-1',
  });
}
