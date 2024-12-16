import React, { useContext } from 'react';

import { useThemeStore } from '../../contexts/themeContext';

import { PageRendererContext } from './PageRendererContext';
// eslint-disable-next-line import/no-cycle
import Recursion from './Recursion';
import styleJoin from './styleJoin';

export default function H2(): JSX.Element {
  const theme = useThemeStore();
  const { className } = useContext(PageRendererContext);
  return (
    <h2 className={styleJoin(theme.h2, className)}>
      <Recursion />
    </h2>
  );
}
