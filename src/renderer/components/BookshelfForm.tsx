import { CssBaseline, useTheme } from '@mui/material';
import { SnackbarProvider } from 'notistack';
import React from 'react';
import Split from 'react-split';

import { ExtensionsProvider } from '../contexts/extensionsContext';
import { PagesProvider } from '../contexts/pagesContext';
import {
  PrimarySidebarProvider,
  usePrimarySidebarStore,
} from '../contexts/primarySidebarContext';
import {
  SecondarySidebarProvider,
  useSecondarySidebarStore,
} from '../contexts/secondarySidebarContext';
import { ThemeProvider, useThemeStore } from '../contexts/themeContext';
import { WorkbenchProvider } from '../contexts/workbenchContext';

import ActivityBar from './ActivityBar';
import Editor from './Editor';
import On from './On';
import OtamaMenuBar from './OtamaMenuBar';
import PrimarySidebar from './PrimarySidebar';
import SecondarySidebar from './SecondarySidebar';
import StatusBar from './StatusBar';

function BookshelfFormInProviders(): JSX.Element {
  const isDisplayPrimarySidebar = usePrimarySidebarStore().display;
  const secondarySidebar = useSecondarySidebarStore();
  const theme = useThemeStore();

  return (
    <div className={`${theme.main} h-full`}>
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
                (index === 1 && isDisplayPrimarySidebar) ||
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
              backgroundColor: '#EEEEEE', // TODO: add theme.divider
              cursor: 'col-resize',
              display:
                (index === 1 && isDisplayPrimarySidebar) ||
                (index === 2 && secondarySidebar)
                  ? 'inherit'
                  : 'none',
            })}
            minSize={[
              isDisplayPrimarySidebar ? 100 : 0,
              100,
              secondarySidebar ? 100 : 0,
            ]}
            sizes={[
              isDisplayPrimarySidebar ? 25 : 0,
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
  );
}

export default function BookshelfForm(): JSX.Element {
  return (
    <ThemeProvider>
      <SnackbarProvider maxSnack={3}>
        <ExtensionsProvider>
          <PagesProvider>
            <WorkbenchProvider>
              <PrimarySidebarProvider>
                <SecondarySidebarProvider>
                  <BookshelfFormInProviders />
                </SecondarySidebarProvider>
              </PrimarySidebarProvider>
            </WorkbenchProvider>
          </PagesProvider>
        </ExtensionsProvider>
      </SnackbarProvider>
    </ThemeProvider>
  );
}
