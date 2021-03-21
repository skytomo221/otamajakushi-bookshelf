import { ipcRenderer } from 'electron';

import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import {
  fade,
  makeStyles,
  Theme,
  createStyles,
} from '@material-ui/core/styles';
import CloseIcon from '@material-ui/icons/Close';
import MenuIcon from '@material-ui/icons/Menu';
import MinimizeIcon from '@material-ui/icons/Minimize';
import { mdiWindowMaximize } from '@mdi/js';
import Icon from '@mdi/react';
import React from 'react';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    appBar: {
      margin: 0,
      '-webkit-app-region': 'drag',
    },
    grow: {
      flexGrow: 1,
    },
    menuIconButton: {
      marginRight: theme.spacing(2),
      '-webkit-app-region': 'no-drag',
    },
    iconButton: {
      '-webkit-app-region': 'no-drag',
    },
    title: {
      display: 'none',
      textOverflow: 'ellipsis',
      overflow: 'hidden',
      [theme.breakpoints.up('sm')]: {
        display: 'block',
      },
      minWidth: '100px',
    },
    search: {
      position: 'relative',
      borderRadius: theme.shape.borderRadius,
      backgroundColor: fade(theme.palette.common.white, 0.15),
      '&:hover': {
        backgroundColor: fade(theme.palette.common.white, 0.25),
      },
      marginRight: theme.spacing(2),
      marginLeft: 0,
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(3),
        width: 'auto',
      },
    },
    searchIcon: {
      padding: theme.spacing(0, 2),
      height: '100%',
      position: 'absolute',
      pointerEvents: 'none',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    inputRoot: {
      color: 'inherit',
    },
    inputInput: {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('md')]: {
        width: '20ch',
      },
    },
    sectionDesktop: {
      display: 'none',
      [theme.breakpoints.up('xs')]: {
        display: 'flex',
        flexShrink: 1,
      },
    },
  }),
);

interface OtamaAppBarProps {
  onBookChange: (text: string) => void;
}

export default function OtamaAppBar(props: OtamaAppBarProps): JSX.Element {
  const classes = useStyles();
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
          // メインプロセスを呼び出し
          ipcRenderer
            .invoke('file-open')
            .then(data => {
              // キャンセルで閉じた
              if (data.status === undefined) {
                return false;
              }
              // ファイルが開けなかった
              if (!data.status) {
                alert(`ファイルが開けませんでした\n${data.message}`);
                return false;
              }
              props.onBookChange(data.text);
              return true;
            })
            .catch(err => {
              alert(err);
            });
        }}>
        辞書を開く
      </MenuItem>
    </Menu>
  );

  return (
    <>
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
              <Icon path={mdiWindowMaximize} title="Window Maximize" size={1} />
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
      {renderMenu}
    </>
  );
}
