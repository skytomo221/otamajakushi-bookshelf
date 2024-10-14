import { PageDisplayInformation } from 'otamashelf/PageDisplayInformation';
import { NormalPageReference } from 'otamashelf/PageReference';
import React from 'react';

import { useThemeStore } from '../../contexts/themeContext';

import styleJoin from './styleJoin';

interface Props {
  className?: string;
  inputId: string;
  value: string;
  submit: () => void;
  pageIndex: NormalPageReference & PageDisplayInformation;
}

export default function InputSubmit({
  className,
  inputId,
  value,
  submit,
  pageIndex,
}: Props): JSX.Element {
  const theme = useThemeStore();
  return (
    <input
      type="button"
      className={styleJoin(theme.InputSubmit, className)}
      id={`${pageIndex.bookPath} ${pageIndex.pageId} ${inputId}`}
      value={value}
      onClick={submit}
    />
  );
}
InputSubmit.defaultProps = {
  className: '',
};
