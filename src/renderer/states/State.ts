
import { ExtensionInfo } from '../../common/ExtensionInfo';
import { Mediator } from '../Mediator';

import Bookshelf from './Bookshelf';
import ThemeParameter from './ThemeParameter';

export interface State {
  searchWord: string;
  bookshelf: Bookshelf;
  theme: ThemeParameter;
  primarySidebar: null | string;
  secondarySidebar: null | string;
  selectedWords: null | Mediator[];
  extensions: ExtensionInfo[],
}
