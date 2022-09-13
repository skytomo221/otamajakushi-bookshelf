import { mdiWindowMaximize } from '@mdi/js';
import Icon from '@mdi/react';
import CloseIcon from '@mui/icons-material/Close';
import MinimizeIcon from '@mui/icons-material/Minimize';
import { IconButton, styled } from '@mui/material';
import React from 'react';

import { windowMinimize, windowMaximize, windowClose } from '../windowControl';

const CustomIconButton = styled(IconButton)(({ theme }) => ({
  '-webkit-app-region': theme.iconButton['-webkit-app-region'],
}));

function MinimizeIconButton(): JSX.Element {
  return (
    <CustomIconButton color="inherit" onClick={windowMinimize}>
      <MinimizeIcon />
    </CustomIconButton>
  );
}

function MaximizeIconButton(): JSX.Element {
  return (
    <CustomIconButton color="inherit" onClick={windowMaximize}>
      <Icon path={mdiWindowMaximize} title="Window Maximize" size={1} />
    </CustomIconButton>
  );
}

function CloseIconButton(): JSX.Element {
  return (
    <CustomIconButton color="inherit" onClick={windowClose}>
      <CloseIcon />
    </CustomIconButton>
  );
}

export default function ControlBox(): JSX.Element {
  return (
    <div>
      <MinimizeIconButton />
      <MaximizeIconButton />
      <CloseIconButton />
    </div>
  );
}
