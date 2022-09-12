import {
  Box,
  Button,
  Container,
  createStyles,
  CssBaseline,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Snackbar,
  styled,
  Tab,
  Tabs,
  ThemeProvider,
  useScrollTrigger,
  useTheme,
} from '@mui/material';
import { SnackbarProvider, useSnackbar } from 'notistack';
import OTMJSON from 'otamajakushi';
import { Otm } from 'otamajakushi/dist/Otm';
import { Word } from 'otamajakushi/dist/Word';
import React, { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FixedSizeList, ListChildComponentProps } from 'react-window';

import { addBookAction } from '../actions/BookshelfActions';
import { changeSearchWordAction } from '../actions/SearchWordActions';
import Book from '../states/Book';
import Bookshelf from '../states/Bookshelf';
import { State } from '../states/State';
import ThemeParameter from '../states/ThemeParameter';
import useWindowDimensions from '../useWindowDimensions';
import ActivityBar, { activityBarWidth } from './ActivityBar';
import ContentEditable from './ContentEditable';
import CreateNewFolderIcon from '@mui/icons-material/CreateNewFolder';
import NoteAddIcon from '@mui/icons-material/NoteAdd';
import EditIcon from '@mui/icons-material/Edit';
import FolderIcon from '@mui/icons-material/Folder';
import FileOpenIcon from '@mui/icons-material/FileOpen';
import FolderOpenIcon from '@mui/icons-material/FolderOpen';

import OtamaMenuBar from './OtamaMenuBar';
import createOtamaTheme from './OtamaThemeProvider';
import OtamaThemeProvider from './OtamaThemeProvider';
import PrimarySidebar, { primarySidebarWidth } from './PrimarySidebar';
import SecondarySidebar, { secondarySidebarWidth } from './SecondarySidebar';
import StatusBar from './StatusBar';
import WordTabs from './WordTabs';
import { ipcRenderer } from 'electron';
import Editor from './Editor';

type ElevationScrollProps = {
  children: React.ReactElement;
};

function ElevationScroll(props: ElevationScrollProps) {
  const { children } = props;
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
  });

  return React.cloneElement(children, {
    elevation: trigger ? 4 : 0,
  });
}

export default function BookshelfForm(): JSX.Element {
  const theme = useTheme();
  const [text, setText] = useState('この文章は書き換えることができます。');

  return (
    <OtamaThemeProvider>
      <SnackbarProvider maxSnack={3}>
        <CssBaseline />
        <ElevationScroll>
          <OtamaMenuBar />
        </ElevationScroll>
        <ActivityBar />
        <PrimarySidebar />
        <SecondarySidebar />
        <Box component="div" sx={theme.mixins.toolbar} />
        <Editor />
        <StatusBar />
      </SnackbarProvider>
    </OtamaThemeProvider>
  );
}
