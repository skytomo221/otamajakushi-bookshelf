import CreateNewFolderIcon from '@mui/icons-material/CreateNewFolder';
import EditIcon from '@mui/icons-material/Edit';
import FileOpenIcon from '@mui/icons-material/FileOpen';
import FolderOpenIcon from '@mui/icons-material/FolderOpen';
import NoteAddIcon from '@mui/icons-material/NoteAdd';
import { useSnackbar } from 'notistack';
import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  BookControllerProperties,
  ExtensionProperties,
} from '../../common/ExtensionProperties';
import { initializeWorkbench } from '../actions/WorkbenchesActions';
import Book from '../states/Book';
import { State } from '../states/State';
import ThemeParameter from '../states/ThemeParameter';

const { api } = window;

export default function Hero(): JSX.Element {
  const theme = useSelector<State, ThemeParameter>(state => state.theme);
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const extensions = useSelector<State, ExtensionProperties[]>(
    (state: State) => state.extensions,
  );
  const onWorkbenchInitialize = useCallback((book: Book) => {
    dispatch(initializeWorkbench(book));
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

  return (
    <div className={theme.style.Hero}>
      <h2 className={theme.style['Hero.h2']}>Otamajakushi Bookshelf</h2>
      <h3 className={theme.style['Hero.h3']}>手軽に開発、便利な検索</h3>
      <h4 className={theme.style['Hero.h4']}>はじめよう</h4>
      {extensions
        .filter(
          (ext): ext is BookControllerProperties =>
            ext.type === 'book-controller',
        )
        .map(ext => (
          <div className={theme.style['Hero.BookControllerDiv']} key={ext.id}>
            {ext.filters.map(
              f => `${f.name} (${f.extensions.map(e => `*.${e}`).join(', ')})`,
            )}
            形式で
            <div className={theme.style['Hero.ButtonGroup']}>
              <button
                className={theme.style['Hero.button']}
                onClick={newBook(ext)}
                type="button">
                <div>
                  {ext.format === 'directory' ? (
                    <CreateNewFolderIcon fontSize="large" />
                  ) : (
                    <NoteAddIcon fontSize="large" />
                  )}
                </div>
                <div>新しいブックを作成する</div>
              </button>
              <button
                className={theme.style['Hero.button']}
                onClick={openBook(ext, false)}
                type="button">
                <div>
                  {ext.format === 'directory' ? (
                    <FolderOpenIcon fontSize="large" />
                  ) : (
                    <FileOpenIcon fontSize="large" />
                  )}
                </div>
                <div>ブックを開く</div>
              </button>
              <button
                className={theme.style['Hero.button']}
                onClick={openBook(ext, true)}
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
