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
import { useSelector } from 'react-redux';
import Book from '../states/Book';

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
          {
          books.find(book => book.path === primarySidebar)?.dictionary.words
          .map((word) => (
              <ListItem key={word.entry.id} disablePadding>
                <ListItemButton>
                  <ListItemText primary={word.entry.form} />
                </ListItemButton>
              </ListItem>
            ))}
        </List>
      ) : (
        <></>
      )}
    </Drawer>
  );
}
