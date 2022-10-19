import Extension from '../common/Extension';

import Bookshelf from './Bookshelf';

export interface State {
  bookshelf: Bookshelf;
  extensions: (() => Extension)[];
}
