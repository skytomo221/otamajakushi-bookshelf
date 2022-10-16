import InboxIcon from '@mui/icons-material/MoveToInbox';
import Divider from '@mui/material/Divider';
import MuiDrawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { styled, Theme, CSSObject } from '@mui/material/styles';
import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { changePrimarySidebarAction } from '../actions/PrimarySidebarActions';
import { changeSecondarySidebarAction } from '../actions/SecondarySidebarActions';
import Book from '../states/Book';
import { State } from '../states/State';

import BookViewContainer from './BookViewContainer';

export const activityBarWidth = 240;

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: prop => prop !== 'open',
})(({ theme }) => ({
  flexShrink: 0,
  whiteSpace: 'nowrap',
  boxSizing: 'border-box',
  ...{
    ...closedMixin(theme),
    '& .MuiDrawer-paper': closedMixin(theme),
  },
}));

export default function ActivityBar(): JSX.Element {
  const dispatch = useDispatch();
  const primarySidebar = useSelector<State, null | string>(
    (state: State) => state.primarySidebar,
  );
  const onPrimarySidebarChange = React.useCallback((text: string | null) => {
    dispatch(changePrimarySidebarAction(text));
  }, []);
  const secondarySidebar = useSelector<State, null | string>(
    (state: State) => state.secondarySidebar,
  );
  const onSecondarySidebarChange = React.useCallback((text: string | null) => {
    dispatch(changeSecondarySidebarAction(text));
  }, []);
  const books = useSelector<State, Book[]>(
    (state: State) => state.bookshelf.books,
  );

  return (
    <Drawer variant="permanent" open={false}>
      <DrawerHeader />
      <List>
        {books
          .filter(book => book.editable)
          .map(book => (
            <BookViewContainer key={book.path} book={book} />
          ))}
      </List>
      {books.filter(book => book.editable).length > 0 ? <Divider /> : <></>}
      <List>
        {books
          .filter(book => !book.editable)
          .map(book => (
            <BookViewContainer key={book.path} book={book} />
          ))}
      </List>
    </Drawer>
  );
}
