import {
  Container,
  createStyles,
  ListItem,
  ListItemText,
  makeStyles,
  Theme,
} from '@material-ui/core';
import OTMJSON from 'otamajakushi';
import { Otm } from 'otamajakushi/dist/Otm';
import { Word } from 'otamajakushi/dist/Word';
import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FixedSizeList, ListChildComponentProps } from 'react-window';

import { addBookAction } from '../actions/BookshelfActions';
import { changeSearchWordAction } from '../actions/SearchWordActions';
import { changeSelectedWordAction } from '../actions/SelectedWordActions';
import Bookshelf from '../states/Bookshelf';
import { State } from '../states/State';
import useWindowDimensions from '../useWindowDimensions';

import OtamaAppBar from './OtamaAppBar';
import SearchWordTextField from './SearchWordTextField';
import WordCard from './WordCard';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    mainContainer: {
      display: 'flex',
    },
    resizable: {
      resize: 'horizontal',
      float: 'left',
    },
    wordCard: {
      flex: 1,
      overflow: 'auto',
      padding: '5ex',
    },
  }),
);

export default function BookshelfForm(): JSX.Element {
  const { height } = useWindowDimensions();
  const { books } = useSelector<State, Bookshelf>((a: State) => a.bookshelf);
  const searchWord = useSelector<State, string>((a: State) => a.searchWord);
  const selectedWord = useSelector<State, Word>((a: State) => a.selectedWord);
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
  const onSelectedWordChange = useCallback((word: Word) => {
    dispatch(changeSelectedWordAction(word));
  }, []);

  const book = books[books.length - 1];
  const emptyWords: Word[] = [];
  const filteredWords = (searchWordEntryForm: string) =>
    book === undefined
      ? emptyWords
      : book.words.filter((word: Word) =>
          word.entry.form.startsWith(searchWordEntryForm),
        );

  function renderWordList(props: ListChildComponentProps) {
    const { data, index, style } = props;
    const word = (data as Word[])[index];

    return (
      <ListItem
        button
        style={style}
        key={index}
        onClick={e => {
          e.preventDefault();
          onSelectedWordChange(word);
        }}>
        <ListItemText primary={word.entry.form} />
      </ListItem>
    );
  }

  return (
    <>
      <OtamaAppBar onBookChange={onBookChange} />
      {book === undefined ? (
        ''
      ) : (
        <Container>
          <SearchWordTextField
            onChangeText={(value: string) => {
              onSearchWordChange(value);
              if (filteredWords(value).length > 0) {
                onSelectedWordChange(filteredWords(value)[0]);
              }
            }}
          />
          <Container className={classes.mainContainer}>
            <FixedSizeList
              height={height - 112 < 1 ? 1 : height - 112}
              width="30%"
              itemSize={46}
              itemCount={filteredWords(searchWord).length}
              itemData={filteredWords(searchWord)}
              className={classes.resizable}>
              {renderWordList}
            </FixedSizeList>
            {selectedWord.entry.id >= 0 ? (
              <Container
                className={classes.wordCard}
                style={{ height: height - 112 < 1 ? 1 : height - 112 }}>
                <WordCard word={selectedWord} />
              </Container>
            ) : (
              ''
            )}
          </Container>
        </Container>
      )}
    </>
  );
}
