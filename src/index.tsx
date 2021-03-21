import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import Store from './Store';
import BookshelfForm from './components/BookshelfForm';

const container = document.getElementById('contents');

ReactDOM.render(
  <Provider store={Store}>
    <BookshelfForm />
  </Provider>,
  container,
);
