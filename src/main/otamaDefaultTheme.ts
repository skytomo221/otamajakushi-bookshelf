import { StyleReturns, StyleTheme } from 'otamashelf/StyleTheme';

const otamaDefaultTheme: StyleTheme = {
  properties: {
    name: 'Otama Default Theme',
    id: '@skytomo221/otama-default-theme',
    version: '1.0.0',
    type: 'style-theme',
    author: 'skytomo221',
  },
  defaultConfiguration() {
    return { configuration: {}, configurationsSchema: {} };
  },
  style(): Promise<StyleReturns> {
    return Promise.resolve({
      style: {
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
      },
    });
  },
};

export default otamaDefaultTheme;
