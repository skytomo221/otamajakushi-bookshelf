import React, { useContext } from 'react';

import { useThemeStore } from '../../contexts/themeContext';

import { PageRendererContext } from './PageRendererContext';
// eslint-disable-next-line import/no-cycle
import Recursion from './Recursion';
import styleJoin from './styleJoin';

export default function H5(): JSX.Element {
  const theme = useThemeStore();
  const { className } = useContext(PageRendererContext);
  return (
    <h5 className={styleJoin(theme.h5, className)}>
      <Recursion />
    </h5>
  );
}
