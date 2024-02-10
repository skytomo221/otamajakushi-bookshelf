import * as React from 'react';

import { useThemeStore } from '../contexts/themeContext';

export default function StatusBar(): JSX.Element {
  const theme = useThemeStore();
  return (
    <footer
      className={`${theme.statuBar} flex h-6`}
    />
  );
}
