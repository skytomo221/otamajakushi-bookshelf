import { Word } from 'otamajakushi/dist/Word';

import Bookshelf from './Bookshelf';
import ThemeParameter from './ThemeParameter';

export interface State {
  searchWord: string;
  bookshelf: Bookshelf;
  selectedWord: Word;
  theme: ThemeParameter;
}
