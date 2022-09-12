import MailIcon from '@mui/icons-material/Mail';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import { styled, useTheme } from '@mui/material';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addSelectedWordAction } from '../actions/SelectedWordsActions';
import Book from '../states/Book';
import SelectedWord from '../states/SelectedWord';

import { State } from '../states/State';

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
  const onSelectedWordAdd = React.useCallback((selectedWord: SelectedWord) => {
    dispatch(addSelectedWordAction(selectedWord));
  }, []);

  return (
    <>
      {book.dictionary.words.map(word => (
        <ListItem key={word.entry.id} disablePadding>
          <ListItemButton
            onClick={() =>
              onSelectedWordAdd({ path: book.path, id: word.entry.id })
            }>
            <ListItemText primary={word.entry.form} />
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
