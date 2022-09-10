import { ipcRenderer } from 'electron';

import { mdiWindowMaximize } from '@mdi/js';
import Icon from '@mdi/react';
import CloseIcon from '@mui/icons-material/Close';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import MenuIcon from '@mui/icons-material/Menu';
import MinimizeIcon from '@mui/icons-material/Minimize';
import {
  CssBaseline,
  Fab,
  Snackbar,
  useScrollTrigger,
  Zoom,
  AlertTitle,
  useTheme,
  Box,
} from '@mui/material';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import React from 'react';
import { useSelector } from 'react-redux';

import { State } from '../states/State';

import ControlBox from './ControlBox';

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

function Alert(props: AlertProps) {
  // eslint-disable-next-line react/jsx-props-no-spreading
  return <MuiAlert elevation={6} {...props} />;
}

export default function OtamaMenuBar(): JSX.Element {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const isMenuOpen = Boolean(anchorEl);
  const theme = useTheme();

  const windowMinimize = () => {
    ipcRenderer.invoke('window-minimize');
  };

  const windowMaximize = () => {
    ipcRenderer.invoke('window-maximize');
  };

  const windowClose = () => {
    ipcRenderer.invoke('window-close');
  };

  const handleMenuClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const [alertOpen, setAlertOpen] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState('');

  const alertHandleClick = (message: string) => {
    setErrorMessage(message);
    setAlertOpen(true);
  };

  const alertHandleClose = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setAlertOpen(false);
  };

  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMenuOpen}
      onClose={handleMenuClose}>
      <MenuItem onClick={handleMenuClose}>新規の辞書作成</MenuItem>
      <MenuItem
        onClick={() => {
          ipcRenderer
            .invoke('file-open')
            .then(data => {
              if (data.status === undefined) {
                return false;
              }
              if (!data.status) {
                alertHandleClick(`ファイルが開けませんでした\n${data.message}`);
                return false;
              }
              return true;
            })
            .catch(err => {
              // eslint-disable-next-line no-console
              console.log(err);
              if ('at' in err && 'kind' in err && 'message' in err) {
                alertHandleClick(
                  `場所：${err.at}, 種類：${err.kind}, エラーメッセージ：${err.message}`,
                );
              } else {
                alertHandleClick('原因不明のエラー');
              }
            });
        }}>
        辞書を開く
      </MenuItem>
    </Menu>
  );

  return (
    <AppBar position="static" sx={theme.menuBar}>
      <Toolbar variant="dense">
        <IconButton edge="start" color="inherit" aria-label="open drawer">
          <MenuIcon />
        </IconButton>
        <div>
          <Button color="inherit" onClick={handleMenuClick} sx={theme.button}>
            <Typography variant="button" noWrap>
              ファイル
            </Typography>
          </Button>
        </div>
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
