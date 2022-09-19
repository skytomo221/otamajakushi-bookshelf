import { reducerWithInitialState } from 'typescript-fsa-reducers';

import { addBookAction, removeBookAction } from '../actions/BookshelfActions';
import Bookshelf from '../states/Bookshelf';

const initBookshelf: Bookshelf = {
  books: [],
};

const bookshelfReducer = reducerWithInitialState<Bookshelf>(initBookshelf)
  .case(addBookAction, (state, payload) => ({
    ...state,
    books: [...state.books, payload]
  }))
  .case(removeBookAction, (state, payload) => ({
    ...state,
    books: state.books.filter(book => book !== payload)
  }))
  .build();

export default bookshelfReducer;
