import BookIcon from '@mui/icons-material/Book';
import {
  ListItemButton,
  ListItem,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
} from '@mui/material';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { removeBookAction } from '../actions/BookshelfActions';
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
  const [contextMenu, setContextMenu] = React.useState<{
    mouseX: number;
    mouseY: number;
  } | null>(null);
  const handleClick = (event: React.MouseEvent) => {
    event.preventDefault();
    setContextMenu(
      contextMenu === null
        ? {
            mouseX: event.clientX + 2,
            mouseY: event.clientY - 6,
          }
        : // repeated contextmenu when it is already open closes it with Chrome 84 on Ubuntu
          // Other native context menus might behave different.
          // With this behavior we prevent contextmenu from the backdrop to re-locale existing context menus.
          null,
    );
  };
  const handleClose = () => {
    setContextMenu(null);
  };

  return (
    <ListItem
      onClick={() => {
        if (contextMenu === null)
          onPrimarySidebarChange(primarySidebar === null ? book.path : null);
      }}
      onContextMenu={handleClick}
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
      <Menu
        open={contextMenu !== null}
        onClose={handleClose}
        anchorReference="anchorPosition"
        anchorPosition={
          contextMenu !== null
            ? { top: contextMenu.mouseY, left: contextMenu.mouseX }
            : undefined
        }>
        <MenuItem
          onClick={() => {
            handleClose();
          }}>
          編集する
        </MenuItem>
        <MenuItem
          onClick={() => {
            dispatch(removeBookAction(book));
            handleClose();
          }}>
          閉じる
        </MenuItem>
      </Menu>
    </ListItem>
  );
}
