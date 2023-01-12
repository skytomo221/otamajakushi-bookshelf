import { applyMiddleware, combineReducers, createStore } from 'redux';
import createSagaMiddleware from 'redux-saga';

import extensionsReducer from './reducers/ExtensionsReducer';
import primarySidebarReducer from './reducers/PrimarySidebarReducer';
import secondarySidebarReducer from './reducers/SecondarySidebarReducer';
import selectedWordsReducer from './reducers/SelectedWordsReducer';
import themeReducer from './reducers/ThemeReducer';
import workbenchesReducer from './reducers/WorkbenchesReducer';
import { State } from './states/State';

const combinedReducer = combineReducers<State>({
  workbenches: workbenchesReducer,
  selectedWords: selectedWordsReducer,
  theme: themeReducer,
  primarySidebar: primarySidebarReducer,
  secondarySidebar: secondarySidebarReducer,
  extensions: extensionsReducer,
});

export const sagaMiddleware = createSagaMiddleware();

export const store = createStore(
  combinedReducer,
  applyMiddleware(sagaMiddleware),
);

export default store;
