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
  pattern?: string;
  pageIndex: NormalPageReference & PageDisplayInformation;
  flattenCard: { [key: string]: string };
  setFlattenCard: (flattenCard: { [key: string]: string }) => void;
}

export default function InputText({
  className,
  inputId,
  name,
  reference,
  pattern,
  pageIndex,
  flattenCard,
  setFlattenCard,
}: Props): JSX.Element {
  const theme = useThemeStore();
  const [text, setText] = useState(flattenCard[reference]);
  return (
    <input
      type="text"
      className={styleJoin(theme.InputText, className)}
      id={`${pageIndex.bookPath} ${pageIndex.pageId} ${inputId}`}
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
