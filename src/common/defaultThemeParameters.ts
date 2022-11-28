import StyleThemeParameters from './StyleThemeParameters';

const defaultThemeParameters: Required<StyleThemeParameters> = {
  main: 'bg-slate-200 text-slate-700',
  menuBar: 'bg-slate-200',
  statuBar: 'bg-slate-300',
  editor: 'bg-slate-50',
  button: 'text-sm text-blue-500',
  div: '',
  p: 'm-1 text-base text-slate-900',
  span: '',
  lg: 'text-lg text-slate-700',
  base: 'text-base text-slate-700',
  Array: '',
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
  'DraggableArray.Draggable': '',
  'DraggableArray.Draggable.Dragging': '',
  'DraggableArray.Droppable': '',
  'DraggableArray.Droppable.DraggingOver': 'bg-slate-200/30',
  'Menu.root': 'bg-slate-100 text-slate-700 shadow-md m-1 px-2 py-1',
  'Menu.listbox': '',
  Tab: 'h-8 px-2 hover:bg-slate-400/20',
  'Tab.selected': 'h-8 px-2 bg-slate-400/20',
  Tabs: '',
  TabsList: '',
  TabPanel: 'h-full overflow-auto p-3',
};
export default defaultThemeParameters;
