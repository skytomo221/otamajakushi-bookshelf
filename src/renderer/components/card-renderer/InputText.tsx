import {  Reference } from 'otamashelf';
import React, { useState } from 'react';

import { SummaryWord } from '../../SummaryWord';
import { useThemeStore } from '../../contexts/themeContext';

import styleJoin from './styleJoin';

interface Props {
  className?: string;
  inputId: string;
  name: string;
  reference: Reference;
  pattern?: string;
  summary: SummaryWord;
  flattenCard: { [key: string]: string };
  setFlattenCard: (flattenCard: { [key: string]: string }) => void;
}

export default function InputText({
  className,
  inputId,
  name,
  reference,
  pattern,
  summary,
  flattenCard,
  setFlattenCard,
}: Props): JSX.Element {
  const theme = useThemeStore();
  const [text, setText] = useState(flattenCard[reference]);
  return (
    <input
      type="text"
      className={styleJoin(theme.InputText, className)}
      id={`${summary.bookPath} ${summary.id} ${inputId}`}
      name={name}
      value={text}
      pattern={pattern}
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
InputText.defaultProps = {
  className: '',
  pattern: undefined,
};
