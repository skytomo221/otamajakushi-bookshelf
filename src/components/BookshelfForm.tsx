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
  ThemeProvider,
  useScrollTrigger,
  useTheme,
} from '@mui/material';
import { SnackbarProvider, VariantType, useSnackbar } from 'notistack';
import OTMJSON from 'otamajakushi';
import { Otm } from 'otamajakushi/dist/Otm';
import { Word } from 'otamajakushi/dist/Word';
import React, { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FixedSizeList, ListChildComponentProps } from 'react-window';

import { addBookAction } from '../actions/BookshelfActions';
import { changeSearchWordAction } from '../actions/SearchWordActions';
import { changeSelectedWordAction } from '../actions/SelectedWordActions';
import Bookshelf from '../states/Bookshelf';
import { State } from '../states/State';
import ThemeParameter from '../states/ThemeParameter';
import useWindowDimensions from '../useWindowDimensions';
import ActivityBar, { activityBarWidth } from './ActivityBar';
import ContentEditable from './ContentEditable';

import OtamaMenuBar from './OtamaMenuBar';
import createOtamaTheme from './OtamaThemeProvider';
import OtamaThemeProvider from './OtamaThemeProvider';
import PrimiarySidebar, { primiarySidebarWidth } from './PrimiarySidebar';
import StatusBar from './StatusBar';

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

const Editor = styled('main', {
  shouldForwardProp: prop => prop !== 'open',
})<{
  open?: boolean;
}>(({ theme, open }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  transition: theme.transitions.create('margin', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginLeft: `calc(${theme.spacing(8)} + 1px)`,
  ...(open && {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: `calc(${theme.spacing(8)} + ${1 + primiarySidebarWidth}px)`,
  }),
}));

export default function BookshelfForm(): JSX.Element {
  const theme = useTheme();
  const [text, setText] = useState('この文章は書き換えることができます。');
  const primarySidebar = useSelector<State, null | string>(
    (state: State) => state.primarySidebar,
  );

  return (
    <OtamaThemeProvider>
      <SnackbarProvider maxSnack={3}>
        <CssBaseline />
        <ElevationScroll>
          <OtamaMenuBar />
        </ElevationScroll>
        <ActivityBar />
        <PrimiarySidebar />
        <Box component="div" sx={theme.mixins.toolbar} />
        <Editor open={primarySidebar !== null}>
          <Container maxWidth="md">
            <ContentEditable value={text} onChange={setText} />
          </Container>
        </Editor>
        <StatusBar />
      </SnackbarProvider>
    </OtamaThemeProvider>
  );
}
