import {
  Box,
  useTheme,
} from '@mui/material';
import React from 'react';
import { useSelector } from 'react-redux';

import { Mediator } from '../Mediator';
import { State } from '../states/State';

import Hero from './Hero';
import WordTabs from './WordTabs';

export default function Editor(): JSX.Element {
  const theme = useTheme();
  const selectedWords = useSelector<State, null | Mediator[]>(
    (state: State) => state.selectedWords,
  );

  return (
    <Box
      component="div"
      sx={{
        flexGrow: 1,
        padding: theme.spacing(3),
        transition: theme.transitions.create('margin', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
      }}>
      {selectedWords?.length ? <WordTabs /> : <Hero />}
      {/* <ContentEditable value={text} onChange={setText} /> */}
    </Box>
  );
}
