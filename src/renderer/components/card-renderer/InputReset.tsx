import React, { useContext } from 'react';

import { Mediator } from '../../Mediator';
import { useThemeStore } from '../../contexts/themeContext';

import styleJoin from './styleJoin';
import { PageRendererInFormContext } from './PageRendererInFormContext';
import { PageRendererContext } from './PageRendererContext';

interface Props {
  inputId: string;
  value: string;
}

export default function InputReset({
  inputId,
  value,
}: Props): JSX.Element {
  const theme = useThemeStore();
  const { className, pageIndex } = useContext(PageRendererContext);
  const { reset } = useContext(PageRendererInFormContext);
  return (
    <input
      type="button"
      className={styleJoin(theme.InputReset, className)}
      id={JSON.stringify({ pageIndex, inputId })}
      value={value}
      onClick={reset}
    />
  );
}
