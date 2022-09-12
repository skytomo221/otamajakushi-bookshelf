import {
  Box,
  Button,
  Container,
  createStyles,
  CssBaseline,
  ListItem,
  ListItemText,
  Snackbar,
  styled,
  Tab,
  Tabs,
  ThemeProvider,
  useScrollTrigger,
  useTheme,
} from '@mui/material';
import { SnackbarProvider } from 'notistack';
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

import OtamaMenuBar from './OtamaMenuBar';
import createOtamaTheme from './OtamaThemeProvider';
import OtamaThemeProvider from './OtamaThemeProvider';
import PrimarySidebar, { primarySidebarWidth } from './PrimarySidebar';
import SecondarySidebar, { secondarySidebarWidth } from './SecondarySidebar';
import StatusBar from './StatusBar';
import WordTabs from './WordTabs';

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

const Editor = styled('main')<{
  primarySidebarOpen: boolean;
  secondarySidebarOpen: boolean;
}>(({ theme, primarySidebarOpen, secondarySidebarOpen }) => ({
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
    marginLeft: `calc(${theme.spacing(8)} + ${1 + primarySidebarWidth}px)`,
  }),
  ...(secondarySidebarOpen && {
    marginRight: `${1 + secondarySidebarWidth}px`,
  }),
}));

export default function BookshelfForm(): JSX.Element {
  const theme = useTheme();
  const [text, setText] = useState('この文章は書き換えることができます。');
  const primarySidebar = useSelector<State, null | string>(
    (state: State) => state.primarySidebar,
  );
  const secondarySidebar = useSelector<State, null | string>(
    (state: State) => state.secondarySidebar,
  );
  const books = useSelector<State, Book[]>(
    (state: State) => state.bookshelf.books,
  );

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
        <Editor
          primarySidebarOpen={primarySidebar !== null}
          secondarySidebarOpen={secondarySidebar !== null}>
          {books.some(book => book.path === primarySidebar) ? (
            <WordTabs />
          ) : (
            <Container maxWidth="md">
              <h1>ようこそ！</h1>
            </Container>
          )}
          <ContentEditable value={text} onChange={setText} />
        </Editor>
        <StatusBar />
      </SnackbarProvider>
    </OtamaThemeProvider>
  );
}
