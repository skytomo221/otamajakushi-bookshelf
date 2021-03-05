import { actionCreatorFactory } from 'typescript-fsa';
import IBookshelf from '../states/IBookshelf';

const actionCreator = actionCreatorFactory('bookshelf-action');

export const changeBookshelfAction = actionCreator<Partial<IBookshelf>>('change-bookshelf');
