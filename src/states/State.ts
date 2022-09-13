import { Word } from 'otamajakushi/dist/Word';

import Bookshelf from './Bookshelf';
import SelectedWord from './SelectedWord';
import ThemeParameter from './ThemeParameter';

export interface State {
  searchWord: string;
  bookshelf: Bookshelf;
  theme: ThemeParameter;
  primarySidebar: null | string;
  secondarySidebar: null | string;
  selectedWords: null | SelectedWord[];
}
