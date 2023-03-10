import * as React from 'react';
import { useSelector } from 'react-redux';

import { State } from '../states/State';
import ThemeParameter from '../states/ThemeParameter';

export default function StatusBar(): JSX.Element {
  const theme = useSelector<State, ThemeParameter>(state => state.theme);

  return (
    <footer
      className={`${theme.style.statuBar} flex h-6`}
    />
  );
}
