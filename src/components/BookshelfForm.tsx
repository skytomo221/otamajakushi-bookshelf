import { Button, TextField } from '@material-ui/core';
import OTMJSON from 'otamajakushi';
import { Otm } from 'otamajakushi/dist/Otm';
import { Word } from 'otamajakushi/dist/Word';
import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { addBookAction } from '../actions/BookshelfActions';
import Bookshelf from '../states/Bookshelf';
import { State } from '../states/State';
import OtamaAppBar from './OtamaAppBar';

// データは、Storeから渡されるので、プロパティは必要ありません。
const BookshelfForm: React.FC = () => {
  // useSelector でステートの変更を受け取れます。
  const { books } = useSelector<State, Bookshelf>((a: State) => a.bookshelf); // -- (a)
  const dispatch = useDispatch(); // -- (b)
  const onBookChange = useCallback((text: string) => {
    const newBook = OTMJSON.parse(text);

    function addItem(array: Otm[], item: Otm) {
      return Array.from(new Set([...array, item]));
    }

    const newBookshelf = addItem(books, newBook);
    // 名前を変更したとき(タイプするたび)のイベント
    dispatch(addBookAction({ books: newBookshelf }));
  }, []); // [] は初回のみという意味
  return (
    <>
      <OtamaAppBar onBookChange={onBookChange} />
      <div>
        <p>
          <TextField label="ユーザー名" />
        </p>
        <p>
          {books.map((book: Otm) => (
            <>
              {book.words.map((word: Word) => (
                <div key={word.entry.id}>{word.entry.form}</div>
              ))}
            </>
          ))}
        </p>
      </div>
    </>
  );
};

export default BookshelfForm;
