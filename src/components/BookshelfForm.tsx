import {
  Box,
  Button,
  Container,
  createStyles,
  CssBaseline,
  ListItem,
  ListItemText,
  Snackbar,
  ThemeProvider,
  useScrollTrigger,
  useTheme,
} from '@mui/material';
import { SnackbarProvider, VariantType, useSnackbar } from 'notistack';
import OTMJSON from 'otamajakushi';
import { Otm } from 'otamajakushi/dist/Otm';
import { Word } from 'otamajakushi/dist/Word';
import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FixedSizeList, ListChildComponentProps } from 'react-window';

import { addBookAction } from '../actions/BookshelfActions';
import { changeSearchWordAction } from '../actions/SearchWordActions';
import { changeSelectedWordAction } from '../actions/SelectedWordActions';
import Bookshelf from '../states/Bookshelf';
import { State } from '../states/State';
import ThemeParameter from '../states/ThemeParameter';
import useWindowDimensions from '../useWindowDimensions';
import ActivityBar from './ActivityBar';

import OtamaMenuBar from './OtamaMenuBar';
import createOtamaTheme from './OtamaThemeProvider';
import OtamaThemeProvider from './OtamaThemeProvider';
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

export default function BookshelfForm(): JSX.Element {
  const theme = useTheme();

  return (
    <OtamaThemeProvider>
      <SnackbarProvider maxSnack={3}>
        <CssBaseline />
        <ElevationScroll>
          <OtamaMenuBar />
        </ElevationScroll>
        <ActivityBar />
        <Box component="div" sx={theme.mixins.toolbar} />
        <StatusBar />
      </SnackbarProvider>
    </OtamaThemeProvider>
  );
}
