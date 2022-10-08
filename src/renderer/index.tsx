import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import Store, { sagaMiddleware } from './Store';
import BookshelfForm from './components/BookshelfForm';
import rootSaga from './sagas';

import '../../index.css';

const container = document.getElementById('contents');

sagaMiddleware.run(rootSaga);
ReactDOM.render(
  <Provider store={Store}>
    <BookshelfForm />
  </Provider>,
  container,
);
