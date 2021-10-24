import { ipcRenderer } from 'electron';

import {
  CssBaseline,
  Fab,
  Snackbar,
  useScrollTrigger,
  Zoom,
} from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import MenuIcon from '@material-ui/icons/Menu';
import MinimizeIcon from '@material-ui/icons/Minimize';
import { AlertTitle } from '@material-ui/lab';
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';
import { mdiWindowMaximize } from '@mdi/js';
import Icon from '@mdi/react';
import React from 'react';
import { useSelector } from 'react-redux';

import { ThemeExtension } from '../extension/theme';
import { State } from '../states/State';

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
  const { useStyles } = useSelector<State, ThemeExtension>(
    state => state.theme,
  );
  const classes = useStyles();
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
      <div
        onClick={handleClick}
        role="presentation"
        className={classes.scrollTop}>
        {children}
      </div>
    </Zoom>
  );
}

function Alert(props: AlertProps) {
  // eslint-disable-next-line react/jsx-props-no-spreading
  return <MuiAlert elevation={6} {...props} />;
}

type Props = {
  onBookChange: (text: string) => void;
};

export default function OtamaAppBar(props: Props): JSX.Element {
  const { useStyles } = useSelector<State, ThemeExtension>(
    state => state.theme,
  );
  const classes = useStyles();
  const { onBookChange } = props;
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const isMenuOpen = Boolean(anchorEl);

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
              onBookChange(data.text);
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
    <>
      <CssBaseline />
      <ElevationScroll>
        <AppBar position="static" className={classes.appBar}>
          <Toolbar variant="dense">
            <IconButton
              edge="start"
              className={classes.menuIconButton}
              color="inherit"
              aria-label="open drawer">
              <MenuIcon />
            </IconButton>
            <div>
              <Button
                color="inherit"
                className={classes.iconButton}
                onClick={handleMenuClick}>
                <Typography variant="button" noWrap>
                  ファイル
                </Typography>
              </Button>
            </div>
            <div className={classes.grow} />
            <Typography className={classes.title} variant="body1" noWrap>
              ようこそ - Otamajakushi Bookshelf
            </Typography>
            <div className={classes.grow} />
            <div className={classes.sectionDesktop}>
              <IconButton
                aria-label="show 17 new notifications"
                color="inherit"
                onClick={windowMinimize}
                className={classes.iconButton}>
                <MinimizeIcon />
              </IconButton>
              <IconButton
                aria-label="show 4 new mails"
                color="inherit"
                onClick={windowMaximize}
                className={classes.iconButton}>
                <Icon
                  path={mdiWindowMaximize}
                  title="Window Maximize"
                  size={1}
                />
              </IconButton>
              <IconButton
                edge="end"
                aria-label="account of current user"
                aria-controls={menuId}
                aria-haspopup="true"
                onClick={windowClose}
                color="inherit"
                className={classes.iconButton}>
                <CloseIcon />
              </IconButton>
            </div>
          </Toolbar>
        </AppBar>
      </ElevationScroll>
      <Toolbar id="back-to-top-anchor" />
      {renderMenu}
      <ScrollTop>
        <Fab color="secondary" size="small" aria-label="scroll back to top">
          <KeyboardArrowUpIcon />
        </Fab>
      </ScrollTop>
      <Snackbar
        open={alertOpen}
        autoHideDuration={10000}
        onClose={alertHandleClose}>
        <Alert onClose={alertHandleClose} severity="error">
          <AlertTitle>
            <strong>辞書ファイルの読み込みに失敗しました。</strong>
          </AlertTitle>
          {errorMessage}
        </Alert>
      </Snackbar>
    </>
  );
}
