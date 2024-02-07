import BookIcon from '@mui/icons-material/Book';
import { ListItem, Menu, MenuItem } from '@mui/material';
import React from 'react';

import {
  usePrimarySidebarDispatch,
  usePrimarySidebarStore,
} from '../contexts/primarySidebarContext';
import { useWorkbenchDispatch } from '../contexts/workbenchContext';
import Book from '../states/Book';

interface Props {
  book: Book;
}

export default function BookViewContainer({ book }: Props): JSX.Element {
  const primarySidebar = usePrimarySidebarStore();
  const primarySidebarDispatch = usePrimarySidebarDispatch();
  const workbenchDispatch = useWorkbenchDispatch();
  const onPrimarySidebarChange = React.useCallback((newBook: Book | null) => {
    primarySidebarDispatch({
      type: 'UPDATE_BOOK_PATH',
      payload: newBook === null ? null : newBook.path,
    });
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
          onPrimarySidebarChange(primarySidebar.display ? null : book);
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
            workbenchDispatch({
              type: 'EDIT_BOOK',
              payload: { ...book, editable: true },
            });
            handleClose();
          }}>
          編集する
        </MenuItem>
        <MenuItem
          onClick={() => {
            workbenchDispatch({ type: 'REMOVE_WORKBENCH', payload: book.path });
            handleClose();
          }}>
          閉じる
        </MenuItem>
      </Menu>
    </ListItem>
  );
}
