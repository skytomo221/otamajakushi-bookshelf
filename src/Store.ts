import { combineReducers, createStore } from 'redux';
import { IState } from './states/IState';
import bookshelfReducer from './reducers/BookshelfReducer';

const combinedReducer = combineReducers<IState>({
  bookshelf: bookshelfReducer,
});

export const store = createStore(combinedReducer);

export default store;
