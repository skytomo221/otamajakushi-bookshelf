import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { Button, Menu, MenuItem, Typography, useTheme } from '@mui/material';
import { NestedMenuItem } from 'mui-nested-menu';
import { useSnackbar } from 'notistack';
import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { BookControllerInfo, ExtensionInfo } from '../ExtensionInfo';
import { addBookAction } from '../actions/BookshelfActions';
import { updateExtensionsAction } from '../actions/ExtensionsActions';
import Book from '../states/Book';
import { State } from '../states/State';

import '../renderer';

const { api } = window;

export default function FileMenu(): JSX.Element {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const theme = useTheme();
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const books = useSelector<State, Book[]>(
    (state: State) => state.bookshelf.books,
  );
  const extensions = useSelector<State, ExtensionInfo[]>(
    (state: State) => state.extensions,
  );
  const onBookUpdate = useCallback((book: Book) => {
    dispatch(addBookAction(book));
  }, []);

  const openBook = (extension: ExtensionInfo, editable: boolean) => () => {
    api
      .open(extension.id)
      .then(paths => {
        paths.forEach(path =>
          onBookUpdate({
            path,
            editable,
          }),
        );
      })
      .catch(err => {
        if (err instanceof Error) {
          enqueueSnackbar(err.message);
          api.log.error(err.message);
        } else {
          enqueueSnackbar('原因不明のエラー');
          api.log.error('原因不明のエラー');
        }
      });
  };

  return (
    <div>
      <Button color="inherit" onClick={handleClick} sx={theme.button}>
        <Typography variant="button" noWrap>
          ファイル
        </Typography>
      </Button>
      <Menu
        id="file-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'file-button',
        }}>
        <MenuItem>辞書の新規作成</MenuItem>
        <NestedMenuItem
          rightIcon={<ChevronRightIcon />}
          label="開く"
          parentMenuOpen={open}>
          {extensions
            .filter(
              (ext): ext is BookControllerInfo =>
                ext.type === 'book-controller',
            )
            .map(ext => (
              <MenuItem key={ext.id} onClick={openBook(ext, false)}>
                {ext.filters.map(
                  f =>
                    `${f.name} (${f.extensions.map(e => `*.${e}`).join(', ')})`,
                )}
                形式で開く
              </MenuItem>
            ))}
        </NestedMenuItem>
        <NestedMenuItem
          rightIcon={<ChevronRightIcon />}
          label="編集モードで開く"
          parentMenuOpen={open}>
          {extensions
            .filter(
              (ext): ext is BookControllerInfo =>
                ext.type === 'book-controller',
            )
            .map(ext => (
              <MenuItem key={ext.id} onClick={openBook(ext, true)}>
                {ext.filters.map(
                  f =>
                    `${f.name} (${f.extensions.map(e => `*.${e}`).join(', ')})`,
                )}
                形式を編集モードで開く
              </MenuItem>
            ))}
        </NestedMenuItem>
        <MenuItem
          onClick={() => {
            books
              .filter(book => book.editable)
              .map(book => api.save(book.path));
          }}>
          保存
        </MenuItem>
        <MenuItem onClick={api.windowClose}>終了</MenuItem>
      </Menu>
    </div>
  );
}
