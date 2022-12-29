import BookIcon from '@mui/icons-material/Book';
import { ListItem, Menu, MenuItem } from '@mui/material';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { editBookAction, removeBookAction } from '../actions/BookshelfActions';
import {
  changePrimarySidebarAction,
  readPageExplorerAction,
  readTemplatesAction,
  updatePrimarySidebarAction,
  readSearchModeAction,
  updateSearchWordAction,
} from '../actions/PrimarySidebarActions';
import Book from '../states/Book';
import PrimarySidebarStates from '../states/PrimarySidebarState';
import { State } from '../states/State';

interface Props {
  book: Book;
}

export default function BookViewContainer({ book }: Props): JSX.Element {
  const dispatch = useDispatch();
  const primarySidebar = useSelector<State, null | PrimarySidebarStates>(
    (state: State) => state.primarySidebar,
  );
  const onPrimarySidebarChange = React.useCallback((newBook: Book | null) => {
    if (newBook === null) {
      dispatch(changePrimarySidebarAction(null));
    } else {
      dispatch(
        updatePrimarySidebarAction({
          book: newBook,
        }),
      );
      dispatch(readPageExplorerAction());
      dispatch(readSearchModeAction(newBook));
      dispatch(readTemplatesAction(newBook));
      dispatch(updateSearchWordAction(''));
    }
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
          onPrimarySidebarChange(primarySidebar === null ? book : null);
      }}
      onContextMenu={handleClick}
      key={book.path}
      disablePadding
      sx={{ display: 'block' }}>
      <div className="flex items-center justify-center h-16 w-16">
        <BookIcon />
      </div>
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
            dispatch(editBookAction({ ...book, editable: true }));
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
