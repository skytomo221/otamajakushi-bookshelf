import { PageDisplayInformation } from 'otamashelf/PageDisplayInformation';
import { NormalPageReference } from 'otamashelf/PageReference';
import React from 'react';

import { Mediator } from '../../Mediator';
import { useThemeStore } from '../../contexts/themeContext';

import styleJoin from './styleJoin';

interface Props {
  className?: string;
  inputId: string;
  value: string;
  reset: () => void;
  pageIndex: Mediator['index'];
}

export default function InputReset({
  className,
  inputId,
  value,
  reset,
  pageIndex,
}: Props): JSX.Element {
  const theme = useThemeStore();
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
InputReset.defaultProps = {
  className: '',
};
