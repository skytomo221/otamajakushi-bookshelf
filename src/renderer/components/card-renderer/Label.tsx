import React, { useContext } from 'react';

import { useThemeStore } from '../../contexts/themeContext';

// eslint-disable-next-line import/no-cycle
import RecursionInForm from './RecursionInForm';
import styleJoin from './styleJoin';
import { PageRendererContext } from './PageRendererContext';

interface Props {
  for: string;
}

export default function H5InForm({
  for: htmlFor,
}: Props): JSX.Element {
  const theme = useThemeStore();
  const { className, pageIndex } = useContext(PageRendererContext);
  return (
    // eslint-disable-next-line jsx-a11y/label-has-associated-control
    <label
      htmlFor={JSON.stringify({ pageIndex, htmlFor })}
      className={styleJoin(theme.label, className)}>
      <RecursionInForm />
    </label>
  );
}
