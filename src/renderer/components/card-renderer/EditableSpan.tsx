import {
  PageCard,
  LayoutCard,
  LayoutComponent,
  FormSpanComponent,
} from 'otamashelf';
import React, { useState } from 'react';

import { SummaryWord } from '../../SummaryWord';
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
  summary: SummaryWord;
  layout: LayoutCard;
  word: PageCard;
}

export default function EditableSpan({
  baseReference,
  className,
  inputs,
  outputs,
  editable,
  summary,
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
      summary={summary}
      layout={layout}
      word={word}
    />
  ) : (
    <span className={styleJoin(theme.style.EditableSpan, className)}>
      <Recursion
        baseReference={baseReference}
        contents={outputs}
        edit={() => setEdit(true)}
        editable={editable}
        summary={summary}
        layout={layout}
        word={word}
      />
    </span>
  );
}
EditableSpan.defaultProps = {
  className: '',
};
