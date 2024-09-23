import { Reference } from 'otamashelf/LayoutCard';
import { PageDisplayInformation } from 'otamashelf/PageDisplayInformation';
import React, { useState } from 'react';

import { useThemeStore } from '../../contexts/themeContext';

import styleJoin from './styleJoin';
import { NormalPageReference } from 'otamashelf/PageReference';

interface Props {
  className?: string;
  inputId: string;
  name: string;
  reference: Reference;
  placeholder?: string;
  rows?: number;
  cols?: number;
  wrap?: 'hard' | 'soft' | 'off';
  pageIndex: NormalPageReference & PageDisplayInformation;
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
  pageIndex,
  flattenCard,
  setFlattenCard,
}: Props): JSX.Element {
  const theme = useThemeStore();
  const [text, setText] = useState(flattenCard[reference]);
  return (
    <textarea
      className={styleJoin(theme.textarea, className)}
      id={`${pageIndex.bookPath} ${pageIndex.pageId} ${inputId}`}
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
