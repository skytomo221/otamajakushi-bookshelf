import React from 'react';
import { useSelector } from 'react-redux';

import { SummaryWord } from '../../SummaryWord';
import { State } from '../../states/State';
import ThemeParameter from '../../states/ThemeParameter';

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
  const theme = useSelector<State, ThemeParameter>(state => state.theme);
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
