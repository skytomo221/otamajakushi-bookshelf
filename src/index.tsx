import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'; // 追加
import BookshelfForm from './components/BookshelfForm'; // 追加
import Store from './Store'; // 追加

const container = document.getElementById('contents');

ReactDOM.render(
  <Provider store={Store}>
    <BookshelfForm />
  </Provider>,
  container,
);
