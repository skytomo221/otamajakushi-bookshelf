import { Box, styled, useTheme } from '@mui/material';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { LayoutCard } from '../LayoutCard';
import { SummaryWord } from '../SummaryWord';
import { fetchSelectedWordAction } from '../actions/SelectedWordsActions';
import Book from '../states/Book';
import { State } from '../states/State';

import '../renderer';
import { Mediator } from '../Mediator';

const { api } = window;

export const primarySidebarWidth = 240;

interface BookListItemProps {
  book: Book;
}

function BookListItem({ book }: BookListItemProps): JSX.Element {
  const dispatch = useDispatch();
  const onSelectedWordFetch = React.useCallback((selectedWord: SummaryWord) => {
    dispatch(fetchSelectedWordAction(selectedWord));
  }, []);
  const selectedWords = useSelector<State, null | Mediator[]>(
    (state: State) => state.selectedWords,
  );
  const [words, setWords] = useState<SummaryWord[]>();
  useEffect(() => {
    const process = async () => {
      setWords(await api.readWords(book.path));
    };
    process();
  }, []);

  return (
    <>
      {(words ?? []).map(word => (
        <ListItem key={word.id} disablePadding>
          <ListItemButton
            onClick={() => {
              if (
                (selectedWords ?? []).every(
                  mediator =>
                    mediator.summary.id !== word.id ||
                    mediator.summary.bookPath !== book.path,
                )
              ) {
                onSelectedWordFetch(word);
              }
            }}>
            <ListItemText primary={word.form} />
          </ListItemButton>
        </ListItem>
      ))}
    </>
  );
}

export default function PrimarySidebar(): JSX.Element {
  const books = useSelector<State, Book[]>(
    (state: State) => state.bookshelf.books,
  );
  const primarySidebar = useSelector<State, null | string>(
    (state: State) => state.primarySidebar,
  );
  const open = primarySidebar !== null;

  if (open) {
    return books.some(book => book.path === primarySidebar) ? (
      <Box sx={{ overflow: 'auto', height: '100%' }}>
        <List>
          <BookListItem
            book={books.find(book => book.path === primarySidebar) as Book}
          />
        </List>
      </Box>
    ) : (
      <></>
    );
  }
  return <></>;
}
