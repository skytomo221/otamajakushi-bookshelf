import { combineReducers, createStore } from 'redux';

import bookshelfReducer from './reducers/BookshelfReducer';
import searchWordReducer from './reducers/SearchWordReducer';
import { State } from './states/State';

const combinedReducer = combineReducers<State>({
  bookshelf: bookshelfReducer,
  searchWord: searchWordReducer
});

export const store = createStore(combinedReducer);

export default store;
