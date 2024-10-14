import {
  Layout,
  LayoutComponent,
  FormSpanComponent,
} from 'otamashelf/LayoutCard';
import { Page } from 'otamashelf/Page';
import { PageDisplayInformation } from 'otamashelf/PageDisplayInformation';
import { NormalPageReference } from 'otamashelf/PageReference';
import React, { useState } from 'react';

import { useThemeStore } from '../../contexts/themeContext';

import FormSpan from './FormSpan';
// eslint-disable-next-line import/no-cycle
import Recursion from './Recursion';
import styleJoin from './styleJoin';

interface Props {
  baseReference: string;
  className?: string;
  inputs: FormSpanComponent[];
  outputs: LayoutComponent[];
  editable: boolean;
  pageIndex: NormalPageReference & PageDisplayInformation;
  layout: Layout;
  word: Page;
}

export default function EditableSpan({
  baseReference,
  className,
  inputs,
  outputs,
  editable,
  pageIndex,
  layout,
  word,
}: Props): JSX.Element {
  const theme = useThemeStore();
  const [edit, setEdit] = useState(false);
  return edit ? (
    <FormSpan
      baseReference={baseReference}
      inputs={inputs}
      submit={() => setEdit(false)}
      reset={() => setEdit(false)}
      pageIndex={pageIndex}
      layout={layout}
      word={word}
    />
  ) : (
    <span className={styleJoin(theme.EditableSpan, className)}>
      <Recursion
        baseReference={baseReference}
        contents={outputs}
        edit={() => setEdit(true)}
        editable={editable}
        pageIndex={pageIndex}
        layout={layout}
        word={word}
      />
    </span>
  );
}
EditableSpan.defaultProps = {
  className: '',
};
