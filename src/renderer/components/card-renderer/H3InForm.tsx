import { LayoutCard, FormDivComponent } from 'otamashelf';
import React from 'react';
import { useSelector } from 'react-redux';

import { SummaryWord } from '../../SummaryWord';
import { State } from '../../states/State';
import ThemeParameter from '../../states/ThemeParameter';

// eslint-disable-next-line import/no-cycle
import RecursionInForm from './RecursionInForm';
import styleJoin from './styleJoin';

interface Props {
  baseReference: string;
  className?: string;
  contents: FormDivComponent[];
  submit: () => void;
  reset: () => void;
  summary: SummaryWord;
  layout: LayoutCard;
  flattenCard: { [key: string]: string };
  setFlattenCard: (flattenCard: { [key: string]: string }) => void;
}

export default function H3InForm({
  baseReference,
  className,
  contents,
  submit,
  reset,
  summary,
  layout,
  flattenCard,
  setFlattenCard,
}: Props): JSX.Element {
  const theme = useSelector<State, ThemeParameter>(state => state.theme);
  return (
    <h3 className={styleJoin(theme.style.h3, className)}>
      <RecursionInForm
        baseReference={baseReference}
        contents={contents}
        submit={submit}
        reset={reset}
        summary={summary}
        layout={layout}
        flattenCard={flattenCard}
        setFlattenCard={setFlattenCard}
      />
    </h3>
  );
}
H3InForm.defaultProps = {
  className: '',
};
