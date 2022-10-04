import { styled, useTheme } from '@mui/material';
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

const { api } = window;

export const primarySidebarWidth = 240;

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

interface BookListItemProps {
  book: Book;
}

function BookListItem({ book }: BookListItemProps): JSX.Element {
  const dispatch = useDispatch();
  const onSelectedWordFetch = React.useCallback((selectedWord: SummaryWord) => {
    dispatch(fetchSelectedWordAction(selectedWord));
  }, []);
  const selectedWords = useSelector<State, null | LayoutCard[]>(
    (state: State) => state.selectedWords,
  );
  const [words, setWords] = useState<SummaryWord[]>();
  useEffect(() => {
    const process = async () => {
      setWords(await api.words(book.path));
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
                  card =>
                    card.summary.id !== word.id ||
                    card.summary.bookPath !== book.path,
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
  const theme = useTheme();
  const books = useSelector<State, Book[]>(
    (state: State) => state.bookshelf.books,
  );
  const primarySidebar = useSelector<State, null | string>(
    (state: State) => state.primarySidebar,
  );
  const open = primarySidebar !== null;

  return (
    <Drawer
      sx={{
        width: primarySidebarWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          marginLeft: `calc(${theme.spacing(8)} + 1px)`,
          width: primarySidebarWidth,
          boxSizing: 'border-box',
          zIndex: 1199,
        },
      }}
      variant="persistent"
      anchor="left"
      open={open}>
      <DrawerHeader />
      {books.some(book => book.path === primarySidebar) ? (
        <List>
          <BookListItem
            book={books.find(book => book.path === primarySidebar) as Book}
          />
        </List>
      ) : (
        <></>
      )}
    </Drawer>
  );
}
