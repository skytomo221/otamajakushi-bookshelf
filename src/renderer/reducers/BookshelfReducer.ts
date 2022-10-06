import { reducerWithInitialState } from 'typescript-fsa-reducers';

import {
  addBookAction,
  editBookAction,
  removeBookAction,
} from '../actions/BookshelfActions';
import Bookshelf from '../states/Bookshelf';

const initBookshelf: Bookshelf = {
  books: [],
};

const bookshelfReducer = reducerWithInitialState<Bookshelf>(initBookshelf)
  .case(addBookAction, (state, payload) => ({
    ...state,
    books: [...state.books, payload],
  }))
  .case(removeBookAction, (state, payload) => ({
    ...state,
    books: state.books.filter(book => book !== payload),
  }))
  .case(editBookAction, (state, payload) => ({
    ...state,
    books: state.books.map(book =>
      book.path === payload.path ? { ...book, ...payload } : book,
    ),
  }))
  .build();

export default bookshelfReducer;
