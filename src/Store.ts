import { combineReducers, createStore } from 'redux';

import bookshelfReducer from './reducers/BookshelfReducer';
import searchWordReducer from './reducers/SearchWordReducer';
import selectedWordReducer from './reducers/SelectedWordReducer';
import { State } from './states/State';

const combinedReducer = combineReducers<State>({
  bookshelf: bookshelfReducer,
  searchWord: searchWordReducer,
  selectedWord: selectedWordReducer,
});

export const store = createStore(combinedReducer);

export default store;
