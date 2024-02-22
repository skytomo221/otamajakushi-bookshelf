import { ConfigurationReturns } from 'otamashelf/ExtensionBase';
import { ConfigurationPage } from 'otamashelf/Page';
import { StyleReturns, StyleTheme } from 'otamashelf/StyleTheme';

const configuration: ConfigurationPage = {
  specialPage: 'configuration',
  pageFormat: 'simple-configuration-format-v1',
  data: {},
};

const otamaLightTheme: StyleTheme = {
  properties: {
    name: 'Otama Light Theme',
    id: '@skytomo221/otama-light-theme',
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
        main: 'bg-slate-200 text-slate-700',
        menuBar: 'bg-slate-200',
        statuBar: 'bg-slate-300',
        editor: 'bg-slate-50',
        h2: 'text-5xl text-slate-900',
        h3: 'text-4xl text-slate-900',
        h4: 'text-3xl text-slate-900',
        h5: 'text-2xl text-slate-900',
        h6: 'text-xl text-slate-900',
        span: '',
        lg: 'text-lg text-slate-700',
        base: 'text-base text-slate-700',
        'Menu.root': 'bg-slate-100 text-slate-700 shadow-md m-1 px-2 py-1',
      },
    });
  },
};

export default otamaLightTheme;
