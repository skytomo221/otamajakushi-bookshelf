import { Container, createStyles, makeStyles, Theme } from '@material-ui/core';
import OTMJSON from 'otamajakushi';
import { Otm } from 'otamajakushi/dist/Otm';
import { Word } from 'otamajakushi/dist/Word';
import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { addBookAction } from '../actions/BookshelfActions';
import { changeSearchWordAction } from '../actions/SearchWordActions';
import Bookshelf from '../states/Bookshelf';
import { State } from '../states/State';

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

const BookshelfForm: React.FC = () => {
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

  return (
    <>
      <OtamaAppBar onBookChange={onBookChange} />
      <Container>
        <SearchWordTextField onChangeText={onSearchWordChange} />
        <p>
          {books.map((book: Otm) => (
            <>
              {book.words
                .filter((word: Word) => word.entry.form.startsWith(searchWord))
                .map((word: Word) => (
                  <WordCard
                    word={word}
                    key={word.entry.id}
                    className={classes.wordCard}
                  />
                ))}
            </>
          ))}
        </p>
      </Container>
    </>
  );
};

export default BookshelfForm;
