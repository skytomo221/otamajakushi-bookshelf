import { actionCreatorFactory } from 'typescript-fsa';

import Bookshelf from '../states/Bookshelf';

const actionCreator = actionCreatorFactory('bookshelf-action');

export const addBookAction = actionCreator<Partial<Bookshelf>>(
  'add-book',
);

export const removeBookAction = actionCreator<Partial<Bookshelf>>(
  'remove-book',
);
