import React, { useContext } from 'react';

import { useThemeStore } from '../../contexts/themeContext';

// eslint-disable-next-line import/no-cycle
import RecursionInForm from './RecursionInForm';
import styleJoin from './styleJoin';
import { PageRendererContext } from './PageRendererContext';

export default function H6InForm(): JSX.Element {
  const theme = useThemeStore();
  const { className } = useContext(PageRendererContext);
  return (
    <h6 className={styleJoin(theme.h6, className)}>
      <RecursionInForm />
    </h6>
  );
}
