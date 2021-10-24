import { Word } from 'otamajakushi/dist/Word';

import { ThemeExtension } from '../extension/theme';

import Bookshelf from './Bookshelf';

export interface State {
  searchWord: string;
  bookshelf: Bookshelf;
  selectedWord: Word;
  theme: ThemeExtension;
}
