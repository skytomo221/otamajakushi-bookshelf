import { createStyles, fade, makeStyles, Theme } from '@material-ui/core';

import { ThemeExtension } from './theme';

const styles = makeStyles((theme: Theme) =>
  createStyles({
    appBar: {
      margin: 0,
      '-webkit-app-region': 'drag',
      position: 'fixed',
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
    scrollTop: {
      position: 'fixed',
      bottom: theme.spacing(2),
      right: theme.spacing(2),
    },
  }),
);

export default function defaultLightTheme(): ThemeExtension {
  return { name: 'defaultLightTheme', styles };
}
