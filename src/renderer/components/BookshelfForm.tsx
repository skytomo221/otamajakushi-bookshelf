import { CssBaseline, useTheme } from '@mui/material';
import { SnackbarProvider } from 'notistack';
import React from 'react';
import { useSelector } from 'react-redux';
import Split from 'react-split';

import PrimarySidebarStates from '../states/PrimarySidebarState';
import { State } from '../states/State';
import ThemeParameter from '../states/ThemeParameter';

import ActivityBar from './ActivityBar';
import Editor from './Editor';
import On from './On';
import OtamaMenuBar from './OtamaMenuBar';
import OtamaThemeProvider from './OtamaThemeProvider';
import PrimarySidebar from './PrimarySidebar';
import SecondarySidebar from './SecondarySidebar';
import StatusBar from './StatusBar';

export default function BookshelfForm(): JSX.Element {
  const theme = useTheme();
  const primarySidebar = useSelector<State, null | PrimarySidebarStates>(
    (state: State) => state.primarySidebar,
  );
  const secondarySidebar = useSelector<State, null | string>(
    (state: State) => state.secondarySidebar,
  );
  const parameter = useSelector<State, ThemeParameter>(state => state.theme);

  return (
    <OtamaThemeProvider>
      <SnackbarProvider maxSnack={3}>
        <div className={`${parameter.style.main} h-full`}>
          <On />
          <CssBaseline />
          <main className="flex flex-col h-full max-h-full">
            <OtamaMenuBar />
            <div className="flex flex-row h-[calc(100%-56px)]">
              <ActivityBar />
              <Split
                className="flex flex-row grow h-full"
                elementStyle={(_dimension, size, gutterSize, index) => ({
                  width: `calc(${size}% - ${
                    (index === 1 && primarySidebar) ||
                    (index === 2 && secondarySidebar)
                      ? gutterSize
                      : 0
                  }px)`,
                })}
                gutter={() => {
                  const gutterElement = document.createElement('div');
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
                  display:
                    (index === 1 && primarySidebar) ||
                    (index === 2 && secondarySidebar)
                      ? 'inherit'
                      : 'none',
                })}
                minSize={[
                  primarySidebar ? 100 : 0,
                  100,
                  secondarySidebar ? 100 : 0,
                ]}
                sizes={[
                  primarySidebar ? 25 : 0,
                  100,
                  secondarySidebar ? 25 : 0,
                ]}>
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
            </div>
            <StatusBar />
          </main>
        </div>
      </SnackbarProvider>
    </OtamaThemeProvider>
  );
}
