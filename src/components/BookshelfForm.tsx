import { Container, createStyles, makeStyles, Theme } from '@material-ui/core';
import OTMJSON from 'otamajakushi';
import { Otm } from 'otamajakushi/dist/Otm';
import { Word } from 'otamajakushi/dist/Word';
import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FixedSizeList } from 'react-window';

import { addBookAction } from '../actions/BookshelfActions';
import { changeSearchWordAction } from '../actions/SearchWordActions';
import Bookshelf from '../states/Bookshelf';
import { State } from '../states/State';
import useWindowDimensions from '../useWindowDimensions';

import OtamaAppBar from './OtamaAppBar';
import SearchWordTextField from './SearchWordTextField';
import WordCard from './WordCard';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    wordCard: {
      margin: theme.spacing(1.25),
    },
  }),
);

export default function BookshelfForm(): JSX.Element {
  const { height } = useWindowDimensions();
  const { books } = useSelector<State, Bookshelf>((a: State) => a.bookshelf);
  const searchWord = useSelector<State, string>((a: State) => a.searchWord);
  const classes = useStyles();
  const dispatch = useDispatch();
  const onBookChange = useCallback((text: string) => {
    const newBook = OTMJSON.parse(text);

    function addItem(array: Otm[], item: Otm) {
      return Array.from(new Set([...array, item]));
    }

    const newBookshelf = addItem(books, newBook);
    dispatch(addBookAction({ books: newBookshelf }));
  }, []);

  const onSearchWordChange = useCallback((text: string) => {
    dispatch(changeSearchWordAction(text));
  }, []);

  const book = books[books.length - 1];
  const emptyWords: Word[] = [];
  const filteredWords =
    book === undefined
      ? emptyWords
      : book.words.filter((word: Word) =>
          word.entry.form.startsWith(searchWord),
        );

  return (
    <>
      <OtamaAppBar onBookChange={onBookChange} />
      {book === undefined ? (
        ''
      ) : (
        <Container>
          <SearchWordTextField onChangeText={onSearchWordChange} />
          <FixedSizeList
            height={height - 104 < 1 ? 1 : height - 104}
            width="100%"
            itemSize={46}
            itemCount={filteredWords.length}
            itemData={filteredWords}>
            {WordCard}
          </FixedSizeList>
        </Container>
      )}
    </>
  );
}
