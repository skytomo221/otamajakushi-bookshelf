import CreateNewFolderIcon from '@mui/icons-material/CreateNewFolder';
import FileOpenIcon from '@mui/icons-material/FileOpen';
import FolderOpenIcon from '@mui/icons-material/FolderOpen';
import {
  Container,
  Typography,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  ListItem,
  List,
} from '@mui/material';
import { useSnackbar } from 'notistack';
import React from 'react';
import { useDispatch } from 'react-redux';

import { addBookAction } from '../actions/BookshelfActions';

const { api } = window;

export default function Hero(): JSX.Element {
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  return (
    <Container maxWidth="md">
      <Typography variant="h2">Otamajakushi Bookshelf</Typography>
      <Typography variant="h3">手軽に開発、便利な検索</Typography>
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
                      data.paths.forEach(path =>
                        dispatch(
                          addBookAction({
                            path,
                            editable: false,
                          }),
                        ),
                      );
                      return true;
                    default:
                      return false;
                  }
                })
                .catch(err => {
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
  );
}
