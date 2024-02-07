import React from 'react';

import { SummaryWord } from '../../SummaryWord';
import { useThemeStore } from '../../contexts/themeContext';

import styleJoin from './styleJoin';

interface Props {
  className?: string;
  inputId: string;
  value: string;
  reset: () => void;
  summary: SummaryWord;
}

export default function InputReset({
  className,
  inputId,
  value,
  reset,
  summary,
}: Props): JSX.Element {
  const theme = useThemeStore();
  return (
    <input
      type="button"
      className={styleJoin(theme.style.InputReset, className)}
      id={`${summary.bookPath} ${summary.id} ${inputId}`}
      value={value}
      onClick={reset}
    />
  );
}
InputReset.defaultProps = {
  className: '',
};
