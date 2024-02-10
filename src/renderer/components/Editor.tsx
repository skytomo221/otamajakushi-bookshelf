import React from 'react';

import { usePagesStore } from '../contexts/pagesContext';
import { useThemeStore } from '../contexts/themeContext';

import Hero from './Hero';
import WordTabs from './WordTabs';

export default function Editor(): JSX.Element {
  const selectedWords = usePagesStore();

  const theme = useThemeStore();

  return (
    <div className={theme.editor} style={{ height: '100%' }}>
      {selectedWords?.length ? <WordTabs /> : <Hero />}
    </div>
  );
}
