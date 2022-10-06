import { actionCreatorFactory } from 'typescript-fsa';

import Book from '../states/Book';

const actionCreator = actionCreatorFactory('bookshelf-action');

export const addBookAction = actionCreator<Book>('add-book');
export const removeBookAction = actionCreator<Book>('remove-book');
export const editBookAction = actionCreator<{
  path: string;
  editable: boolean;
}>('edit-book');
