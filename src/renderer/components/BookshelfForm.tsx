import { Box, CssBaseline, useScrollTrigger, useTheme } from '@mui/material';
import { SnackbarProvider } from 'notistack';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import Split from 'react-split';

import { State } from '../states/State';

import ActivityBar from './ActivityBar';
import Editor from './Editor';
import OtamaMenuBar from './OtamaMenuBar';
import OtamaThemeProvider from './OtamaThemeProvider';
import PrimarySidebar from './PrimarySidebar';
import SecondarySidebar from './SecondarySidebar';
import StatusBar from './StatusBar';

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

export default function BookshelfForm(): JSX.Element {
  const theme = useTheme();
  const [text, setText] = useState('この文章は書き換えることができます。');
  const primarySidebar = useSelector<State, null | string>(
    (state: State) => state.primarySidebar,
  );
  const secondarySidebar = useSelector<State, null | string>(
    (state: State) => state.secondarySidebar,
  );

  return (
    <OtamaThemeProvider>
      <SnackbarProvider maxSnack={3}>
        <CssBaseline />
        <ElevationScroll>
          <OtamaMenuBar />
        </ElevationScroll>
        <ActivityBar />
        <Box component="div" sx={theme.mixins.toolbar} />
        <Box
          component="main"
          sx={{
            marginLeft: `calc(${theme.spacing(8)} + 1px)`,
            marginTop: '-16px',
            height: `calc(100% - 96px)`,
          }}>
          <Split
            style={{
              display: 'flex',
              flexDirection: 'row',
              height: '100%',
            }}
            gutter={() => {
              const gutterElement = document.createElement('div');
              gutterElement.className = 'gutter';
              gutterElement.className = `w-[2px]
                                         mx-[2px]
                                         bg-indigo-500
                                         hover:cursor-col-resize
                                         hover:w-[6px]
                                         hover:mx-0
                                         hover:bg-indigo-700
                                         transition-all
                                         delay-75
                                         duration-300
                                         ease-in-out`;
              return gutterElement;
            }}
            gutterStyle={(_dimention, _gutterSize, index: number) => ({
              backgroundColor: theme.palette.divider,
              cursor: 'col-resize',
              visibility:
                (index === 1 && primarySidebar) ||
                (index === 2 && secondarySidebar)
                  ? 'visible'
                  : 'hidden',
            })}
            minSize={[
              primarySidebar ? 100 : 0,
              100,
              secondarySidebar ? 100 : 0,
            ]}
            sizes={[primarySidebar ? 15 : 0, 85, secondarySidebar ? 15 : 0]}>
            <div>
              <PrimarySidebar />
            </div>
            <div>
              <Editor />
            </div>
            <div>
              <SecondarySidebar />
            </div>
          </Split>
        </Box>
        <StatusBar />
      </SnackbarProvider>
    </OtamaThemeProvider>
  );
}
