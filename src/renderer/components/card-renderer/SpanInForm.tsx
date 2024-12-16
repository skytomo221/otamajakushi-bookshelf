import React, { useContext } from 'react';

import { useThemeStore } from '../../contexts/themeContext';

// eslint-disable-next-line import/no-cycle
import RecursionInForm from './RecursionInForm';
import styleJoin from './styleJoin';
import { PageRendererContext } from './PageRendererContext';

export default function SpanInForm(): JSX.Element {
  const theme = useThemeStore();
  const { className } = useContext(PageRendererContext);
  return (
    <span className={styleJoin(theme.span, className)}>
      <RecursionInForm />
    </span>
  );
}
