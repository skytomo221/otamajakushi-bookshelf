import {
  PageCard,
  LayoutCard,
  LayoutComponent,
  FormDivComponent,
} from 'otamashelf';
import React, { useState } from 'react';

import { SummaryWord } from '../../SummaryWord';
import { useThemeStore } from '../../contexts/themeContext';

import FormDiv from './FormDiv';
// eslint-disable-next-line import/no-cycle
import Recursion from './Recursion';
import styleJoin from './styleJoin';

interface Props {
  baseReference: string;
  className?: string;
  inputs: FormDivComponent[];
  outputs: LayoutComponent[];
  editable: boolean;
  summary: SummaryWord;
  layout: LayoutCard;
  word: PageCard;
}

export default function EditableDiv({
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
    <FormDiv
      baseReference={baseReference}
      inputs={inputs}
      submit={() => setEdit(false)}
      reset={() => setEdit(false)}
      summary={summary}
      layout={layout}
      word={word}
    />
  ) : (
    <div className={styleJoin(theme.style.EditableDiv, className)}>
      <Recursion
        baseReference={baseReference}
        contents={outputs}
        edit={() => setEdit(true)}
        editable={editable}
        summary={summary}
        layout={layout}
        word={word}
      />
    </div>
  );
}
EditableDiv.defaultProps = {
  className: '',
};
