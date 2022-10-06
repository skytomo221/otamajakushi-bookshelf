import MoreIcon from '@mui/icons-material/MoreVert';
import SearchIcon from '@mui/icons-material/Search';
import { useTheme } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Toolbar from '@mui/material/Toolbar';
import * as React from 'react';

export default function StatusBar(): JSX.Element {
  const theme = useTheme();

  return (
    <AppBar position="fixed" color="primary" sx={theme.statusBar}>
      <Toolbar variant="dense">
        <Box sx={{ flexGrow: 1 }} />
        <IconButton color="inherit">
          <SearchIcon />
        </IconButton>
        <IconButton color="inherit">
          <MoreIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
}
