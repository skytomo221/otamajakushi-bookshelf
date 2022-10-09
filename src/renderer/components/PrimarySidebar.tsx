import {
  mdiRegex,
  mdiBookSearch,
  mdiFormatLetterStartsWith,
  mdiFormatLetterEndsWith,
  mdiFormatLetterMatches,
} from '@mdi/js';
import Icon from '@mdi/react';
import { Box, IconButton, InputAdornment, TextField } from '@mui/material';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Mediator } from '../Mediator';
import { SummaryWord } from '../SummaryWord';
import { fetchSelectedWordAction } from '../actions/SelectedWordsActions';
import Book from '../states/Book';
import { State } from '../states/State';

import '../renderer';

const { api } = window;

export const primarySidebarWidth = 240;

interface BookListItemProps {
  book: Book;
  search: string;
  mode: string;
}

function BookListItem({ book, search, mode }: BookListItemProps): JSX.Element {
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
      {(words ?? [])
        .filter(word => {
          switch (mode) {
            case 'startsWith':
              return word.form.startsWith(search);
            case 'endsWith':
              return word.form.endsWith(search);
            case 'matches':
              return word.form.includes(search);
            case 'regex':
              return word.form.match(search);
            default:
              return true;
          }
        })
        .sort((a, b) => {
          const af = a.form.toUpperCase();
          const bf = b.form.toUpperCase();
          if (af < bf) {
            return -1;
          }
          if (af > bf) {
            return 1;
          }
          return 0;
        })
        .map(word => (
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
  const [search, setSearch] = useState<string>('');
  const [searchMode, setSearchMode] = useState<number>(0);
  const icons = [
    <Icon
      key={0}
      path={mdiFormatLetterStartsWith}
      title="Start with"
      size={1}
    />,
    <Icon key={1} path={mdiFormatLetterEndsWith} title="Ends with" size={1} />,
    <Icon key={2} path={mdiFormatLetterMatches} title="Matches" size={1} />,
    <Icon key={3} path={mdiRegex} title="Regex" size={1} />,
    <Icon key={4} path={mdiBookSearch} title="Full text search" size={1} />,
  ];
  const modes = ['startsWith', 'endsWith', 'matches', 'regex', 'fullText'];

  if (open) {
    return books.some(book => book.path === primarySidebar) ? (
      <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
        <Box sx={{ display: 'flex' }}>
          <TextField
            value={search}
            onChange={event => setSearch(event.target.value)}
            id="standard-basic"
            sx={{ width: '100%', margin: '2px' }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <IconButton
                    aria-label="delete"
                    onClick={() =>
                      setSearchMode((searchMode + 1) % icons.length)
                    }>
                    {icons[searchMode]}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </Box>
        <List sx={{ height: '100%', overflow: 'auto' }}>
          <BookListItem
            book={books.find(book => book.path === primarySidebar) as Book}
            search={search}
            mode={modes[searchMode]}
          />
        </List>
      </Box>
    ) : (
      <></>
    );
  }
  return <></>;
}
