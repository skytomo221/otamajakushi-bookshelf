import React from 'react';

import { SummaryWord } from '../../SummaryWord';
import { useThemeStore } from '../../contexts/themeContext';

import styleJoin from './styleJoin';

interface Props {
  className?: string;
  inputId: string;
  value: string;
  submit: () => void;
  summary: SummaryWord;
}

export default function InputSubmit({
  className,
  inputId,
  value,
  submit,
  summary,
}: Props): JSX.Element {
  const theme = useThemeStore();
  return (
    <input
      type="button"
      className={styleJoin(theme.style.InputSubmit, className)}
      id={`${summary.bookPath} ${summary.id} ${inputId}`}
      value={value}
      onClick={submit}
    />
  );
}
InputSubmit.defaultProps = {
  className: '',
};
