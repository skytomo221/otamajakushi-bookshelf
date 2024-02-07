import React, { ReactNode } from 'react';

import { useThemeStore } from '../../contexts/themeContext';

type Props = {
  children: ReactNode;
};

export default function Error({ children }: Props): JSX.Element {
  const theme = useThemeStore();
  return <div className={theme.style.Error}>{children}</div>;
}
