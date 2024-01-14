import React, { ReactNode } from 'react';
import { useSelector } from 'react-redux';

import { State } from '../../states/State';
import ThemeParameter from '../../states/ThemeParameter';

type Props = {
  children: ReactNode;
};

export default function Error({ children }: Props): JSX.Element {
  const theme = useSelector<State, ThemeParameter>(state => state.theme);
  return <div className={theme.style.Error}>{children}</div>;
}
