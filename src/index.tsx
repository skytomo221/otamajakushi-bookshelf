import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import Store from './Store';
import BookshelfForm from './components/BookshelfForm';
import OtamaAppBar from './components/OtamaAppBar';

const container = document.getElementById('contents');

ReactDOM.render(
  <Provider store={Store}>
    <OtamaAppBar />
    <BookshelfForm />
  </Provider>,
  container,
);
