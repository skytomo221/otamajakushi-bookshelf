import CreateNewFolderIcon from '@mui/icons-material/CreateNewFolder';
import EditIcon from '@mui/icons-material/Edit';
import FileOpenIcon from '@mui/icons-material/FileOpen';
import FolderOpenIcon from '@mui/icons-material/FolderOpen';
import NoteAddIcon from '@mui/icons-material/NoteAdd';
import { useSnackbar } from 'notistack';
import {
  BookCreatorProperties,
  BookLoaderProperties,
  ExtensionProperties,
} from 'otamashelf';
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
  async function onWorkbenchInitialize(book: Book) {
    const pageExplorers = await api.readPageExplorer();
    const pageExplorer = pageExplorers[0];
    const searchModes = await api.readSearchMode(book.path);
    const searchMode = searchModes[0];
    const templates = await api.readTemplates(book.path);
    const searchWord = '';
    const mediators = await api.selectPage(
      book.path,
      pageExplorer.id,
      searchMode,
      searchWord,
    );
    workbenchDispatch({
      type: 'ADD_WORKBENCH',
      payload: {
        book,
        pageExplorer,
        pageExplorers,
        searchMode,
        searchModes,
        searchWord,
        templates,
        mediators,
      },
    });
  }

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

  return (
    <div className={theme.Hero}>
      <h2 className={theme['Hero.h2']}>Otamajakushi Bookshelf</h2>
      <h3 className={theme['Hero.h3']}>手軽に開発、便利な検索</h3>
      <h4 className={theme['Hero.h4']}>はじめよう</h4>
      {Array.from(
        new Set(
          extensions
            .filter(
              (ext): ext is BookCreatorProperties | BookLoaderProperties =>
                ext.type === 'book-creator' || ext.type === 'book-loader',
            )
            .map(ext => ext.bookFormat)
            .flat(),
        ),
      ).map(bookFormat => (
        <div className={theme['Hero.BookControllerDiv']} key={bookFormat}>
          {bookFormat}形式で
          <div className={theme['Hero.ButtonGroup']}>
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
                {extensions
                  .filter(
                    (ext): ext is BookLoaderProperties =>
                      ext.type === 'book-loader',
                  )
                  .filter(ext => ext.bookFormat.includes(bookFormat))[0]
                  .format === 'directory' ? (
                  <CreateNewFolderIcon fontSize="large" />
                ) : (
                  <NoteAddIcon fontSize="large" />
                )}
              </div>
              <div>新しいブックを作成する</div>
            </button>
            <button
              className={theme['Hero.button']}
              onClick={openBook(
                extensions
                  .filter(
                    (ext): ext is BookLoaderProperties =>
                      ext.type === 'book-loader',
                  )
                  .filter(ext => ext.bookFormat.includes(bookFormat))[0],
                false,
              )}
              type="button">
              <div>
                {extensions
                  .filter(
                    (ext): ext is BookLoaderProperties =>
                      ext.type === 'book-loader',
                  )
                  .filter(ext => ext.bookFormat.includes(bookFormat))[0]
                  .format === 'directory' ? (
                  <FolderOpenIcon fontSize="large" />
                ) : (
                  <FileOpenIcon fontSize="large" />
                )}
              </div>
              <div>ブックを開く</div>
            </button>
            <button
              className={theme['Hero.button']}
              onClick={openBook(
                extensions
                  .filter(
                    (ext): ext is BookLoaderProperties =>
                      ext.type === 'book-loader',
                  )
                  .filter(ext => ext.bookFormat.includes(bookFormat))[0],
                true,
              )}
              type="button">
              <div>
                <EditIcon fontSize="large" />
              </div>
              <div>編集モードでブックを開く</div>
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
