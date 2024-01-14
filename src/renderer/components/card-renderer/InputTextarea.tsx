import {  Reference } from 'otamashelf';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';

import { SummaryWord } from '../../SummaryWord';
import { State } from '../../states/State';
import ThemeParameter from '../../states/ThemeParameter';

import styleJoin from './styleJoin';

interface Props {
  className?: string;
  inputId: string;
  name: string;
  reference: Reference;
  placeholder?: string;
  rows?: number;
  cols?: number;
  wrap?: 'hard' | 'soft' | 'off';
  summary: SummaryWord;
  flattenCard: { [key: string]: string };
  setFlattenCard: (flattenCard: { [key: string]: string }) => void;
}

export default function InputTextarea({
  className,
  inputId,
  name,
  reference,
  placeholder,
  rows,
  cols,
  wrap,
  summary,
  flattenCard,
  setFlattenCard,
}: Props): JSX.Element {
  const theme = useSelector<State, ThemeParameter>(state => state.theme);
  const [text, setText] = useState(flattenCard[reference]);
  return (
    <textarea
      className={styleJoin(theme.style.textarea, className)}
      id={`${summary.bookPath} ${summary.id} ${inputId}`}
      name={name}
      value={text}
      placeholder={placeholder}
      rows={rows}
      cols={cols}
      wrap={wrap}
      onChange={(
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
      ) => {
        setFlattenCard({
          ...flattenCard,
          [reference]: e.target.value,
        });
        setText(e.target.value);
      }}
    />
  );
}
InputTextarea.defaultProps = {
  className: '',
  placeholder: undefined,
  rows: undefined,
  cols: undefined,
  wrap: undefined,
};
