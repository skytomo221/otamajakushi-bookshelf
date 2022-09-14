import BookIcon from '@mui/icons-material/Book';
import {
  ListItemButton,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { changePrimarySidebarAction } from '../actions/PrimarySidebarActions';
import Book from '../states/Book';
import { State } from '../states/State';

interface Props {
  book: Book;
}

export default function BookViewContainer({ book }: Props): JSX.Element {
  const dispatch = useDispatch();
  const primarySidebar = useSelector<State, null | string>(
    (state: State) => state.primarySidebar,
  );
  const onPrimarySidebarChange = React.useCallback((text: string | null) => {
    dispatch(changePrimarySidebarAction(text));
  }, []);

  return (
    <ListItem
      onClick={() =>
        onPrimarySidebarChange(primarySidebar === null ? book.path : null)
      }
      key={book.path}
      disablePadding
      sx={{ display: 'block' }}>
      <ListItemButton
        sx={{
          minHeight: 48,
          justifyContent: 'center',
          px: 2.5,
        }}>
        <ListItemIcon
          sx={{
            minWidth: 0,
            mr: 'auto',
            justifyContent: 'center',
          }}>
          <BookIcon />
        </ListItemIcon>
        <ListItemText primary={book.path} sx={{ opacity: 0 }} />
      </ListItemButton>
    </ListItem>
  );
}
