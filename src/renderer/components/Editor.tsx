import CreateNewFolderIcon from '@mui/icons-material/CreateNewFolder';
import FileOpenIcon from '@mui/icons-material/FileOpen';
import FolderOpenIcon from '@mui/icons-material/FolderOpen';
import {
  Box,
  Container,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  useTheme,
} from '@mui/material';
import { useSnackbar } from 'notistack';
import OTMJSON from 'otamajakushi';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { addBookAction } from '../actions/BookshelfActions';
import Book from '../states/Book';
import { State } from '../states/State';

import { primarySidebarWidth } from './PrimarySidebar';
import { secondarySidebarWidth } from './SecondarySidebar';
import WordTabs from './WordTabs';

const { api } = window;

export default function Editor(): JSX.Element {
  const dispatch = useDispatch();
  const theme = useTheme();
  const books = useSelector<State, Book[]>(
    (state: State) => state.bookshelf.books,
  );
  const primarySidebar = useSelector<State, null | string>(
    (state: State) => state.primarySidebar,
  );
  const secondarySidebar = useSelector<State, null | string>(
    (state: State) => state.secondarySidebar,
  );
  const primarySidebarOpen = primarySidebar !== null;
  const secondarySidebarOpen = secondarySidebar !== null;
  const { enqueueSnackbar } = useSnackbar();

  return (
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        padding: theme.spacing(3),
        transition: theme.transitions.create('margin', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
        marginLeft: `calc(${theme.spacing(8)} + 1px)`,
        ...((primarySidebarOpen || secondarySidebarOpen) && {
          transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
          }),
        }),
        ...(primarySidebarOpen && {
          marginLeft: `calc(${theme.spacing(8)} + ${
            1 + primarySidebarWidth
          }px)`,
        }),
        ...(secondarySidebarOpen && {
          marginRight: `${1 + secondarySidebarWidth}px`,
        }),
      }}>
      {books.some(book => book.path === primarySidebar) ? (
        <WordTabs />
      ) : (
        <Container maxWidth="md">
          <h1>Otamajakushi Bookshelf</h1>
          <h2>手軽に開発、便利な検索</h2>
          <List>
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <CreateNewFolderIcon />
                </ListItemIcon>
                <ListItemText primary="新しいプロジェクトを作成する" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <FolderOpenIcon />
                </ListItemIcon>
                <ListItemText primary="プロジェクトを開く" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton
                onClick={() => {
                  api
                    .fileOpen()
                    .then(data => {
                      switch (data.status) {
                        case 'cancel':
                          return false;
                        case 'failure':
                          enqueueSnackbar(
                            `ファイルが開けませんでした\n${data.message}`,
                          );
                          return false;
                        case 'success':
                          dispatch(
                            addBookAction({
                              path: data.path,
                              dictionary: OTMJSON.parse(data.text),
                            }),
                          );
                          return true;
                        default:
                          return false;
                      }
                    })
                    .catch(err => {
                      // eslint-disable-next-line no-console
                      console.log(err);
                      if ('at' in err && 'kind' in err && 'message' in err) {
                        enqueueSnackbar(
                          `場所：${err.at}, 種類：${err.kind}, エラーメッセージ：${err.message}`,
                        );
                      } else {
                        enqueueSnackbar('原因不明のエラー');
                      }
                    });
                }}>
                <ListItemIcon>
                  <FileOpenIcon />
                </ListItemIcon>
                <ListItemText primary="辞書ファイルを開く" />
              </ListItemButton>
            </ListItem>
          </List>
        </Container>
      )}
      {/* <ContentEditable value={text} onChange={setText} /> */}
    </Box>
  );
}
