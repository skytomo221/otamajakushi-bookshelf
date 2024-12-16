import { Reference } from 'otamashelf/LayoutCard';
import React, { useContext, useState } from 'react';

import { useThemeStore } from '../../contexts/themeContext';

import styleJoin from './styleJoin';
import { PageRendererContext } from './PageRendererContext';
import { PageRendererInFormContext } from './PageRendererInFormContext';

interface Props {
  inputId: string;
  name: string;
  reference: Reference;
  pattern?: string;
}

export default function InputText({
  inputId,
  name,
  reference,
  pattern,
}: Props): JSX.Element {
  const theme = useThemeStore();
  const { className, pageIndex } = useContext(PageRendererContext);
  const { flattenCard, setFlattenCard } = useContext(PageRendererInFormContext);
  const [text, setText] = useState(flattenCard[reference]);
  return (
    <input
      type="text"
      className={styleJoin(theme.InputText, className)}
      id={JSON.stringify({ pageIndex, inputId })}
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
