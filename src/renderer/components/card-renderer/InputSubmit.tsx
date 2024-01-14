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
  const theme = useSelector<State, ThemeParameter>(state => state.theme);
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
