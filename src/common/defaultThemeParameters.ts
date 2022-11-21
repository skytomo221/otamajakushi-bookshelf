import StyleThemeParameters from './StyleThemeParameters';

const defaultThemeParameters: Required<StyleThemeParameters> = {
  main: 'bg-slate-200 text-slate-700',
  menuBar: 'bg-slate-200',
  statuBar: 'bg-slate-300',
  editor: 'bg-slate-50',
  button: 'text-sm text-blue-500',
  div: '',
  h2: 'text-5xl text-slate-900',
  h3: 'text-4xl text-slate-900',
  h4: 'text-3xl text-slate-900',
  h5: 'text-2xl text-slate-900',
  h6: 'text-xl text-slate-900',
  span: '',
  lg: 'text-lg text-slate-700',
  base: 'text-base text-slate-700',
  Chip: 'bg-slate-400 rounded-full text-base',
  'Chip.Key': '',
  'Chip.Value': 'bg-slate-50 rounded-r-full',
  ControlBox: 'flex [-webkit-app-region:no-drag]',
  'ControlBox.MinimizeButton':
    'flex items-center justify-center w-10 hover:bg-slate-400/20',
  'ControlBox.MaximizeButton':
    'flex items-center justify-center w-10 hover:bg-slate-400/20',
  'ControlBox.CloseButton':
    'flex items-center justify-center w-10 hover:bg-[#ff0000]',
  'Menu.root': 'bg-slate-100 text-slate-700 shadow-md m-1 px-2 py-1',
  'Menu.listbox': '',
};
export default defaultThemeParameters;
