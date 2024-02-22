import { ConfigurationReturns } from 'otamashelf/ExtensionBase';
import { ConfigurationPage } from 'otamashelf/Page';
import { StyleReturns, StyleTheme } from 'otamashelf/StyleTheme';

const configuration: ConfigurationPage = {
  specialPage: 'configuration',
  pageFormat: 'simple-configuration-format-v1',
  data: {},
};

const otamaDarkTheme: StyleTheme = {
  properties: {
    name: 'Otama Dark Theme',
    id: '@skytomo221/otama-dark-theme',
    version: '1.0.0',
    type: 'style-theme',
    author: 'skytomo221',
  },
  configuration(): ConfigurationReturns {
    return { configuration };
  },
  style(): Promise<StyleReturns> {
    return Promise.resolve({
      style: {
        main: 'bg-slate-800 text-slate-300',
        menuBar: 'bg-slate-800',
        statuBar: 'bg-slate-700',
        editor: 'bg-slate-900',
        h2: 'text-5xl text-slate-100',
        h3: 'text-4xl text-slate-100',
        h4: 'text-3xl text-slate-100',
        h5: 'text-2xl text-slate-100',
        h6: 'text-xl text-slate-100',
        p: 'mx-2 my-1 text-base text-slate-100',
        span: '',
        lg: 'text-lg text-slate-300',
        base: 'text-base text-slate-300',
        'Menu.root': 'bg-slate-800 text-slate-300 shadow-md m-1 px-2 py-1',
      },
    });
  },
};

export default otamaDarkTheme;
