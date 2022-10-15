import Bookshelf from './Bookshelf';
import Extension from './Extension';

export interface State {
  bookshelf: Bookshelf;
  extensions: (() => Extension)[];
}
