import { mdiWindowMaximize } from '@mdi/js';
import Icon from '@mdi/react';
import CloseIcon from '@mui/icons-material/Close';
import MinimizeIcon from '@mui/icons-material/Minimize';
import React from 'react';

import { useThemeStore } from '../contexts/themeContext';

const { api } = window;

const defaultStyle = 'flex [-webkit-app-region:no-drag]';
const defaultButtonStyle = 'flex items-center justify-center w-10';
const defaultMinximizeStyle = `${defaultButtonStyle} hover:bg-slate-400/20`;
const defaultCloseStyle = `${defaultButtonStyle} hover:bg-[#ff0000]`;

function MinimizeButton(): JSX.Element {
  const theme = useThemeStore();
  return (
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events
    <div
      aria-label="最小化"
      className={
        theme['ControlBox.MinimizeButton'] ?? defaultMinximizeStyle
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
  const theme = useThemeStore();
  return (
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events
    <div
      aria-label="最大化"
      className={
        theme['ControlBox.MaximizeButton'] ?? defaultMinximizeStyle
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
  const theme = useThemeStore();
  return (
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events
    <div
      aria-label="閉じる"
      className={theme['ControlBox.CloseButton'] ?? defaultCloseStyle}
      id="close-button"
      onClick={api.windowClose}
      tabIndex={-1}
      role="button">
      <CloseIcon />
    </div>
  );
}

export default function ControlBox(): JSX.Element {
  const theme = useThemeStore();
  return (
    <div className={theme.ControlBox ?? defaultStyle}>
      <MinimizeButton />
      <MaximizeButton />
      <CloseButton />
    </div>
  );
}
