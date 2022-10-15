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
  useTheme,
} from '@mui/material';
import { useSnackbar } from 'notistack';
import React from 'react';
import { useDispatch } from 'react-redux';

import { addBookAction } from '../actions/BookshelfActions';

const { api } = window;

export default function Hero(): JSX.Element {
  const theme = useTheme();
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  return (
    <Container
      maxWidth="md"
      sx={{
        flexGrow: 1,
        padding: theme.spacing(3),
        transition: theme.transitions.create('margin', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
      }}>
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
          <ListItemButton>
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
