import { mdiWindowMaximize } from '@mdi/js';
import Icon from '@mdi/react';
import CloseIcon from '@mui/icons-material/Close';
import MinimizeIcon from '@mui/icons-material/Minimize';
import React from 'react';
import { useSelector } from 'react-redux';

import { State } from '../states/State';
import ThemeParameter from '../states/ThemeParameter';

const { api } = window;

const defaultStyle = 'flex [-webkit-app-region:no-drag]';
const defaultButtonStyle = 'flex items-center justify-center w-10';
const defaultMinximizeStyle = `${defaultButtonStyle} hover:bg-slate-400/20`;
const defaultCloseStyle = `${defaultButtonStyle} hover:bg-[#ff0000]`;

function MinimizeButton(): JSX.Element {
  const theme = useSelector<State, ThemeParameter>(state => state.theme);
  return (
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events
    <div
      className={
        theme.style['ControlBox.MinimizeButton'] ?? defaultMinximizeStyle
      }
      id="minimize-button"
      onClick={api.windowMinimize}
      tabIndex={-1}
      role="button">
      <MinimizeIcon />
    </div>
  );
}

function MaximizeButton(): JSX.Element {
  const theme = useSelector<State, ThemeParameter>(state => state.theme);
  return (
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events
    <div
      className={
        theme.style['ControlBox.MaximizeButton'] ?? defaultMinximizeStyle
      }
      id="maximize-button"
      onClick={api.windowMaximize}
      tabIndex={-1}
      role="button">
      <Icon path={mdiWindowMaximize} title="Window Maximize" size={1} />
    </div>
  );
}

function CloseButton(): JSX.Element {
  const theme = useSelector<State, ThemeParameter>(state => state.theme);
  return (
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events
    <div
      className={theme.style['ControlBox.CloseButton'] ?? defaultCloseStyle}
      id="close-button"
      onClick={api.windowClose}
      tabIndex={-1}
      role="button">
      <CloseIcon />
    </div>
  );
}

export default function ControlBox(): JSX.Element {
  const theme = useSelector<State, ThemeParameter>(state => state.theme);
  return (
    <div className={theme.style.ControlBox ?? defaultStyle}>
      <MinimizeButton />
      <MaximizeButton />
      <CloseButton />
    </div>
  );
}
