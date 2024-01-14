import {
  PageCard,
  LayoutCard,
  LayoutComponent,
  FormSpanComponent,
} from 'otamashelf';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';

import { SummaryWord } from '../../SummaryWord';
import { State } from '../../states/State';
import ThemeParameter from '../../states/ThemeParameter';

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
  const theme = useSelector<State, ThemeParameter>(state => state.theme);
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
