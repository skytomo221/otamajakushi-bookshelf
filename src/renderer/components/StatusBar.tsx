import MoreIcon from '@mui/icons-material/MoreVert';
import SearchIcon from '@mui/icons-material/Search';
import { useTheme } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Toolbar from '@mui/material/Toolbar';
import * as React from 'react';
import { useSelector } from 'react-redux';

import { State } from '../states/State';
import ThemeParameter from '../states/ThemeParameter';

export default function StatusBar(): JSX.Element {
  const theme = useTheme();
  const parameter = useSelector<State, ThemeParameter>(state => state.theme);

  return (
    <footer
      className={`${parameter.style.statuBar} flex h-6`}
    />
  );
}
