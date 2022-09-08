import {
  Container,
  createStyles,
  ListItem,
  ListItemText,
  ThemeProvider,
} from '@mui/material';
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
import createOtamaTheme from './OtamaThemeProvider';

import OtamaMenuBar from './OtamaMenuBar';
import OtamaThemeProvider from './OtamaThemeProvider';

export default function BookshelfForm(): JSX.Element {
  return (
    <OtamaThemeProvider>
      <OtamaMenuBar />
      Hello!
    </OtamaThemeProvider>
  );
}
