import {
  PageCard,
  LayoutCard,
  LayoutComponent,
  FormDivComponent,
} from 'otamashelf';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';

import { SummaryWord } from '../../SummaryWord';
import { State } from '../../states/State';
import ThemeParameter from '../../states/ThemeParameter';

// eslint-disable-next-line import/no-cycle
import Recursion from './Recursion';
import RecursionInForm from './RecursionInForm';
import styleJoin from './styleJoin';
import FormDiv from './FormDiv';

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
  const theme = useSelector<State, ThemeParameter>(state => state.theme);
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
