import { MenuUnstyledActions } from '@mui/base/MenuUnstyled';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { MenuItem, Typography, useTheme, Divider } from '@mui/material';
import { useSnackbar } from 'notistack';
import { BookCreatorProperties } from 'otamashelf/BookCreator';
import { ExtensionBaseProperties } from 'otamashelf/ExtensionProperties';
import { SearchResult } from 'otamashelf/PageExplorer';
import { SearchCard } from 'otamashelf/SearchCard';
import React, { useEffect } from 'react';

import '../renderer';
import StyleThemeParameters from '../../common/StyleThemeParameters';
import { useExtensionsStore } from '../contexts/extensionsContext';
import { usePagesDispatch } from '../contexts/pagesContext';
import { useThemeDispatch, useThemeStore } from '../contexts/themeContext';
import {
  useWorkbenchDispatch,
  useWorkbenchStore,
} from '../contexts/workbenchContext';
import Book from '../states/Book';

import Menu from './Menu';
import MenuButton from './MenuButton';
import NestedMenuItem from './NestedMenuItem';

const { api } = window;

export default function FileMenu(): JSX.Element {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [bookCreators, setBookCreators] = React.useState<
    (ExtensionBaseProperties & { bookFormatPattern: string } & {
      type: 'book-creator';
    })[]
  >([]);
  const [styleThemes, setStyleThemes] = React.useState<
    (ExtensionBaseProperties & { type: 'style-theme' })[]
  >([]);
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
  const theme = useThemeStore();
  const dispatch = useThemeDispatch();
  const workbenches = useWorkbenchStore();
  const workbenchDispatch = useWorkbenchDispatch();
  const pagesDispatch = usePagesDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const extensions = useExtensionsStore();
  async function onWorkbenchInitialize(path: string, editable: boolean) {
    const pageFormats = await api.readAllPageFormats(path);
    const selectedPageFormatIndex = 0;
    const selectedPageFormat = pageFormats[selectedPageFormatIndex];
    const indexes = await api.indexAllPages(path, selectedPageFormat);
    const searchResults = [] as (SearchCard & SearchResult)[];
    const searchCriteria = await api.readAllSearchCriteria();
    const selectedSearchCriterionIndex = 0;
    const searchScopes = await api.readAllSearchScopes(selectedPageFormat);
    const selectedSearchScopeIndex = 0;
    const searchWord = '';
    workbenchDispatch({
      type: 'ADD_WORKBENCH',
      payload: {
        path,
        editable,
        indexes,
        searchResults,
        pageFormats,
        selectedPageFormatIndex,
        searchCriteria,
        selectedSearchCriterionIndex,
        searchScopes,
        selectedSearchScopeIndex,
        searchWord,
      },
    });
  }

  useEffect(() => {
    api.readAllStyleThemes().then(setStyleThemes);
    api.readAllBookCreators().then(setBookCreators);
  }, []);

  function onStyleThemeApply(styleTheme: StyleThemeParameters) {
    dispatch({
      type: 'CHANGE_THEME',
      payload: { ...theme, ...styleTheme },
    });
  }

  const openBook = (type: 'directory' | 'file', editable: boolean) => () => {
    api
      .openBook(type)
      .then(paths => {
        paths.forEach(path => onWorkbenchInitialize(path, editable));
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

  const newBook = (ext: BookCreatorProperties) => () => {
    api.requestBook(ext.id).then(mediator => {
      pagesDispatch({ type: 'ADD_PAGE', payload: mediator });
    })
  }

  const applyStyleTheme = (id: string) => () => {
    api.applyStyleTheme(id).then(styleTheme => onStyleThemeApply(styleTheme));
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
          {bookCreators
            .map(ext => (
              <MenuItem key={ext.id} onClick={newBook(ext)}>
                {ext.name}から作成する
              </MenuItem>
            ))}
        </NestedMenuItem>
        <MenuItem onClick={openBook('file', false)}>ファイルで開く</MenuItem>
        <MenuItem onClick={openBook('directory', false)}>
          フォルダで開く
        </MenuItem>
        <MenuItem onClick={openBook('file', false)}>
          編集モードでファイルで開く
        </MenuItem>
        <MenuItem onClick={openBook('directory', false)}>
          編集モードでフォルダで開く
        </MenuItem>
        <MenuItem
          onClick={() => {
            workbenches
              .filter(workbench => workbench.editable)
              .map(workbench => api.saveBook(workbench.path));
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
            {styleThemes.map(styleTheme => (
              <MenuItem
                key={styleTheme.id}
                onClick={applyStyleTheme(styleTheme.id)}>
                {styleTheme.name}
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
