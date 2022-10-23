import { mdiWindowMaximize } from '@mdi/js';
import Icon from '@mdi/react';
import CloseIcon from '@mui/icons-material/Close';
import MinimizeIcon from '@mui/icons-material/Minimize';
import { IconButton, styled } from '@mui/material';
import React from 'react';

const { api } = window;

const CustomIconButton = styled(IconButton)(({ theme }) => ({
  '-webkit-app-region': theme.iconButton['-webkit-app-region'],
}));

function MinimizeIconButton(): JSX.Element {
  return (
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events
    <div
      className="flex items-center justify-center w-10 hover:bg-slate-400/20"
      onClick={api.windowMinimize}
      tabIndex={-1}
      role="button">
      <MinimizeIcon />
    </div>
  );
}

function MaximizeIconButton(): JSX.Element {
  return (
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events
    <div
      className="flex items-center justify-center w-10 hover:bg-slate-400/20"
      onClick={api.windowMaximize}
      tabIndex={-1}
      role="button">
      <Icon path={mdiWindowMaximize} title="Window Maximize" size={1} />
    </div>
  );
}

function CloseIconButton(): JSX.Element {
  return (
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events
    <div
      className="flex items-center justify-center w-10 hover:bg-[#ff0000]"
      onClick={api.windowClose}
      tabIndex={-1}
      role="button">
      <CloseIcon />
    </div>
  );
}

export default function ControlBox(): JSX.Element {
  return (
    <div className="flex [-webkit-app-region:no-drag]">
      <MinimizeIconButton />
      <MaximizeIconButton />
      <CloseIconButton />
    </div>
  );
}
