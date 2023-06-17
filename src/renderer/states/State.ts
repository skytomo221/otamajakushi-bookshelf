
import { ExtensionProperties } from 'otamashelf';

import { Mediator } from '../Mediator';

import PrimarySidebarStates from './PrimarySidebarState';
import ThemeParameter from './ThemeParameter';
import Workbench from './Workbench';

export interface State {
  workbenches: Workbench[];
  theme: ThemeParameter;
  primarySidebar: PrimarySidebarStates;
  secondarySidebar: null | string;
  selectedWords: null | Mediator[];
  extensions: ExtensionProperties[],
}
