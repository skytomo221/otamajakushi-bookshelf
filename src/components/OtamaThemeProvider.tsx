import { Theme } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import React, { ReactNode } from 'react';
import { useSelector } from 'react-redux';

import { State } from '../states/State';
import ThemeParameter from '../states/ThemeParameter';

declare module '@mui/material/styles' {
  interface Theme {
    button: {
      '-webkit-app-region': string,
    },
    grow: {
      flexGrow: number;
    };
    menuBar: {
      '-webkit-app-region': string;
      margin: number;
      position: string;
    };
    iconButton: {
      '-webkit-app-region': string;
    };
  }
  // allow configuration using `createTheme`
  interface ThemeOptions {
    button?: {
      '-webkit-app-region': string,
    },
    grow?: {
      flexGrow: number;
    };
    iconButton?: {
      '-webkit-app-region': string;
    };
    menuBar?: {
      '-webkit-app-region'?: string;
      margin?: number;
      position?: string;
    };
  }
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const createOtamaTheme = (param: ThemeParameter): Theme =>
  createTheme({
    button: {
      '-webkit-app-region': 'no-drag',
    },
    grow: {
      flexGrow: 1,
    },
    iconButton: {
      '-webkit-app-region': 'no-drag',
    },
    menuBar: {
      '-webkit-app-region': 'drag',
      margin: 0,
      position: 'fixed',
    },
  });

export interface Props {
  children?: ReactNode;
}

export default function OtamaThemeProvider({ children }: Props): JSX.Element {
  const theme = useSelector<State, ThemeParameter>(state => state.theme);
  return (
    <ThemeProvider theme={createOtamaTheme(theme)}>{children}</ThemeProvider>
  );
}
