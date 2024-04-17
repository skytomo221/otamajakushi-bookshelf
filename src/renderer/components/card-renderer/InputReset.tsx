import { PageProperties } from 'otamashelf/PageProperties';
import React from 'react';

import { useThemeStore } from '../../contexts/themeContext';

import styleJoin from './styleJoin';

interface Props {
  className?: string;
  inputId: string;
  value: string;
  reset: () => void;
  pageProperties: PageProperties;
}

export default function InputReset({
  className,
  inputId,
  value,
  reset,
  pageProperties,
}: Props): JSX.Element {
  const theme = useThemeStore();
  return (
    <input
      type="button"
      className={styleJoin(theme.InputReset, className)}
      id={`${pageProperties.path} ${pageProperties.id} ${inputId}`}
      value={value}
      onClick={reset}
    />
  );
}
InputReset.defaultProps = {
  className: '',
};
