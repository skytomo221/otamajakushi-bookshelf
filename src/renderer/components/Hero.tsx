import CreateNewFolderIcon from '@mui/icons-material/CreateNewFolder';
import EditIcon from '@mui/icons-material/Edit';
import FileOpenIcon from '@mui/icons-material/FileOpen';
import FolderOpenIcon from '@mui/icons-material/FolderOpen';
import NoteAddIcon from '@mui/icons-material/NoteAdd';
import { useSnackbar } from 'notistack';
import { BookCreatorProperties } from 'otamashelf/BookCreator';
import { BookLoaderProperties } from 'otamashelf/BookLoader';
import { ExtensionProperties } from 'otamashelf/ExtensionProperties';
import { SearchResult } from 'otamashelf/PageExplorer';
import { SearchCard } from 'otamashelf/SearchCard';
import React, { useCallback } from 'react';

import { useExtensionsStore } from '../contexts/extensionsContext';
import { useThemeStore } from '../contexts/themeContext';
import { useWorkbenchDispatch } from '../contexts/workbenchContext';
import Book from '../states/Book';

const { api } = window;

export default function Hero(): JSX.Element {
  const theme = useThemeStore();
  const { enqueueSnackbar } = useSnackbar();
  const extensions = useExtensionsStore();
  const workbenchDispatch = useWorkbenchDispatch();
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

  // const newBook = (extension: ExtensionProperties) => () => {
  //   api
  //     .newBook(extension.id)
  //     .then(paths => {
  //       paths.forEach(path => onWorkbenchInitialize(path, true));
  //     })
  //     .catch(err => {
  //       if (err instanceof Error) {
  //         enqueueSnackbar(err.message);
  //         api.log.error(err.message);
  //       } else {
  //         enqueueSnackbar('原因不明のエラー');
  //         api.log.error('原因不明のエラー');
  //       }
  //     });
  // };

  return (
    <div className={theme.Hero}>
      <h2 className={theme['Hero.h2']}>Otamajakushi Bookshelf</h2>
      <h3 className={theme['Hero.h3']}>手軽に開発、便利な検索</h3>
      <h4 className={theme['Hero.h4']}>はじめよう</h4>
      <div className={theme['Hero.BookControllerDiv']}>
        <div className={theme['Hero.ButtonGroup']}>
          {/* <button
            className={theme['Hero.button']}
            onClick={newBook(
              extensions
                .filter(
                  (ext): ext is BookCreatorProperties =>
                    ext.type === 'book-creator',
                )
                .filter(ext => ext.bookFormat.includes(bookFormat))[0],
            )}
            type="button">
            <div>
                <NoteAddIcon fontSize="large" />
            </div>
            <div>ファイル形式で新しいブックを作成する</div>
          </button>
          <button
            className={theme['Hero.button']}
            onClick={newBook(
              extensions
                .filter(
                  (ext): ext is BookCreatorProperties =>
                    ext.type === 'book-creator',
                )
                .filter(ext => ext.bookFormat.includes(bookFormat))[0],
            )}
            type="button">
            <div>
                <CreateNewFolderIcon fontSize="large" />
            </div>
            <div>フォルダ形式で新しいブックを作成する</div>
          </button> */}
          <button
            className={theme['Hero.button']}
            onClick={openBook('directory', false)}
            type="button">
            <div>
              <FolderOpenIcon fontSize="large" />
            </div>
            <div>フォルダとしてブックを開く</div>
          </button>
          <button
            className={theme['Hero.button']}
            onClick={openBook('file', false)}
            type="button">
            <div>
              <FileOpenIcon fontSize="large" />
            </div>
            <div>ファイルとしてブックを開く</div>
          </button>
          <button
            className={theme['Hero.button']}
            onClick={openBook('directory', true)}
            type="button">
            <div>
              <EditIcon fontSize="large" />
            </div>
            <div>フォルダとして編集モードでブックを開く</div>
          </button>
          <button
            className={theme['Hero.button']}
            onClick={openBook('file', true)}
            type="button">
            <div>
              <EditIcon fontSize="large" />
            </div>
            <div>ファイルとして編集モードでブックを開く</div>
          </button>
        </div>
      </div>
    </div>
  );
}
