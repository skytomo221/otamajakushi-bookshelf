import { Reference } from 'otamashelf/LayoutCard';
import { PageProperties } from 'otamashelf/PageProperties';
import React, { useState } from 'react';

import { useThemeStore } from '../../contexts/themeContext';

import styleJoin from './styleJoin';

interface Props {
  className?: string;
  inputId: string;
  name: string;
  reference: Reference;
  pattern?: string;
  pageProperties: PageProperties;
  flattenCard: { [key: string]: string };
  setFlattenCard: (flattenCard: { [key: string]: string }) => void;
}

export default function InputText({
  className,
  inputId,
  name,
  reference,
  pattern,
  pageProperties,
  flattenCard,
  setFlattenCard,
}: Props): JSX.Element {
  const theme = useThemeStore();
  const [text, setText] = useState(flattenCard[reference]);
  return (
    <input
      type="text"
      className={styleJoin(theme.InputText, className)}
      id={`${pageProperties.path} ${pageProperties.id} ${inputId}`}
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
