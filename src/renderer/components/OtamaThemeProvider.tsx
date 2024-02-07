import { Theme } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import React, { ReactNode } from 'react';

import { useThemeStore } from '../contexts/themeContext';
import ThemeParameter from '../states/ThemeParameter';

const plainTheme = createTheme();

declare module '@mui/material/styles' {
  interface Theme {
    body1: {
      margin: string;
    };
    body2: {
      margin: string;
    };
    button: {
      '-webkit-app-region': string;
    };
    chip: {
      margin: string;
    };
    grow: {
      flexGrow: number;
    };
    iconButton: {
      '-webkit-app-region': string;
    };
    menuBar: {
      '-webkit-app-region': string;
      margin: number;
      position: string;
      zIndex: number;
    };
    statusBar: {
      top: 'auto';
      bottom: 0;
      zIndex: number;
    };
    string: {
      margin: string;
    };
  }
  // allow configuration using `createTheme`
  interface ThemeOptions {
    body1?: {
      margin: string;
    };
    body2?: {
      margin: string;
    };
    button?: {
      '-webkit-app-region': string;
    };
    chip?: {
      margin: string;
    };
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
      zIndex?: number;
    };
    statusBar?: {
      top: string;
      bottom: number;
      zIndex?: number;
    };
    string?: {
      margin: string;
    };
  }
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const createOtamaTheme = (param: ThemeParameter): Theme =>
  createTheme({
    body1: {
      margin: plainTheme.spacing(1.0),
    },
    body2: {
      margin: plainTheme.spacing(0.75),
    },
    button: {
      '-webkit-app-region': 'no-drag',
    },
    chip: {
      margin: plainTheme.spacing(0.25),
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
      zIndex: 1201,
    },
    statusBar: {
      top: 'auto',
      bottom: 0,
      zIndex: 1201,
    },
    string: {
      margin: plainTheme.spacing(0.75),
    },
  });

export interface Props {
  children: ReactNode;
}

export default function OtamaThemeProvider({ children }: Props): JSX.Element {
  const theme = useThemeStore();
  return (
    <ThemeProvider theme={createOtamaTheme(theme)}>{children}</ThemeProvider>
  );
}
