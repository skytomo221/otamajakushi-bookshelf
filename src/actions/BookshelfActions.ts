import { actionCreatorFactory } from 'typescript-fsa';

import Bookshelf from '../states/Bookshelf';

const actionCreator = actionCreatorFactory('bookshelf-action');

export const changeBookshelfAction = actionCreator<Partial<Bookshelf>>(
  'change-bookshelf',
);

export { changeBookshelfAction as default };
