import { Word } from 'otamajakushi/dist/Word';

import Bookshelf from './Bookshelf';

export interface State {
  searchWord: string;
  bookshelf: Bookshelf;
  selectedWord: Word;
}
