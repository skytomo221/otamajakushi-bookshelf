import { Box, CssBaseline, useScrollTrigger, useTheme } from '@mui/material';
import { SnackbarProvider } from 'notistack';
import React, { useState } from 'react';

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

  return (
    <OtamaThemeProvider>
      <SnackbarProvider maxSnack={3}>
        <CssBaseline />
        <ElevationScroll>
          <OtamaMenuBar />
        </ElevationScroll>
        <ActivityBar />
        <PrimarySidebar />
        <SecondarySidebar />
        <Box component="div" sx={theme.mixins.toolbar} />
        <Editor />
        <StatusBar />
      </SnackbarProvider>
    </OtamaThemeProvider>
  );
}
