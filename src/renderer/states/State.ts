
import { ExtensionProperties } from '../../common/ExtensionProperties';
import { Mediator } from '../Mediator';

import Bookshelf from './Bookshelf';
import PrimarySidebarStates from './PrimarySidebarState';
import ThemeParameter from './ThemeParameter';

export interface State {
  searchWord: string;
  bookshelf: Bookshelf;
  theme: ThemeParameter;
  primarySidebar: null | PrimarySidebarStates;
  secondarySidebar: null | string;
  selectedWords: null | Mediator[];
  extensions: ExtensionProperties[],
}
