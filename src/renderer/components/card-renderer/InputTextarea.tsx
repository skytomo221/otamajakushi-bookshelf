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
  placeholder?: string;
  rows?: number;
  cols?: number;
  wrap?: 'hard' | 'soft' | 'off';
}

export default function InputTextarea({
  inputId,
  name,
  reference,
  placeholder,
  rows,
  cols,
  wrap,
}: Props): JSX.Element {
  const theme = useThemeStore();
  const { className, pageIndex } = useContext(PageRendererContext);
  const { flattenCard, setFlattenCard } = useContext(PageRendererInFormContext);
  const [text, setText] = useState(flattenCard[reference]);
  return (
    <textarea
      className={styleJoin(theme.textarea, className)}
      id={JSON.stringify({ pageIndex, inputId })}
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
