import { MenuUnstyledActions } from '@mui/base/MenuUnstyled';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { MenuItem, Typography, useTheme, Divider } from '@mui/material';
import { useSnackbar } from 'notistack';
import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  BookControllerProperties,
  ExtensionProperties,
  StyleThemeProperties,
} from '../../common/ExtensionProperties';
import StyleThemeParameters from '../../common/StyleThemeParameters';
import { applyStyleThemeAction } from '../actions/ThemeActions';
import { initializeWorkbench } from '../actions/WorkbenchesActions';
import Book from '../states/Book';
import { State } from '../states/State';

import '../renderer';
import Menu from './Menu';
import MenuButton from './MenuButton';
import NestedMenuItem from './NestedMenuItem';

const { api } = window;

export default function FileMenu(): JSX.Element {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const buttonRef = React.useRef<HTMLButtonElement>(null);
  const menuActions = React.useRef<MenuUnstyledActions>(null);
  const preventReopen = React.useRef(false);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (preventReopen.current) {
      event.preventDefault();
      preventReopen.current = false;
      return;
    }

    if (open) {
      setAnchorEl(null);
    } else {
      setAnchorEl(event.currentTarget);
    }
  };
  const handleButtonMouseDown = () => {
    if (open) {
      // Prevents the menu from reopening right after closing
      // when clicking the button.
      preventReopen.current = true;
    }
  };
  const handleButtonKeyDown = (
    event: React.KeyboardEvent<HTMLButtonElement>,
  ) => {
    if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
      event.preventDefault();
      setAnchorEl(event.currentTarget);
      if (event.key === 'ArrowUp') {
        menuActions.current?.highlightLastItem();
      }
    }
  };
  const handleClose = () => {
    setAnchorEl(null);
    buttonRef.current?.focus();
  };
  const theme = useTheme();
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const books = useSelector<State, Book[]>((state: State) =>
    state.workbenches.map(workbench => workbench.book),
  );
  const extensions = useSelector<State, ExtensionProperties[]>(
    (state: State) => state.extensions,
  );
  const onWorkbenchInitialize = useCallback((book: Book) => {
    dispatch(initializeWorkbench(book));
  }, []);
  const onStyleThemeApply = useCallback((styleTheme: StyleThemeParameters) => {
    dispatch(applyStyleThemeAction(styleTheme));
  }, []);

  const openBook =
    (extension: ExtensionProperties, editable: boolean) => () => {
      api
        .open(extension.id)
        .then(paths => {
          paths.forEach(path =>
            onWorkbenchInitialize({
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

  const newBook = (extension: ExtensionProperties) => () => {
    api
      .newBook(extension.id)
      .then(paths => {
        paths.forEach(path =>
          onWorkbenchInitialize({
            path,
            editable: true,
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

  const applyStyleTheme = (extension: StyleThemeProperties) => () => {
    api
      .applyStyleTheme(extension.id)
      .then(styleTheme => onStyleThemeApply(styleTheme));
  };

  return (
    <div>
      <MenuButton onClick={handleClick}>
        <Typography variant="button" noWrap>
          ファイル
        </Typography>
      </MenuButton>
      <Menu id="file-menu" anchorEl={anchorEl} open={open}>
        <NestedMenuItem
          rightIcon={<ChevronRightIcon />}
          label="辞書の新規作成"
          parentMenuOpen={open}>
          {extensions
            .filter(
              (ext): ext is BookControllerProperties =>
                ext.type === 'book-controller',
            )
            .map(ext => (
              <MenuItem key={ext.id} onClick={newBook(ext)}>
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
          label="開く"
          parentMenuOpen={open}>
          {extensions
            .filter(
              (ext): ext is BookControllerProperties =>
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
              (ext): ext is BookControllerProperties =>
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
        <Divider />
        <NestedMenuItem
          rightIcon={<ChevronRightIcon />}
          label="ユーザー設定"
          parentMenuOpen={open}>
          <NestedMenuItem
            rightIcon={<ChevronRightIcon />}
            label="スタイルテーマ"
            parentMenuOpen={open}>
            {extensions
              .filter(
                (ext): ext is StyleThemeProperties =>
                  ext.type === 'style-theme',
              )
              .map(ext => (
                <MenuItem key={ext.id} onClick={applyStyleTheme(ext)}>
                  {ext.name}
                </MenuItem>
              ))}
          </NestedMenuItem>
        </NestedMenuItem>
        <Divider />
        <MenuItem onClick={api.windowClose}>終了</MenuItem>
      </Menu>
    </div>
  );
}
