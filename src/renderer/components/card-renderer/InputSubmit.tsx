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
  submit: () => void;
  pageIndex: Mediator['index'];
}

export default function InputSubmit({
  className,
  inputId,
  value,
  submit,
  pageIndex,
}: Props): JSX.Element {
  const theme = useThemeStore();
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
InputSubmit.defaultProps = {
  className: '',
};
