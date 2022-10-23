import MenuIcon from '@mui/icons-material/Menu';
import {
  useScrollTrigger,
  Zoom,
  useTheme,
  Box,
} from '@mui/material';
import AppBar from '@mui/material/AppBar';
import IconButton from '@mui/material/IconButton';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import React from 'react';
import { useSelector } from 'react-redux';

import { State } from '../states/State';
import ThemeParameter from '../states/ThemeParameter';

import ControlBox from './ControlBox';
import FileMenu from './FileMenu';

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

function ScrollTop(props: ElevationScrollProps) {
  const { children } = props;
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 100,
  });

  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    const anchor = (
      (event.target as HTMLDivElement).ownerDocument || document
    ).querySelector('#back-to-top-anchor');

    if (anchor) {
      anchor.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  return (
    <Zoom in={trigger}>
      <div onClick={handleClick} role="presentation">
        {children}
      </div>
    </Zoom>
  );
}

export default function OtamaMenuBar(): JSX.Element {
  const theme = useTheme();
  const parameter = useSelector<State, ThemeParameter>(state => state.theme);

  return (
    <AppBar position="static" className={parameter.style.menuBar} sx={theme.menuBar}>
      <Toolbar variant="dense">
        <IconButton edge="start" color="inherit" aria-label="open drawer">
          <MenuIcon />
        </IconButton>
        <FileMenu />
        <Box component="div" sx={theme.grow} />
        <Typography variant="body1" noWrap>
          Otamajakushi Bookshelf
        </Typography>
        <Box component="div" sx={theme.grow} />
        <ControlBox />
      </Toolbar>
    </AppBar>
  );
}
