import React, { useContext } from 'react';

import { useThemeStore } from '../../contexts/themeContext';

import styleJoin from './styleJoin';
import { PageRendererContext } from './PageRendererContext';
import { PageRendererInFormContext } from './PageRendererInFormContext';

interface Props {
  inputId: string;
  value: string;
}

export default function InputSubmit({
  inputId,
  value,
}: Props): JSX.Element {
  const theme = useThemeStore();
  const { className, pageIndex } = useContext(PageRendererContext);
  const { submit } = useContext(PageRendererInFormContext);
  return (
    <input
      type="button"
      className={styleJoin(theme.InputSubmit, className)}
      id={JSON.stringify({ pageIndex, inputId })}
      value={value}
      onClick={submit}
    />
  );
}
