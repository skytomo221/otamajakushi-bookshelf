import { PageProperties } from 'otamashelf/PageProperties';
import React from 'react';

import { useThemeStore } from '../../contexts/themeContext';

import styleJoin from './styleJoin';

interface Props {
  className?: string;
  inputId: string;
  value: string;
  submit: () => void;
  pageProperties: PageProperties;
}

export default function InputSubmit({
  className,
  inputId,
  value,
  submit,
  pageProperties,
}: Props): JSX.Element {
  const theme = useThemeStore();
  return (
    <input
      type="button"
      className={styleJoin(theme.InputSubmit, className)}
      id={`${pageProperties.path} ${pageProperties.id} ${inputId}`}
      value={value}
      onClick={submit}
    />
  );
}
InputSubmit.defaultProps = {
  className: '',
};
