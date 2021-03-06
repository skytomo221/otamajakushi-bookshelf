import { combineReducers, createStore } from 'redux';

import bookshelfReducer from './reducers/BookshelfReducer';
import { IState } from './states/IState';

const combinedReducer = combineReducers<IState>({
  bookshelf: bookshelfReducer,
});

export const store = createStore(combinedReducer);

export default store;
